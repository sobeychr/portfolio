import type { APIRoute } from 'astro';
import { quickJson } from '@utils/api';
import { getRandomInt } from '@utils/number';
import { getId, getText, getTitle } from '@utils/string';
import { DEFAULT } from '@utils/lorem';

export const GET: APIRoute = () => {
  const texts = [];
  for (let i = 0; i < getRandomInt(1, 10); i++) {
    texts.push({
      id: getId(),
      order: i,
      text: getText(DEFAULT),
      title: getTitle(DEFAULT),
    });
  }

  return quickJson(texts);
};
