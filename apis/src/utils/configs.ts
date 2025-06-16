export const IS_DEV = import.meta.env.DEV || false;
export const IS_PROD = import.meta.env.PROD || false;

export const PAGES = [
  { name: 'home', pathname: '/' },
  { name: 'demo', pathname: '/demo' },
];

export const SERVER_HOST = import.meta.env.SERVER_HOST;
export const SERVER_PORT = import.meta.env.SERVER_PORT;
