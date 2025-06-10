import { sequence } from 'astro:middleware';
import { cacheMiddleware } from '@middlewares/cache';

export const onRequest = sequence(
  cacheMiddleware,
);
