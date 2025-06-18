export const authRoutes = app => {
  app.post('/api/v1/auth', async (req, res) => {
    console.log('auth', req.body);

    res.status(200).send('{"mock":"test"}').end();
  });

  app.post('/api/v1/login', (req, res) => {
    console.log('login', req.body);

    res.status(200).send('{"mock":"test"}').end();
  });
};
