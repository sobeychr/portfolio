import express from 'express';
import http from 'http';
import { createServer as createViteServer } from 'vite';
import { SERVER_HOST, SERVER_PORT } from './configs.js';
import { coreMiddleware } from './middlewares/core.js';
import { errorMiddleware } from './middlewares/error.js';
import { authRoutes } from './routes/auth.js';
import { chatRoutes } from './routes/chat.js';
import { homeRoutes } from './routes/home.js';
import { messageRoutes } from './routes/message.js';

const createServer = async () => {
  const app = express();
  const server = http.createServer(app, {
    cors: {
      allowedHeaders: ['Authorization'],
      credentials: true,
      origin: `${SERVER_HOST}:${SERVER_PORT}`,
    },
  });
  const vite = await createViteServer({
    appType: 'custom',
    server: { middlewareMode: true },
  });

  const options = { server, vite };

  coreMiddleware(app, options);
  authRoutes(app);
  chatRoutes(app);
  homeRoutes(app, options);
  messageRoutes(app, options);
  errorMiddleware(app);

  server.listen(SERVER_PORT, SERVER_HOST, () => {
    console.log(`started chat app - ${SERVER_HOST}:${SERVER_PORT}`);
  });
};

createServer();
