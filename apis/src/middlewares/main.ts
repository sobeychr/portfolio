import { defineMiddleware } from 'astro:middleware';
import { quickError } from '@utils/api';
import { IS_DEV, SERVER_HOST, SERVER_PORT } from '@utils/configs';

export const mainMiddleware = defineMiddleware((context, next) => {
  const pathname = context.url.pathname;
  const isApi = pathname.startsWith('/api/');

  if (isApi) {
    const referer = context.request.headers.get('referer') || '';
    const expectedRef = `${SERVER_HOST}:${SERVER_PORT}`;

    if (!IS_DEV && !referer.includes(expectedRef)) {
      return quickError(new Error('Invalid referer'));
    }
  }

  return next();
});
