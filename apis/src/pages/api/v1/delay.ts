import type { APIRoute } from 'astro';
import { quickJson } from '@utils/api';
import { getId } from '@utils/string';

const DELAY_DEFAULT = 250;
const DELAY_NAME = 'd';

export const GET: APIRoute = async ({ url }) => {
  const delay = parseInt(url?.searchParams?.get(DELAY_NAME) || '', 10) || DELAY_DEFAULT;

  const start = new Date();
  await new Promise(resolve => setTimeout(() => resolve(true), delay));
  const end = new Date();

  return quickJson({
    delay: delay,
    end: end.toISOString(),
    id: getId(),
    start: start.toISOString(),
  });
};
