import chalk from 'chalk';
import express from 'express';
import responseTime from 'response-time';
import timeout from 'connect-timeout';
import cookieParser from 'cookie-parser';

export const appMiddleware = (app, options = {}) => {
  const { vite } = options;

  app.use(cookieParser());

  app.use(express.json());

  app.use(vite.middlewares);

  app.use(responseTime((req, _res, time) => {
    const { method, originalUrl } = req;
    const date = new Date();
    const timeStr = [
      date.toTimeString().split(' ')?.[0] || '',
      '.',
      date.getMilliseconds().toString().padStart(3, '0'),
    ].join('');

    console.log(
      '>',
      chalk.cyan(timeStr),
      chalk.white(`${time.toFixed(3)}ms`),
      chalk.magenta(`[${method}] ${originalUrl}`),
    );
  }));

  app.use(timeout('5s'));
};
