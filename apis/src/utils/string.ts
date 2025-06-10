import { v4 as uuidv4 } from 'uuid';
import { getRandomInt } from '@utils/number';

export const getId = () => uuidv4();

export const getText = (str: string): string => {
  const length = getRandomInt(30, 150);
  const start = getRandomInt(0, str.length - length);
  const slice = str.substring(start, start + length).replace(/^\s+/, '').replace(/\s+$/, '');
  return slice.charAt(0).toUpperCase() + slice.substring(1);
};

export const getTitle = (str: string): string => {
  const length = getRandomInt(10, 20);
  const start = getRandomInt(0, str.length - length);
  const slice = str.substring(start, start + length).replace(/^\s+/, '').replace(/\s+$/, '');
  return slice.charAt(0).toUpperCase() + slice.substring(1).replace(/ (\w)/g, find => find.toUpperCase());
};
