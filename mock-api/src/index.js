const express = require('express');
const onDynamic = require('./dynamicRoutes');
const onMiddleware = require('./middleware');
const onProcess = require('./process');
const onRoutes = require('./routes');

const app = express();
app.use(express.json());

onProcess();
onMiddleware(app);
onRoutes(app);
onDynamic(app);

const SERVER_HOST = process.env?.SERVER_HOST ?? 'mock-api.local';
const SERVER_PORT = process.env?.SERVER_PORT ?? 1300;

// Error middleware must be declare after endpoints
app.use((err, _req, res, _next) => {
  console.error('Catching errors', err);
  if (!res.headersSent) {
    res.send('400 Bad Request').end();
  }
});

app.listen(SERVER_PORT, SERVER_HOST, () => {
  console.log(`Running Mock-API at http://${SERVER_HOST}:${SERVER_PORT}`);
});
