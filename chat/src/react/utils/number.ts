export const clamp = (num: number, min: number, max: number): number => Math.min(max, Math.max(num, min));

export const clampLoop = (num: number, min: number, max: number): number => {
  if (num < min) return max;
  if (num > max) return min;
  return num;
};
