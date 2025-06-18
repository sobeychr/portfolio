import { resolve } from 'node:path';

export const IS_DEV = process?.env?.NODE_ENV || 'development' === 'development';
export const IS_PROD = process?.env?.NODE_ENV || 'development' === 'production';

export const {
  SERVER_HOST = 'localhost',
  SERVER_PORT = 3000,
} = process?.env || {};

export const PATH_ROOT = resolve(process.cwd(), '.').concat('/');
