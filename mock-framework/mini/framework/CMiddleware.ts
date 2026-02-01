import globToRegexp from 'glob-to-regexp';
import { METHOD_ALL, type METHODS_MIDDLEWARE, type MiddlewareHandler } from './types.d.ts';

export type CMiddlewareParams = {
  name?: string;
  methods: METHODS_MIDDLEWARE[];
  pattern?: string;
  handler: MiddlewareHandler;
};

export class CMiddleware implements CMiddlewareParams {
  name;
  methods;
  pattern;
  regexp?: RegExp;
  handler;

  constructor(data: CMiddlewareParams) {
    this.name = data?.name;
    this.methods = data?.methods;
    this.pattern = data?.pattern;
    this.handler = data?.handler;

    if (this.pattern) {
      this.regexp = globToRegexp(this.pattern);
    }
  }

  static validate = (middleware: CMiddleware, method: METHODS_MIDDLEWARE, path: string) => {
    const isMethod = middleware.methods.includes(METHOD_ALL) || middleware.methods.includes(method);
    // const isPath = middleware.regexp.test(path);

    return isMethod;
  };
}
