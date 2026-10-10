export const clamp01 = (value: number) => Math.max(0, Math.min(1, value));

/** How far a frame has travelled through the viewport: 0 as it enters at the bottom, 1 as it leaves at the top. */
export function frameProgress(top: number, height: number, viewport: number) {
  return clamp01((viewport - top) / (viewport + height));
}

export interface FrameMotion {
  x: number;
  y: number;
  rotation: number;
  opacity: number;
  reveal: number;
  mediaShift: number;
}

export const REST_MOTION: FrameMotion = {
  x: 0,
  y: 0,
  rotation: 0,
  opacity: 1,
  reveal: 0,
  mediaShift: 0,
};

/** Entry (first 38% of travel) and exit (last 28%) motion; `direction` is -1 for left, 1 for right. */
export function frameMotion(progress: number, direction: 1 | -1): FrameMotion {
  const enter = clamp01(1 - progress / 0.38);
  const exit = clamp01((progress - 0.72) / 0.28);
  return {
    x: direction * (enter * 70 + exit * 50),
    y: enter * 90 - exit * 60,
    rotation: direction * (enter * 3.5 - exit * 2.5),
    opacity: clamp01(1 - exit * 1.1),
    reveal: enter * 100,
    mediaShift: (0.5 - progress) * 80,
  };
}
