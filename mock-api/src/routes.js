const readFile = require('./readFile');

const onRoutes = (app) => {
  app.get('/', (_req, res) => {
    res.status(200).send('Mock-API').end();
  });

  app.get('/healthcheck', (_req, res) => {
    res.status(200).send('ok').end();
  });

  app.get('/test-json', (_req, res) => {
    const data = readFile('test-1.json');
    res.status(200).json(data).end();
  });

  app.get('/test-html', (_req, res) => {
    const data = readFile('test-0.html', false);
    res.status(200).set({
      'Content-Type': 'text/html; charset=utf-8',
      'Content-Length': data.toString().length,
    }).send(data).end();
  });

  app.post('/test-post', (req, res) => {
    const data = req.body ?? {};

    console.log('Received "/test-post" with', data);

    res.status(200).json({ message: 'ok', request: 'test-post' }).end();
  });

  app.use('/test-error', (_req, res) => {
    console.log('Mocking "/test-error"');

    throw new Error('mock');

    res.sendStatus(500).json({ message: 'not ok', request: 'test-error' }).end();
  });

  app.use('/test-timeout', (_req, res) => {
    setTimeout(() => {
      if (!res.headersSent) {
        res.sendStatus(200).send('after timeout').end();
      }
    }, 5500);
  });
};

module.exports = onRoutes;
