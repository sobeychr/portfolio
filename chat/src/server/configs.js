import { resolve } from 'node:path';

export const AUTH_COOKIE = 'token';
export const AUTH_POST = 'username';

export const DURATION_HOUR = 3600;
export const DURATION_DAY = DURATION_HOUR * 24;
export const DURATION_WEEK = DURATION_DAY * 7;

export const IS_DEV = process?.env?.NODE_ENV || 'development' === 'development';
export const IS_PROD = process?.env?.NODE_ENV || 'development' === 'production';

export const {
  SERVER_HOST = 'localhost',
  SERVER_PORT = 3000,
} = process?.env || {};

export const PATH_ROOT = resolve(process.cwd(), '.').concat('/');
