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

export const getToken = (data) => {
  const header = btoa(JSON.stringify({ alg: 'mocked', typ: 'JWT' }));
  const payload = btoa(JSON.stringify(data));
  const signature = btoa('some-mocked-signature');
  return [header, payload, signature].join('.').replaceAll('=', '').replaceAll('%3D', '');
};
