import type { RefObject } from "react";

/** The two stacked videos the reel alternates between. Rendered inside the hero's media layer. */
export function HeroReelVideos({
  first,
  second,
}: {
  first: RefObject<HTMLVideoElement | null>;
  second: RefObject<HTMLVideoElement | null>;
}) {
  const shared = {
    className: "hero-reel-video",
    muted: true,
    loop: true,
    playsInline: true,
    preload: "none" as const,
    tabIndex: -1,
    disablePictureInPicture: true,
    disableRemotePlayback: true,
    "webkit-playsinline": "true",
  };
  return (
    <div className="hero-reel" aria-hidden="true">
      <video ref={first} data-top="true" {...shared} />
      <video ref={second} data-top="false" {...shared} />
    </div>
  );
}

/** Pause/play for the background reel: motion that lasts more than a few seconds must be stoppable. */
export function HeroReelControl({ paused, onToggle }: { paused: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      className="reel-pause"
      onClick={onToggle}
      aria-label={paused ? "Play background reel" : "Pause background reel"}
    >
      <span className="reel-pause-icon" data-paused={paused} aria-hidden="true" />
      <span aria-hidden="true">{paused ? "Play" : "Pause"}</span>
    </button>
  );
}
