import { useState, type CSSProperties, type MouseEvent } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";

export interface ShowreelData {
  sources: string[];
  poster: string;
  label: string;
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
          <video className="reel-video" poster={reel.poster} controls autoPlay loop playsInline>
            {reel.sources.map((src) => (
              <source key={src} src={src} type="video/mp4" />
            ))}
          </video>
          <DialogPrimitive.Close className="reel-close">Close</DialogPrimitive.Close>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
