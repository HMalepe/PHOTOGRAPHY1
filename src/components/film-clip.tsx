import { useEffect, useRef, useState } from "react";
import { FadeImage } from "@/components/fade-image";
import { mediaType } from "@/lib/media-type";

export interface GalleryFilm {
  /** Tried in order; the browser falls through to the next source if one fails. */
  sources: string[];
  poster: string;
  title: string;
  category: string;
  label: string;
}

type Phase = "idle" | "loading" | "playing" | "paused" | "failed";
type Intent = "auto" | "play" | "pause";

const LABEL: Record<Phase, string> = {
  idle: "Play",
  loading: "Loading",
  playing: "Pause",
  paused: "Play",
  failed: "",
};

/**
 * Muted, looping clip that starts loading as it nears the screen and plays while on screen.
 *
 * Phones only allow playback that starts inside a tap, so tapping always calls `play()` directly in
 * the tap handler: never via an observer or effect. The video itself is never transparent (the
 * poster sits on top of it and fades away once it is really playing), because mobile Safari can
 * refuse to start a video it considers invisible. If a clip can't load, the poster stays and the
 * control disappears. Autoplay is skipped under reduced motion.
 */
export function FilmClip({ film }: { film: GalleryFilm }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const intent = useRef<Intent>("auto");
  const onScreen = useRef(false);
  const [phase, setPhase] = useState<Phase>("idle");
  const [shown, setShown] = useState(false);

  const startPlayback = () => {
    const video = videoRef.current;
    if (!video) return;
    setPhase((current) => (current === "failed" || current === "playing" ? current : "loading"));
    video.play().catch((error: unknown) => {
      // AbortError just means we paused it again while it was starting. Otherwise the browser
      // refused (autoplay blocked): fall back to a Play control, unless it is in fact playing.
      if ((error as DOMException)?.name === "AbortError") return;
      if (video.paused) setPhase((current) => (current === "failed" ? current : "paused"));
    });
  };

  // Start fetching shortly before the clip scrolls into view, so playback can begin instantly.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const near = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        near.disconnect();
        video.preload = "auto";
        if (video.networkState === HTMLMediaElement.NETWORK_IDLE && video.readyState === 0)
          video.load();
      },
      { rootMargin: "600px 0px" },
    );
    near.observe(video);
    return () => near.disconnect();
  }, []);

  // Autoplay while on screen (when allowed), pause when off screen or the tab is hidden.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    // React sets `muted` as a property only; iOS also wants the attribute, so reflect both.
    video.defaultMuted = true;
    video.muted = true;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    const sync = () => {
      const wanted = intent.current === "play" || (intent.current === "auto" && !reduced.matches);
      if (onScreen.current && wanted && !document.hidden) {
        if (video.paused) startPlayback();
      } else if (!video.paused) {
        video.pause();
      }
    };

    const visible = new IntersectionObserver(
      ([entry]) => {
        onScreen.current = Boolean(entry?.isIntersecting);
        sync();
      },
      { threshold: 0.35 },
    );
    visible.observe(video);
    document.addEventListener("visibilitychange", sync);
    return () => {
      visible.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
    // startPlayback only touches refs and stable state setters, so it is safe to omit from deps.
  }, []);

  // Runs inside the tap/click, which is what lets phones start playback.
  const toggle = () => {
    const video = videoRef.current;
    if (!video) return;
    if (!video.paused) {
      intent.current = "pause";
      video.pause();
    } else {
      intent.current = "play";
      startPlayback();
    }
  };

  const failed = () => setPhase("failed");

  // A browser can fetch a file yet be unable to play it (a codec it lacks). The <source> list only
  // falls through when a file can't be fetched, so on any playback error move to the next format.
  const nextSource = () => {
    const video = videoRef.current;
    if (!video) return false;
    const at = film.sources.findIndex((src) => video.currentSrc.endsWith(src));
    const next = film.sources[at + 1];
    if (at < 0 || !next) return false;
    // Switching source resets playback, so remember whether it was playing (or asked to) first.
    // Under reduced motion nothing was playing, so nothing is started on the viewer's behalf.
    const resume = !video.paused || intent.current === "play";
    video.src = next;
    video.load();
    if (resume) startPlayback();
    return true;
  };
  const lastSource = film.sources.length - 1;
  const active = phase === "playing" || phase === "loading";

  return (
    <div className="film-window" data-phase={phase} data-shown={shown}>
      <div className="film-media" onClick={toggle}>
        <video
          ref={videoRef}
          className="film-video"
          muted
          loop
          playsInline
          webkit-playsinline="true"
          disablePictureInPicture
          disableRemotePlayback
          preload="none"
          aria-label={film.label}
          onPlaying={() => {
            setPhase("playing");
            setShown(true);
          }}
          onWaiting={() => setPhase((p) => (p === "playing" ? "loading" : p))}
          onPause={() => setPhase((p) => (p === "failed" || p === "idle" ? p : "paused"))}
          onError={() => {
            if (!nextSource()) failed();
          }}
        >
          {film.sources.map((src, index) => (
            <source
              key={src}
              src={src}
              type={mediaType(src)}
              onError={index === lastSource ? failed : undefined}
            />
          ))}
        </video>
        <FadeImage className="film-poster" src={film.poster} alt="" width={1200} height={800} />
      </div>
      {phase !== "failed" && (
        <button
          type="button"
          className="film-toggle"
          data-playing={phase === "playing"}
          data-loading={phase === "loading"}
          onClick={toggle}
          aria-label={`${active ? "Pause" : "Play"} ${film.title}`}
        >
          <span className="film-toggle-dot" aria-hidden="true" />
          <span aria-hidden="true">{LABEL[phase]}</span>
        </button>
      )}
    </div>
  );
}
