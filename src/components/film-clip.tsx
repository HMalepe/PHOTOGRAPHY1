import { useEffect, useRef, useState } from "react";
import { FadeImage } from "@/components/fade-image";

export interface GalleryFilm {
  /** Tried in order; the browser falls through to the next source if one fails. */
  sources: string[];
  poster: string;
  title: string;
  category: string;
  label: string;
}

type Phase = "idle" | "loading" | "playing" | "paused" | "failed";

const LABEL: Record<Phase, string> = {
  idle: "Play",
  loading: "Loading",
  playing: "Pause",
  paused: "Play",
  failed: "",
};

/**
 * Muted, looping clip that starts loading as it nears the screen, plays while on screen, and fades
 * in over its poster once the first frame is really playing. If the clip can't load, the poster
 * stays and the control disappears. Never autoplays under reduced motion.
 */
export function FilmClip({ film }: { film: GalleryFilm }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  // "auto" plays whenever the clip is on screen unless the viewer prefers reduced motion; a click overrides it.
  const [intent, setIntent] = useState<"auto" | "play" | "pause">("auto");
  const [phase, setPhase] = useState<Phase>("idle");
  const [shown, setShown] = useState(false);

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

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    // React does not reliably reflect `muted` onto hydrated elements, and autoplay requires it.
    video.muted = true;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let onScreen = false;

    const sync = () => {
      const wanted = intent === "play" || (intent === "auto" && !reduced.matches);
      if (onScreen && wanted && !document.hidden) {
        setPhase((current) =>
          current === "failed" ? current : current === "playing" ? current : "loading",
        );
        video.play().catch((error: unknown) => {
          // AbortError just means we paused it again while it was starting.
          if ((error as DOMException)?.name !== "AbortError")
            setPhase((p) => (p === "failed" ? p : "paused"));
        });
      } else {
        video.pause();
      }
    };

    const visible = new IntersectionObserver(
      ([entry]) => {
        onScreen = Boolean(entry?.isIntersecting);
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
  }, [intent]);

  const failed = () => setPhase("failed");
  const toggle = () => setIntent(phase === "playing" || phase === "loading" ? "pause" : "play");
  const lastSource = film.sources.length - 1;

  return (
    <div className="film-window" data-phase={phase} data-shown={shown}>
      <div className="film-media">
        <FadeImage className="film-poster" src={film.poster} alt="" width={1200} height={800} />
        <video
          ref={videoRef}
          className="film-video"
          muted
          loop
          playsInline
          preload="none"
          aria-label={film.label}
          onPlaying={() => {
            setPhase("playing");
            setShown(true);
          }}
          onWaiting={() => setPhase((p) => (p === "playing" ? "loading" : p))}
          onPause={() => setPhase((p) => (p === "failed" || p === "idle" ? p : "paused"))}
          onError={failed}
        >
          {film.sources.map((src, index) => (
            <source
              key={src}
              src={src}
              type="video/mp4"
              onError={index === lastSource ? failed : undefined}
            />
          ))}
        </video>
      </div>
      {phase !== "failed" && (
        <button
          type="button"
          className="film-toggle"
          data-playing={phase === "playing"}
          data-loading={phase === "loading"}
          onClick={toggle}
          aria-label={`${phase === "playing" || phase === "loading" ? "Pause" : "Play"} ${film.title}`}
        >
          <span className="film-toggle-dot" aria-hidden="true" />
          <span aria-hidden="true">{LABEL[phase]}</span>
        </button>
      )}
    </div>
  );
}
