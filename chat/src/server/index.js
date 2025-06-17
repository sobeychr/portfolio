import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import express from 'express';
import { createServer as createViteServer } from 'vite';

const {
  SERVER_HOST = 'localhost',
  SERVER_PORT = 3000,
} = process?.env || {};

const PATH_ROOT = resolve(process.cwd(), '.').concat('/');

const createServer = async () => {
  const app = express();
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'custom',
  });

  app.use(vite.middlewares);

  app.use('/test', async (_req, res) => {
    console.log('test request');

    res.status(200).send('test').end();
  });

  app.use('/', async (_req, res) => {
    const template = readFileSync(
      resolve(PATH_ROOT, 'index.html'),
      'utf-8',
    );

    const html = await vite.transformIndexHtml('/', template);

    res.status(200).set({
      'Content-Type': 'text/html; charset=utf-8',
      'Content-Length': html.toString().length,
    }).send(html).end();
  });

  app.listen(SERVER_PORT, SERVER_HOST, () => {
    console.log(`started ${SERVER_HOST}:${SERVER_PORT}`);
  });
};

createServer();
