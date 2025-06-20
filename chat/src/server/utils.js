import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { PATH_ROOT } from './configs.js';

const PATH_DATA = PATH_ROOT.concat('src/server/data/');

export const decodeToken = token => {
  const [, payload = ''] = token.split('.');
  return JSON.parse(atob(payload) || '{}') || {};
};

export const getCookieHeader = (cookieName, cookieValue, duration) => {
  return [
    'Set-Cookie',
    `${cookieName}=${cookieValue}; Path=/; Max-Age=${duration}`
  ];
};

export const getFile = (path, asJson = false) => {
  const filepath = resolve(PATH_DATA, path);
  if (!existsSync(filepath)) {
    console.error(`[getFile()] Unable to get file "${filepath}"`);
    return null;
  }

  const str = readFileSync(filepath, { encoding: 'utf-8' });
  return asJson ? JSON.parse(str) : str;
};

export const getToken = (data) => {
  const header = btoa(JSON.stringify({ alg: 'mocked', typ: 'JWT' }));
  const payload = btoa(JSON.stringify(data));
  const signature = btoa('some-mocked-signature');
  return [header, payload, signature].join('.').replaceAll('=', '').replaceAll('%3D', '');
};
