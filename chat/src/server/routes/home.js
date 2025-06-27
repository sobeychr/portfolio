import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { PATH_ROOT } from './../configs.js';
import { getFile } from './../utils.js';

export const homeRoutes = (app, options = {}) => {
  const { vite } = options;

  const CACHE = new Map();
  const CONFIGS = {
    react: { path: 'react', title: 'React', transform: true },
    solid: { path: 'solid', title: 'Solid', transform: false },
  };

  app.get('/', (_req, res) => {
    const hasCache = CACHE.has('index');

    const html = hasCache
      ? CACHE.get('index')
      : getFile('html/index.html', false);

    if (!hasCache) CACHE.set('index', html);

    if (!res.headersSent) {
      res.status(200).set({
        'Content-Length': html.toString().length,
        'Content-Type': 'text/html; charset=utf-8',
      }).send(html).end();
    }
  });

  app.get('/:page', async (req, res) => {
    const page = req?.params?.page;
    const configs = CONFIGS[page];
    if (!configs) {
      res.redirect('/');
      return false;
    }

    const hasCache = CACHE.has(page);
    let html;

    if (hasCache) {
      html = CACHE.get(page);
    } else {
      const file = getFile('html/page.html', false);
      const parsed = file.replace(/\{\w+\}/g, placeholder => {
        const key = placeholder.substring(1, placeholder.length - 1);
        return configs[key];
      });

      /*
      if (configs.transform) {
        html = await vite.transformIndexHtml('/', parsed);
      }
      */
      html = configs.transform
        ? await vite.transformIndexHtml('/', parsed)
        : parsed;

      CACHE.set(page, html);
    }

    if (!res.headersSent) {
      res.status(200).set({
        'Content-Length': html.toString().length,
        'Content-Type': 'text/html; charset=utf-8',
      }).send(html).end();
    }
  });
};
