import { cyan, magenta } from 'colorette';
import { CServer, type RouteHandler } from './framework';
import { MIDDLEWARES } from './middlewares';
import { ROUTES } from './routes';

const PREFIX = '/mini';

const onNotFound: RouteHandler = (_method, requestPath) => Response.json({
  data: {
    message: 'not found',
  },
  error: 'request not found',
  meta: {
    path: requestPath,
    service: 'blank',
  },
});

const miniServer = new CServer({
  hostname: process.env.SERVER_HOST as string,
  port: parseInt(process.env.SERVER_PORT as string, 10),
  prefix: PREFIX,

  middlewares: MIDDLEWARES,
  routes: ROUTES,

  onNotFound,
});

miniServer.start();

console.log(
  cyan('>>'),
  'server running at',
  magenta(miniServer.server.url.origin.concat(PREFIX)),
);
