import { sequence } from 'astro:middleware';
import { startMiddleware } from '@middlewares/core/start';

export const onRequest = sequence(
  startMiddleware,
);
