import type { APIRoute } from 'astro';
import { quickJson } from '@utils/api';
import { getRandomName } from '@utils/name';
import { getRandomInt } from '@utils/number';
import { getId } from '@utils/string';

export const POST: APIRoute = () => {
  const avatars = [];
  for (let i = 0; i < getRandomInt(10, 50); i++) {
    const name = getRandomName();
    avatars.push({
      id: getId(),
      image: '$image1',
      name,
      order: i,
    });
  }

  return quickJson({
    avatars,
    prefix: {
      '$image1': 'https://api.dicebear.com/9.x/lorelei/svg?flip=false&seed=${name}&size=64',
    },
  });
};
