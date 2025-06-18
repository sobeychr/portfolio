import chalk from 'chalk';

export const errorMiddleware = (app) => {
  // no endpoint found
  app.use((_req, res) => {
    if (!res.headersSent) {
      res.locals.errorStatus = 404;
      throw new Error('invalid request');
    }
  });

  // error handling
  app.use(async (err, req, res, next) => {
    await next();

    const { method, originalUrl } = req;
    const statusCode = res.locals?.errorStatus || 500;

    console.log(
      chalk.red(`> [Error] ${method} ${originalUrl}`),
      err.message,
    );

    const stack = err.stack.split(/\n\s+/);

    res.status(statusCode).json({
      error: 'unauthorized request',
      details: {
        cause: err.cause,
        columnNumber: err.columnNumber,
        fileName: err.fileName,
        lineNumber: err.lineNumber,
        message: err.message,
        name: err.name,
        stack: stack,
      },
      request: {
        method,
        originalUrl,
      },
    }).end();
  });
};
