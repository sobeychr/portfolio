import { defineMiddleware } from 'astro:middleware';

export const startMiddleware = defineMiddleware((context, next) => {
  // context.locals.logger = new CLogger(request);

  console.log('tt', context.url);

  return next();
});
