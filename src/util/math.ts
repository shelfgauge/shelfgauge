export function normalize(n: number, min: number, max: number): number {
  const range = max - min;
  return (n - min) / range;
}
