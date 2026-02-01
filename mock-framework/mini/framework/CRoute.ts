import globToRegexp from 'glob-to-regexp';
import { METHODS, type RouteHandler } from './types';

export type CRouteParams = {
  name?: string;
  methods: METHODS[];
  pattern: string;
  handler: RouteHandler;
};

export class CRoute implements CRouteParams {
  name;
  methods;
  pattern;
  regexp: RegExp;
  handler;

  constructor(data: CRouteParams) {
    this.name = data?.name;
    this.methods = data?.methods;
    this.pattern = data?.pattern;
    this.handler = data?.handler;

    this.regexp = globToRegexp(this.pattern);
  }

  static validate = (route: CRoute, method: METHODS, path: string) => {
    const isMethod = route.methods.includes(method);
    const isPath = route.regexp.test(path);
    return isMethod && isPath;
  };
}
