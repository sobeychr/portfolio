import { defineMiddleware } from 'astro:middleware';

export const cacheMiddleware = defineMiddleware((_context, next) => next());

/*
import { CRedis } from '@classes/CRedis';
import { DELAY_DEFAULT, DELAY_MAX, DELAY_MIN, DELAY_NAME } from '@utils/configs';
import { minMax } from '@utils/number';
import { quickError } from '@utils/api';

const cache = new CRedis();

export const cacheMiddleware = defineMiddleware(async (context, next) => {
  const pathname = context.url.pathname;
  const isApi = pathname.includes('/api/');

  if (isApi) {
    if (!cache.isCreated()) {
      await cache.create();
      context.locals.cache = cache;
    }

    const prev = await cache.get(pathname);

    if (prev) {
      console.log('[cacheMiddleware] returned cached value');
      return new Response(prev, {
        headers: new Headers({
          'Content-Length': prev.length,
          'Content-Type': 'application/json;charset=utf8',
        }),
      });
    }

    const delayParam = parseInt(context.url.searchParams?.get(DELAY_NAME) || '', 10) || DELAY_DEFAULT;
    const delay = minMax(delayParam, DELAY_MIN, DELAY_MAX);

    await new Promise(resolve => setTimeout(() => resolve(true), delay));
  }

  const response = await next().catch(err => quickError(err));

  if (isApi && response?.ok) {
    const result = await response?.clone?.()?.text?.().catch(() => '') || '';
    if (result) {
      console.log('[cacheMiddleware] set new cached value');
      await cache.set(pathname, result);
    }
  }

  return response;
});
*/
