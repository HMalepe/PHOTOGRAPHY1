import { describe, expect, it } from "vitest";
import { frameMotion, frameProgress, REST_MOTION } from "@/lib/scroll-motion";

describe("frameProgress", () => {
  it("runs from 0 as a frame enters the bottom to 1 as it leaves the top", () => {
    expect(frameProgress(900, 400, 900)).toBe(0);
    expect(frameProgress(-400, 400, 900)).toBe(1);
    expect(frameProgress(250, 400, 900)).toBeCloseTo(0.5);
  });

  it("stays within 0 to 1 for frames far outside the viewport", () => {
    expect(frameProgress(5000, 400, 900)).toBe(0);
    expect(frameProgress(-5000, 400, 900)).toBe(1);
  });
});

describe("frameMotion", () => {
  it("is at rest through the middle of the frame's travel", () => {
    for (const p of [0.38, 0.5, 0.72]) {
      expect(frameMotion(p, 1)).toEqual({ ...REST_MOTION, mediaShift: (0.5 - p) * 80 });
    }
  });

  it("enters from the side given by its direction, fully hidden by the reveal", () => {
    const left = frameMotion(0, -1);
    const right = frameMotion(0, 1);
    expect(left.x).toBeLessThan(0);
    expect(right.x).toBeGreaterThan(0);
    expect(left.reveal).toBe(100);
    expect(left.opacity).toBe(1);
  });

  it("fades out on exit and never produces a negative opacity", () => {
    expect(frameMotion(1, 1).opacity).toBe(0);
    for (let p = 0; p <= 1; p += 0.01) {
      const { opacity } = frameMotion(p, 1);
      expect(opacity).toBeGreaterThanOrEqual(0);
      expect(opacity).toBeLessThanOrEqual(1);
    }
  });

  it("changes smoothly: no step bigger than a few pixels between neighbouring frames", () => {
    let previous = frameMotion(0, 1);
    for (let p = 0.005; p <= 1; p += 0.005) {
      const next = frameMotion(p, 1);
      expect(Math.abs(next.x - previous.x)).toBeLessThan(2);
      expect(Math.abs(next.y - previous.y)).toBeLessThan(2.5);
      expect(Math.abs(next.reveal - previous.reveal)).toBeLessThan(2);
      previous = next;
    }
  });
});
