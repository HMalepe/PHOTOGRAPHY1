import { useEffect, useRef, useState } from "react";
import { shuffle } from "@/lib/shuffle";

const SEGMENT_MS = 7000;
const FADE_MS = 1100;

type NetworkInfo = { saveData?: boolean; effectiveType?: string };
interface Slot {
  video: HTMLVideoElement;
  clip: number;
  url: number;
}

/**
 * A muted, looping montage behind the hero: clips play in a random order, each for a few seconds,
 * cross-fading into the next. Two stacked videos take turns, so the next clip is already loaded
 * when it is needed. Neither video is ever transparent while it plays (the outgoing one fades out
 * on top of the incoming one), because mobile Safari can refuse to start an invisible video.
 *
 * Playback pauses off screen, in a hidden tab, and for visitors who asked for reduced motion or
 * are on a slow or data-saving connection; those visitors, and phones that refuse autoplay, get a
 * Play control. Calling `toggle` from a tap starts playback inside that tap, which phones require.
 * Clips that fail are skipped, and if none work the hero photo simply stays.
 */
export function useHeroReel(clips: readonly (readonly string[])[], enabled: boolean) {
  const first = useRef<HTMLVideoElement>(null);
  const second = useRef<HTMLVideoElement>(null);
  const toggleRef = useRef<() => void>(() => {});
  const [live, setLive] = useState(false);
  const [paused, setPaused] = useState(false);
  const [usable, setUsable] = useState(true);

  useEffect(() => {
    const a = first.current;
    const b = second.current;
    if (!enabled || !a || !b || clips.length === 0) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const network = (navigator as Navigator & { connection?: NetworkInfo }).connection;
    const constrained =
      Boolean(network?.saveData) || /(^|-)(2g|3g)$/.test(network?.effectiveType ?? "");
    const hero = a.closest<HTMLElement>(".hero");
    const abort = new AbortController();
    const { signal } = abort;

    let userPaused = reduced.matches || constrained;
    let visible = true;
    let disposed = false;
    let fading = false;
    let top = 0;
    let advanceTimer = 0;
    let fadeTimer = 0;
    let cursor = 0;
    const bad = new Set<number>();
    const order = shuffle(clips.map((_, index) => index));
    const slots: Slot[] = [
      { video: a, clip: -1, url: 0 },
      { video: b, clip: -1, url: 0 },
    ];
    const current = () => slots[top]!;
    const desired = () => visible && !document.hidden && !userPaused;

    const giveUp = () => {
      if (disposed) return;
      window.clearTimeout(advanceTimer);
      a.pause();
      b.pause();
      setLive(false);
      setUsable(false);
    };

    const nextClip = () => {
      for (let tries = 0; tries < order.length; tries++) {
        const index = order[cursor++ % order.length]!;
        if (!bad.has(index)) return index;
      }
      return -1;
    };

    const attach = (slot: Slot) => {
      const index = nextClip();
      if (index < 0) return giveUp();
      slot.clip = index;
      slot.url = 0;
      slot.video.preload = userPaused ? "none" : "auto";
      slot.video.src = clips[index]![0]!;
      slot.video.load();
    };

    const play = (video: HTMLVideoElement) => {
      video.muted = true;
      video.play().catch((error: unknown) => {
        if ((error as DOMException)?.name === "AbortError" || disposed) return;
        // Autoplay refused: show Play and let a tap start it.
        if (video.paused) {
          userPaused = true;
          setPaused(true);
          window.clearTimeout(advanceTimer);
        }
      });
    };

    const arm = () => {
      window.clearTimeout(advanceTimer);
      if (!desired() || fading) return;
      const video = current().video;
      const length =
        Number.isFinite(video.duration) && video.duration > 0 ? video.duration * 1000 : SEGMENT_MS;
      const wait = Math.min(SEGMENT_MS, length) - FADE_MS - video.currentTime * 1000;
      advanceTimer = window.setTimeout(advance, Math.max(400, wait));
    };

    function advance() {
      if (disposed || fading || !desired()) return;
      const outgoing = current();
      const incoming = slots[1 - top]!;
      const crossfade = () => {
        if (disposed || fading) return;
        fading = true;
        incoming.video.currentTime = 0;
        play(incoming.video);
        outgoing.video.dataset["fading"] = "true";
        fadeTimer = window.setTimeout(() => {
          outgoing.video.pause();
          outgoing.video.dataset["instant"] = "true";
          delete outgoing.video.dataset["fading"];
          outgoing.video.dataset["top"] = "false";
          incoming.video.dataset["top"] = "true";
          top = 1 - top;
          fading = false;
          // Restore the fade transition only after the reset has been painted.
          requestAnimationFrame(() =>
            requestAnimationFrame(() => delete outgoing.video.dataset["instant"]),
          );
          attach(outgoing);
          arm();
        }, FADE_MS + 50);
      };
      if (incoming.video.readyState >= 3) crossfade();
      else {
        // Not ready yet: keep the current clip looping and try again shortly.
        incoming.video.addEventListener("canplay", crossfade, { once: true, signal });
        advanceTimer = window.setTimeout(() => {
          incoming.video.removeEventListener("canplay", crossfade);
          advance();
        }, 1500);
      }
    }

    const sync = () => {
      if (disposed) return;
      if (desired()) {
        const video = current().video;
        if (video.paused) play(video);
        arm();
      } else {
        a.pause();
        b.pause();
        window.clearTimeout(advanceTimer);
      }
    };

    for (const slot of slots) {
      slot.video.addEventListener(
        "error",
        () => {
          const urls = clips[slot.clip];
          if (!urls) return;
          if (slot.url + 1 < urls.length) {
            slot.url++;
            slot.video.src = urls[slot.url]!;
            slot.video.load();
          } else {
            bad.add(slot.clip);
            if (bad.size >= clips.length) return giveUp();
            attach(slot);
          }
          if (slot === current() && desired()) play(slot.video);
        },
        { signal },
      );
      slot.video.addEventListener("playing", () => slot === current() && arm(), { signal });
    }

    // Show the video (fade the photo away) only once a real frame has been presented.
    a.addEventListener(
      "playing",
      () => {
        const reveal = () => !disposed && setLive(true);
        if ("requestVideoFrameCallback" in a) a.requestVideoFrameCallback(reveal);
        else window.setTimeout(reveal, 300);
      },
      { once: true, signal },
    );

    toggleRef.current = () => {
      userPaused = !userPaused;
      setPaused(userPaused);
      if (!userPaused) {
        for (const slot of slots) slot.video.preload = "auto";
        // Called straight from the tap, as phones require.
        play(current().video);
      }
      sync();
    };

    a.dataset["top"] = "true";
    b.dataset["top"] = "false";
    setPaused(userPaused);
    setUsable(true);
    attach(slots[0]!);
    attach(slots[1]!);
    document.addEventListener("visibilitychange", sync, { signal });
    const observer = hero
      ? new IntersectionObserver(
          ([entry]) => {
            visible = Boolean(entry?.isIntersecting);
            sync();
          },
          { threshold: 0.15 },
        )
      : null;
    observer?.observe(hero!);
    sync();

    return () => {
      disposed = true;
      abort.abort();
      observer?.disconnect();
      window.clearTimeout(advanceTimer);
      window.clearTimeout(fadeTimer);
      for (const { video } of slots) {
        video.pause();
        video.removeAttribute("src");
        video.load();
        delete video.dataset["fading"];
        delete video.dataset["instant"];
      }
    };
  }, [enabled, clips]);

  return { first, second, live, paused, usable, toggle: () => toggleRef.current() };
}
