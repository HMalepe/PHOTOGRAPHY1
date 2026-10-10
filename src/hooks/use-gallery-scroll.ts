import { useEffect, useRef } from "react";
import { clamp01, frameMotion, frameProgress, REST_MOTION } from "@/lib/scroll-motion";

const round = (value: number) => Math.round(value * 100) / 100;

/**
 * Reversible, scroll-scrubbed motion without React renders on every frame.
 *
 * Performance rules, because a custom property written on an element re-styles its whole subtree:
 *  - each value is written only onto the elements that use it (never onto the page root), and only
 *    when it actually changed, so scrolling past the hero costs nothing further;
 *  - frame positions are measured from layout offsets (which ignore transforms) and cached, so a
 *    scroll frame does arithmetic only: no layout reads, and no feedback from the frame's own motion.
 */
export function useGalleryScroll({ solidHeader = false }: { solidHeader?: boolean } = {}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const header = root.querySelector<HTMLElement>(".site-header");
    const hero = root.querySelector<HTMLElement>(".hero");
    const marquee = root.querySelector<HTMLElement>(".marquee-track");
    const frames = Array.from(root.querySelectorAll<HTMLElement>("[data-scroll-frame]")).map(
      (el) => ({
        el,
        direction: el.dataset["direction"] === "right" ? (1 as const) : (-1 as const),
        top: 0,
        height: 0,
      }),
    );

    const written = new WeakMap<HTMLElement, Map<string, string>>();
    const write = (el: HTMLElement, name: string, value: string) => {
      let previous = written.get(el);
      if (!previous) written.set(el, (previous = new Map()));
      if (previous.get(name) === value) return;
      previous.set(name, value);
      el.style.setProperty(name, value);
    };

    const measure = () => {
      for (const frame of frames) {
        let top = 0;
        for (
          let node: HTMLElement | null = frame.el;
          node;
          node = node.offsetParent as HTMLElement | null
        ) {
          top += node.offsetTop;
        }
        frame.top = top;
        frame.height = frame.el.offsetHeight;
      }
    };

    let raf = 0;
    const update = () => {
      raf = 0;
      const reduced = preference.matches;
      const viewport = window.innerHeight;
      const y = window.scrollY;

      for (const frame of frames) {
        const motion = reduced
          ? REST_MOTION
          : frameMotion(frameProgress(frame.top - y, frame.height, viewport), frame.direction);
        write(frame.el, "--scroll-x", `${round(motion.x)}px`);
        write(frame.el, "--scroll-y", `${round(motion.y)}px`);
        write(frame.el, "--scroll-rotation", `${round(motion.rotation)}deg`);
        write(frame.el, "--scroll-opacity", `${round(motion.opacity)}`);
        write(frame.el, "--reveal", `${round(motion.reveal)}%`);
        write(frame.el, "--media-shift", `${round(motion.mediaShift)}px`);
      }

      const fade = solidHeader ? 1 : reduced ? 0 : clamp01(y / (viewport * 0.9));
      if (header) write(header, "--hero-fade", fade.toFixed(3));
      if (hero) {
        write(hero, "--hero-fade", fade.toFixed(3));
        write(hero, "--hero-shift", `${reduced ? 0 : round(Math.min(y * 0.35, viewport * 0.5))}px`);
      }
      if (marquee) write(marquee, "--marquee-x", `${reduced ? 0 : round(-y * 0.3)}px`);
    };

    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    const remeasure = () => {
      measure();
      schedule();
    };

    // Layout shifts (fonts, images, an opened FAQ) move frames, so positions are refreshed with them.
    const resize = new ResizeObserver(remeasure);
    resize.observe(root);
    measure();
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", remeasure);
    preference.addEventListener("change", schedule);
    return () => {
      cancelAnimationFrame(raf);
      resize.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", remeasure);
      preference.removeEventListener("change", schedule);
    };
  }, [solidHeader]);

  return ref;
}
