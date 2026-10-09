import { useEffect, useRef, useState } from "react";

export interface GalleryFilm {
  /** Tried in order; the browser falls through to the next source if one fails. */
  sources: string[];
  poster: string;
  title: string;
  category: string;
  label: string;
}

/** Muted, looping clip that only plays while on screen and never autoplays under reduced motion. */
export function FilmClip({ film }: { film: GalleryFilm }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  // "auto" plays whenever the clip is on screen unless the viewer prefers reduced motion; a click overrides it.
  const [intent, setIntent] = useState<"auto" | "play" | "pause">("auto");
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    // React does not reliably reflect `muted` onto hydrated elements, and autoplay requires it.
    video.muted = true;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const observer = new IntersectionObserver(
      ([entry]) => {
        const wanted = intent === "play" || (intent === "auto" && !reduced.matches);
        if (entry?.isIntersecting && wanted) void video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.35 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [intent]);

  const toggle = () => setIntent(playing ? "pause" : "play");

  return (
    <div className="film-window">
      <video
        ref={videoRef}
        poster={film.poster}
        muted
        loop
        playsInline
        preload="none"
        aria-label={film.label}
        onPlaying={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      >
        {film.sources.map((src) => (
          <source key={src} src={src} type="video/mp4" />
        ))}
      </video>
      <button
        type="button"
        className="film-toggle"
        onClick={toggle}
        aria-label={`${playing ? "Pause" : "Play"} ${film.title}`}
      >
        <span aria-hidden="true">{playing ? "❚❚" : "▶"}</span>
      </button>
    </div>
  );
}
