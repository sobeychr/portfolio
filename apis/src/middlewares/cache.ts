import { defineMiddleware } from 'astro:middleware';
import { CRedis } from '@classes/CRedis';

export const cacheMiddleware = defineMiddleware(async (context, next) => {
  if (!context.locals.cache) {
    context.locals.cache = new CRedis();
    await context.locals.cache.create();
  }

  const cache = context.locals.cache;
  await cache?.get('123');

  // await cache?.set('123', 'abc');

  return next();
});
