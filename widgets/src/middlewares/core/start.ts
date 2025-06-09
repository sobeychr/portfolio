import { defineMiddleware } from 'astro:middleware';

export const startMiddleware = defineMiddleware((_context, next) => {
  return next();
});
