const responseTime = require('response-time');
const timeout = require('connect-timeout');

const TIMEOUT = process.env?.TIMEOUT ?? '5s';

const dateToTimeString = date => [
  date.getHours().toString().padStart(2, '0'),
  date.getMinutes().toString().padStart(2, '0'),
  date.getSeconds().toString().padStart(2, '0'),
].join(':');

const onMiddleware = (app) => {
  app.use(responseTime((req, res, time) => {
    const date = dateToTimeString(new Date());
    console.log(`> ${date} ${req.method} ${req.originalUrl} ${time.toFixed(3)}ms`);
  }));

  app.use(timeout(TIMEOUT));
};

module.exports = onMiddleware;
