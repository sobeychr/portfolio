import { sequence } from 'astro:middleware';
import { mainMiddleware } from '@middlewares/main';

export const onRequest = sequence(
  mainMiddleware,
);
