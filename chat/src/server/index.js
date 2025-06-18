import express from 'express';
import { resolve } from 'node:path';
import { createServer as createViteServer } from 'vite';
import { appMiddleware } from './middleware.js';
import { authRoutes } from './routes/auth.js';
import { homeRoutes } from './routes/home.js';

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

  const options = {
    PATH_ROOT,
    vite,
  };

  appMiddleware(app, options);
  authRoutes(app);
  homeRoutes(app, options);

  app.listen(SERVER_PORT, SERVER_HOST, () => {
    console.log(`started chat app - ${SERVER_HOST}:${SERVER_PORT}`);
  });
};

createServer();
