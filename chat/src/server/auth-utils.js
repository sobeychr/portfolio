import jwt from 'jsonwebtoken';
import { AUTH_COOKIE_TOKEN, AUTH_REFRESH, AUTH_TOKEN } from './configs.js';
import { getFile, saveFile } from './utils.js';

const EXPIRE_REFRESH = '6h';
const EXPIRE_TOKEN = '1h';
const PATH_CACHE = 'cache/token.json';
const SIGN_OPTIONS = { algorithm: 'HS256' };

export const decodeToken = token => {
  const [, payload = ''] = token.split('.');
  return JSON.parse(atob(payload) || '{}') || {};
};

export const generateTokens = (payload) => {
  const newRefresh = jwt.sign(payload, AUTH_REFRESH, {
    ...SIGN_OPTIONS,
    expiresIn: EXPIRE_REFRESH,
  });
  const newToken = jwt.sign(payload, AUTH_TOKEN, {
    ...SIGN_OPTIONS,
    expiresIn: EXPIRE_TOKEN,
  });

  const { exp: refresh_expire } = decodeToken(newRefresh);
  const { exp: token_expire } = decodeToken(newToken);

  return {
    refresh: newRefresh,
    refresh_expire,
    token: newToken,
    token_expire,
  };
};

export const getAuthToken = request => {
  const auth = request.headers?.['authorization'] || '';
  return auth.replace('Bearer ', '');
};

export const getTokens = username => {
  const prevCache = getFile(PATH_CACHE) || {};
  return prevCache[username] || null;
};

export const saveTokens = (username, tokenData) => {
  const prevCache = getFile(PATH_CACHE) || {};
  const newCache = {
    ...prevCache,
    [username]: tokenData,
  };
  saveFile(PATH_CACHE, JSON.stringify(newCache));
};

export const validateCookie = (request) => {
  const accessCookie = request?.cookies?.[AUTH_COOKIE_TOKEN] || '';
  const { username } = decodeToken(accessCookie);
  const prevTokens = getTokens(username);

  const prevToken = prevTokens?.token;
  const prevExpire = prevTokens?.token_expire;
  const now = Date.now() * .001;

  return prevToken === accessCookie && now < prevExpire;
};

export const validateToken = (request, asRefresh = false) => {
  const accessToken = getAuthToken(request) || '';
  const { username } = decodeToken(accessToken);
  const prevTokens = getTokens(username);

  const prevToken = asRefresh
    ? prevTokens?.refresh
    : prevTokens?.token;
  const prevExpire = asRefresh
    ? prevTokens?.refresh_expire
    : prevTokens?.token_expire;
  const now = Date.now() * .001;

  return prevToken === accessToken && now < prevExpire;
};
