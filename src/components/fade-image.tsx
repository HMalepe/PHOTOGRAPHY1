import { useEffect, useLayoutEffect, useRef, useState, type ImgHTMLAttributes } from "react";

// useLayoutEffect warns during server rendering; the effect itself only matters in the browser.
const useIsomorphicLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

/**
 * An image that fades in once it has loaded and decoded, instead of popping in half-drawn.
 * Images already loaded when the page hydrates (cached, or preloaded) are never hidden, so there is
 * no flash, and without JavaScript the image simply shows.
 */
export function FadeImage({ className, alt, ...props }: ImgHTMLAttributes<HTMLImageElement>) {
  const ref = useRef<HTMLImageElement>(null);
  const [loading, setLoading] = useState(false);

  useIsomorphicLayoutEffect(() => {
    const img = ref.current;
    if (img && !img.complete) setLoading(true);
  }, []);

  useEffect(() => {
    // Covers an image that finished between the layout check and the listener attaching.
    if (ref.current?.complete) setLoading(false);
  }, []);

  const reveal = (img: HTMLImageElement) => {
    (img.decode ? img.decode() : Promise.resolve()).catch(() => {}).then(() => setLoading(false));
  };

  return (
    <img
      {...props}
      ref={ref}
      alt={alt}
      decoding="async"
      className={className ? `fade-image ${className}` : "fade-image"}
      data-loading={loading}
      onLoad={(event) => reveal(event.currentTarget)}
      onError={() => setLoading(false)}
    />
  );
}
