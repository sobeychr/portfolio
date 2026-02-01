import { cyan, magenta } from 'colorette';
import { serve, type BunRequest, type Server } from 'bun';

const PREFIX = '/blank';

const blankServer = serve({
  port: process.env.SERVER_PORT,
  hostname: process.env.SERVER_HOST,

  routes: {
    [PREFIX + '/']: () => Response.json({
      data: {
        message: 'ok',
      },
      error: null,
      meta: {
        path: '/',
        service: 'blank',
      },
    }),

    [PREFIX + '/alpha']: () => Response.json({
      data: {
        message: 'alpha',
      },
      error: null,
      meta: {
        path: '/alpha',
        service: 'blank',
      },
    }),
  },

  fetch: (request: BunRequest, server: Server<BunRequest>) => {
    const requestPath = request.url
      .replace(PREFIX, '')
      .replace(server.url.origin, '');

    return Response.json({
      data: {
        message: 'not found',
      },
      error: 'request not found',
      meta: {
        path: requestPath,
        service: 'blank',
      },
    });
  }
});

console.log(
  cyan('>>'),
  'server running at',
  magenta(blankServer.url.origin.concat(PREFIX)),
);
