import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { PATH_ROOT } from './../configs.js';

export const homeRoutes = (app, options = {}) => {
  const { vite } = options;

  app.get('/', async (_req, res) => {
    const template = readFileSync(
      resolve(PATH_ROOT, 'index.html'),
      'utf-8',
    );

    const html = await vite.transformIndexHtml('/', template);

    res.status(200).set({
      'Content-Length': html.toString().length,
      'Content-Type': 'text/html; charset=utf-8',
    }).send(html).end();
  });
};
