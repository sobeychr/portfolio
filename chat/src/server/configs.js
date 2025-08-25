import { resolve } from 'node:path';

const TIMEOUT_DEFAULT = '5s';
const TIMEOUT_MIN = 0;
const TIMEOUT_MAX = 10;
const limitTimeout = timeout => {
  const number = parseFloat(timeout);
  return Math.min(TIMEOUT_MAX, Math.max(number, TIMEOUT_MIN));
};

export const AUTH_COOKIE_TOKEN = 'token';
export const AUTH_COOKIE_REFRESH = 'refresh';
export const AUTH_REFRESH = process?.env?.AUTH_REFRESH;
export const AUTH_TOKEN = process?.env?.AUTH_TOKEN;
export const AUTH_POST = 'username';

export const DURATION_HOUR = 3600;
export const DURATION_DAY = DURATION_HOUR * 24;
export const DURATION_WEEK = DURATION_DAY * 7;

export const IS_API_DEV = process?.env?.SERVER_API_DEV === '1';
export const IS_DEV = process?.env?.NODE_ENV || 'development' === 'development';
export const IS_PROD = process?.env?.NODE_ENV || 'development' === 'production';

const timeout = process?.env?.SERVER_TIMEOUT || TIMEOUT_DEFAULT;
const serverTimeout = /^(0\.)?\d+s$/.test(timeout) ? timeout : TIMEOUT_DEFAULT;
export const SERVER_TIMEOUT = limitTimeout(serverTimeout);

export const {
  SERVER_HOST = 'localhost',
  SERVER_PORT = 3000,
} = process?.env || {};

export const PATH_ROOT = resolve(process.cwd(), '.').concat('/');
