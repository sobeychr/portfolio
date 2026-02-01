import { CRoute, METHODS } from './framework';

export const ROUTES = [
  new CRoute({
    name: 'home',
    methods: [METHODS.GET],
    pattern: '/',
    handler: () => Response.json({
      data: {
        message: 'ok',
      },
      error: null,
      meta: {
        path: '/',
        service: 'mini',
      },
    }),
  }),
  new CRoute({
    name: 'test',
    methods: [METHODS.GET, METHODS.POST],
    pattern: '/test/*',
    handler: (_method, path) => Response.json({
      data: {
        message: 'test',
        details: `testing path "${path}"`
      },
      error: null,
      meta: {
        path: '/test',
        service: 'mini',
      },
    }),
  }),
];
