import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { PATH_ROOT } from './../configs.js';

export const homeRoutes = (app, options = {}) => {
  const { vite } = options;

  let cacheTemplate;
  const getTemplate = async () => {
    if (cacheTemplate) {
      // return cacheTemplate;
    }

    const template = readFileSync(
      resolve(PATH_ROOT, 'index.html'),
      'utf-8',
    );
    cacheTemplate = await vite.transformIndexHtml('/', template);
    return cacheTemplate;
  };

  app.get('/', async (_req, res) => {
    const html = await getTemplate();

    if (!res.headersSent) {
      res.status(200).set({
        'Content-Length': html.toString().length,
        'Content-Type': 'text/html; charset=utf-8',
      }).send(html).end();
    }
  });
};
