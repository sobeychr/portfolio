import { CMiddleware, METHODS, METHOD_ALL } from './framework';

export const MIDDLEWARES = [
  new CMiddleware({
    name: 'GET MID',
    methods: [METHODS.GET],
    handler: (_method, path) => {
      console.log('GET middleware', path);
    },
  }),
  new CMiddleware({
    name: 'ALL MID',
    methods: [METHOD_ALL],
    handler: (_method, path) => {
      console.log('All middleware', path);
    },
  }),
];
