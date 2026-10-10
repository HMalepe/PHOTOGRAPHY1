import { describe, expect, it } from "vitest";
import { shuffle } from "@/lib/shuffle";

describe("shuffle", () => {
  it("returns every item exactly once without changing the original", () => {
    const original = [1, 2, 3, 4, 5, 6];
    const result = shuffle(original);
    expect([...result].sort()).toEqual(original);
    expect(original).toEqual([1, 2, 3, 4, 5, 6]);
  });

  it("is deterministic for a given random source", () => {
    const fixed = () => 0;
    expect(shuffle(["a", "b", "c"], fixed)).toEqual(["b", "c", "a"]);
  });

  it("produces different orders across calls", () => {
    const orders = new Set<string>();
    for (let run = 0; run < 40; run++) orders.add(shuffle([1, 2, 3]).join(""));
    expect(orders.size).toBeGreaterThan(1);
  });

  it("handles empty and single-item lists", () => {
    expect(shuffle([])).toEqual([]);
    expect(shuffle(["only"])).toEqual(["only"]);
  });
});
