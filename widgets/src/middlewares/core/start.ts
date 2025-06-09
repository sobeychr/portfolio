import { defineMiddleware } from 'astro:middleware';
import { existsSync, readFileSync } from 'node:fs';

const MANIFEST_URL = 'public/widgets/manifest.json';

export const startMiddleware = defineMiddleware(async (context, next) => {
  const url = context.url.pathname;

  if (url === '/backend') {
    if (!existsSync(MANIFEST_URL)) {
      console.log(`[startMiddleware()] unable to load manifest file`);
    } else {
      const data = readFileSync(MANIFEST_URL, { encoding: 'utf8' });
      const obj = JSON.parse(data);

      const files = obj?.files || [];
      console.log(`middleware found ${files.length} files`);

      context.locals.tags = obj?.tags || [];
    }
  }

  return next();
});
