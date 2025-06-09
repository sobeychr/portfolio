import { sequence } from 'astro:middleware';
import { backendMiddleware } from '@middlewares/backend';

export const onRequest = sequence(
  backendMiddleware,
);
