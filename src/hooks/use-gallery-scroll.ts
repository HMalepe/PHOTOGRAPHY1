import { useEffect, useRef } from "react";

/** Reversible, scroll-scrubbed motion without React renders on every frame. */
export function useGalleryScroll() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    const elements = Array.from(root.querySelectorAll<HTMLElement>("[data-scroll-frame]"));
    const update = () => {
      frame = 0;
      for (const element of elements) {
        const rect = element.getBoundingClientRect();
        const p = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / (window.innerHeight + rect.height)));
        const direction = element.dataset["direction"] === "right" ? 1 : -1;
        const enter = Math.max(0, 1 - p / 0.32);
        const exit = Math.max(0, (p - 0.65) / 0.35);
        const reduced = preference.matches;
        element.style.setProperty("--scroll-x", `${reduced ? 0 : direction * (enter * 180 + exit * 160)}px`);
        element.style.setProperty("--scroll-y", `${reduced ? 0 : enter * 85 - exit * 70}px`);
        element.style.setProperty("--scroll-rotation", `${reduced ? 0 : direction * (enter * 13 - exit * 11)}deg`);
        element.style.setProperty("--scroll-scale", `${reduced ? 1 : 1 - enter * 0.12 - exit * 0.08}`);
        element.style.setProperty("--scroll-opacity", `${reduced ? 1 : Math.max(0, 1 - enter - exit)}`);
      }
      const y = window.scrollY;
      root.style.setProperty("--portrait-y", `${preference.matches ? 0 : -Math.min(y * 0.16, 160)}px`);
      root.style.setProperty("--portrait-rotation", `${preference.matches ? 0 : Math.min(y * 0.018, 15)}deg`);
      root.style.setProperty("--word-y", `${preference.matches ? 0 : Math.min(y * 0.23, 220)}px`);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    preference.addEventListener("change", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      preference.removeEventListener("change", schedule);
    };
  }, []);

  return ref;
}