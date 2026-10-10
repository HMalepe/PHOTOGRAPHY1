import { useEffect, useState, type RefObject } from "react";

/**
 * True once the web fonts and (optionally) a key image are ready to show, so entrance animations can
 * start on finished content instead of running while text swaps fonts or a photo is still arriving.
 * A timeout keeps a slow or failed asset from holding the page back.
 */
export function useReady(image?: RefObject<HTMLImageElement | null>, timeoutMs = 2500) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const finish = () => {
      if (!cancelled) setReady(true);
    };
    const waits: Promise<unknown>[] = [];
    if (document.fonts?.ready) waits.push(document.fonts.ready);
    const img = image?.current;
    if (img) {
      waits.push(
        new Promise<void>((resolve) => {
          const decoded = () => {
            (img.decode ? img.decode() : Promise.resolve()).catch(() => {}).then(() => resolve());
          };
          if (img.complete) decoded();
          else {
            img.addEventListener("load", decoded, { once: true });
            img.addEventListener("error", () => resolve(), { once: true });
          }
        }),
      );
    }
    const timer = window.setTimeout(finish, timeoutMs);
    void Promise.all(waits).then(finish, finish);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [image, timeoutMs]);

  return ready;
}
