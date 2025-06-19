import express from 'express';
import { createServer as createViteServer } from 'vite';
import { SERVER_HOST, SERVER_PORT } from './configs.js';
import { errorMiddleware } from './middlewares/error.js';
import { coreMiddleware } from './middlewares/core.js';
import { authRoutes } from './routes/auth.js';
import { homeRoutes } from './routes/home.js';

const createServer = async () => {
  const app = express();
  const vite = await createViteServer({
    appType: 'custom',
    server: { middlewareMode: true },
  });

  const options = { vite };

  coreMiddleware(app, options);
  authRoutes(app);
  homeRoutes(app, options);
  errorMiddleware(app);

  app.listen(SERVER_PORT, SERVER_HOST, () => {
    console.log(`started chat app - ${SERVER_HOST}:${SERVER_PORT}`);
  });
};

createServer();
