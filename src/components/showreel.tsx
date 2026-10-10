import { useEffect, useRef, useState, type CSSProperties, type MouseEvent } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { mediaType } from "@/lib/media-type";

export interface ShowreelData {
  sources: string[];
  poster: string;
  label: string;
}

type Status = "loading" | "playing" | "idle" | "failed";

function ReelPlayer({ reel }: { reel: ShowreelData }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [status, setStatus] = useState<Status>("loading");

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    // Opened by a click, so sound is allowed. If the browser refuses anyway, fall back to muted
    // playback; the controls let the viewer unmute.
    video.muted = false;
    video.play().catch((error: unknown) => {
      if ((error as DOMException)?.name === "AbortError") return;
      video.muted = true;
      video.play().catch(() => {
        // Refused outright: the native controls are showing, so stop saying "Loading".
        if (video.paused) setStatus((s) => (s === "failed" ? s : "idle"));
      });
    });
  }, []);

  // See FilmClip: a playable-format fallback for browsers that can fetch a file but not decode it.
  const nextSource = () => {
    const video = videoRef.current;
    if (!video) return false;
    const at = reel.sources.findIndex((src) => video.currentSrc.endsWith(src));
    const next = reel.sources[at + 1];
    if (at < 0 || !next) return false;
    video.src = next;
    video.load();
    video.play().catch(() => {});
    return true;
  };
  const lastSource = reel.sources.length - 1;
  return (
    <>
      <video
        ref={videoRef}
        className="reel-video"
        poster={reel.poster}
        controls
        autoPlay
        loop
        playsInline
        webkit-playsinline="true"
        preload="auto"
        onPlaying={() => setStatus("playing")}
        onWaiting={() => setStatus((s) => (s === "failed" ? s : "loading"))}
        onError={() => {
          if (!nextSource()) setStatus("failed");
        }}
      >
        {reel.sources.map((src, index) => (
          <source
            key={src}
            src={src}
            type={mediaType(src)}
            onError={index === lastSource ? () => setStatus("failed") : undefined}
          />
        ))}
      </video>
      {(status === "loading" || status === "failed") && (
        <p className="reel-status" role="status" data-status={status}>
          {status === "failed" ? "This film couldn't be loaded." : "Loading"}
        </p>
      )}
    </>
  );
}

/** Hero button that opens the reel full screen, expanding from wherever it was clicked. */
export function Showreel({ reel }: { reel: ShowreelData }) {
  const [origin, setOrigin] = useState({ x: "50%", y: "50%" });

  const remember = (event: MouseEvent<HTMLButtonElement>) => {
    const box = event.currentTarget.getBoundingClientRect();
    setOrigin({ x: `${box.left + box.width / 2}px`, y: `${box.top + box.height / 2}px` });
  };

  return (
    <DialogPrimitive.Root>
      <DialogPrimitive.Trigger className="reel-trigger" onClick={remember}>
        <span className="reel-trigger-icon" aria-hidden="true" />
        <span>Play reel</span>
      </DialogPrimitive.Trigger>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Content
          className="reel"
          style={{ "--reel-x": origin.x, "--reel-y": origin.y } as CSSProperties}
          data-lenis-prevent
          aria-describedby={undefined}
        >
          <DialogPrimitive.Title className="sr-only">{reel.label}</DialogPrimitive.Title>
          <ReelPlayer reel={reel} />
          <DialogPrimitive.Close className="reel-close">Close</DialogPrimitive.Close>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
