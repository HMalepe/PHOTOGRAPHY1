import { useEffect } from "react";
import Lenis from "lenis";

/** Eased scrolling for the whole site. Skipped entirely when the visitor prefers reduced motion. */
export function useSmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ lerp: 0.1, anchors: true, autoRaf: true });
    return () => lenis.destroy();
  }, []);
}
