import type { BunRequest, Server } from 'bun';

export enum METHODS {
  GET = 'GET',
  POST = 'POST',
  OPTIONS = 'OPTIONS',
};

export const METHOD_ALL = '*';

export type METHODS_MIDDLEWARE = METHODS | METHOD_ALL;

export type MiddlewareHandler = (
  method: METHODS,
  path: string,
  request: BunRequest,
  server: Server<BunRequest>
) => void;

export type RouteHandler = (
  method: METHODS,
  path: string,
  request: BunRequest,
  server: Server<BunRequest>
) => Response;
