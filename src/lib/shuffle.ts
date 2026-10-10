/** Fisher–Yates shuffle returning a new array. */
export function shuffle<T>(items: readonly T[], random: () => number = Math.random): T[] {
  const result = items.slice();
  for (let index = result.length - 1; index > 0; index--) {
    const swap = Math.floor(random() * (index + 1));
    [result[index], result[swap]] = [result[swap]!, result[index]!];
  }
  return result;
}
