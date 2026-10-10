import { useEffect, useRef } from "react";

const clamp = (value: number) => Math.max(0, Math.min(1, value));

/** Reversible, scroll-scrubbed motion without React renders on every frame. */
export function useGalleryScroll({ solidHeader = false }: { solidHeader?: boolean } = {}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    const elements = Array.from(root.querySelectorAll<HTMLElement>("[data-scroll-frame]"));
    const update = () => {
      frame = 0;
      const reduced = preference.matches;
      const viewport = window.innerHeight;
      for (const element of elements) {
        const rect = element.getBoundingClientRect();
        const p = clamp((viewport - rect.top) / (viewport + rect.height));
        const direction = element.dataset["direction"] === "right" ? 1 : -1;
        // enter runs 1 → 0 as the frame arrives; exit runs 0 → 1 as it leaves the top.
        const enter = clamp(1 - p / 0.38);
        const exit = clamp((p - 0.72) / 0.28);
        element.style.setProperty(
          "--scroll-x",
          `${reduced ? 0 : direction * (enter * 70 + exit * 50)}px`,
        );
        element.style.setProperty("--scroll-y", `${reduced ? 0 : enter * 90 - exit * 60}px`);
        element.style.setProperty(
          "--scroll-rotation",
          `${reduced ? 0 : direction * (enter * 3.5 - exit * 2.5)}deg`,
        );
        element.style.setProperty("--scroll-opacity", `${reduced ? 1 : clamp(1 - exit * 1.1)}`);
        element.style.setProperty("--reveal", `${reduced ? 0 : enter * 100}%`);
        element.style.setProperty("--media-shift", `${reduced ? 0 : (0.5 - p) * 80}px`);
      }
      const y = window.scrollY;
      root.style.setProperty(
        "--hero-shift",
        `${reduced ? 0 : Math.min(y * 0.35, viewport * 0.5)}px`,
      );
      root.style.setProperty(
        "--hero-fade",
        solidHeader ? "1" : `${reduced ? 0 : clamp(y / (viewport * 0.9))}`,
      );
      root.style.setProperty("--marquee-x", `${reduced ? 0 : -y * 0.3}px`);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
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
  }, [solidHeader]);

  return ref;
}
