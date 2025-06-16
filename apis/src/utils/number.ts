export const minMax = (num: number, min: number, max: number): number => Math.max(Math.min(num, max), min);

export const getRandomInt = (min: number, max: number): number => Math.floor(Math.random() * max + min);
