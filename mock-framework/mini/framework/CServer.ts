import { serve, type BunRequest, type Server } from 'bun';
import { CMiddleware } from './CMiddleware';
import { CRoute } from './CRoute';
import type { RouteHandler, METHODS } from './types';

export type CServerType = {
  hostname: string;
  port: number;
  prefix?: string;

  middlewares?: CMiddleware[];
  routes?: CRoute[];

  onNotFound?: RouteHandler;
};

export class CServer implements CServerType {
  hostname;
  port;
  prefix = '';

  middlewares;
  routes;

  onNotFound;

  server!: Server<BunRequest>;

  constructor(data: CServerType) {
    this.hostname = data?.hostname;
    this.port = data?.port;
    this.prefix = data?.prefix ?? '';

    this.middlewares = data?.middlewares;
    this.routes = data?.routes;

    this.onNotFound = data?.onNotFound;
  };

  start = () => {
    this.server = serve({
      hostname: this.hostname,
      port: this.port,

      fetch: (request: BunRequest, server: Server<BunRequest>) => {
        const method = request.method as METHODS;
        const path = request.url
          .replace(this.prefix, '')
          .replace(server.url.origin, '');

        const middlewares = this._getMiddlewares(method, path);
        const route = this._getRoute(method, path);

        middlewares.forEach(entry => entry.handler(method, path, request, server));

        if (route) {
          return route.handler(method, path, request, server);
        }

        const notFound = this.onNotFound?.(
          method,
          path,
          request,
          server,
        );

        return notFound ?? new Response('not found fallback');
      },
    });

    return this.server;
  };

  _getMiddlewares = (method: METHODS, path: string): CMiddleware[] => {
    const entries = (this.middlewares || [])
      .filter(middleware => CMiddleware.validate(middleware, method, path));
    return entries;
  };

  _getRoute = (method: METHODS, path: string): CRoute | undefined => {
    const route = (this.routes || [])
      .find(route => CRoute.validate(route, method, path));
    return route;
  };
}
