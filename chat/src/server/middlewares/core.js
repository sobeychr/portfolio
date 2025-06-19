import chalk from 'chalk';
import timeout from 'connect-timeout';
import cookieParser from 'cookie-parser';
import express from 'express';
import responseTime from 'response-time';
import { IS_API_DEV, IS_DEV, SERVER_HOST, SERVER_PORT, SERVER_TIMEOUT } from './../configs.js';

/* eslint-disable sort-keys */
const STATUS_CHALK = [
  { min: 200, max: 299, method: 'green' },
  { min: 300, max: 399, method: 'yellow' },
  { min: 400, max: 499, method: 'red' },
  { min: 500, max: 599, method: 'bgRed' },
];
/* eslint-enable sort-keys */
const statusToChalk = statusCode => {
  const method = STATUS_CHALK.find(({ min, max }) => min <= statusCode && statusCode <= max)?.method || 'white';
  return chalk[method](statusCode);
};

export const coreMiddleware = (app, options = {}) => {
  const { vite } = options;

  app.use(cookieParser());

  app.use(express.json());

  app.use(vite.middlewares);

  app.use(responseTime((req, res, time) => {
    const { method, originalUrl } = req;
    const date = new Date();
    const timeStr = [
      date.toTimeString().split(' ')?.[0] || '',
      '.',
      date.getMilliseconds().toString().padStart(3, '0'),
    ].join('');
    const statusCode = res.statusCode;

    console.log(
      '>',
      chalk.cyan(timeStr),
      chalk.white(`${time.toFixed(3)}ms`),
      statusToChalk(statusCode),
      chalk.magenta(`[${method}] ${originalUrl}`),
    );
  }));

  app.use(timeout(SERVER_TIMEOUT));

  app.use((req, res, next) => {
    const path = req.path;
    const isApi = path.startsWith('/api/');

    if (isApi) {
      const referer = req.headers?.referer || '';
      const expectedRef = `${SERVER_HOST}:${SERVER_PORT}`;
      const isAllowDev = IS_API_DEV && !!IS_DEV;

      if (!isAllowDev && !referer.includes(expectedRef)) {
        res.status(401).json({
          error: 'unauthorized request',
        }).end();

        return false;
      }
    }

    next();
  });
};
