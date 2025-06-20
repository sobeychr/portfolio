export const getDocumentCookie = (cookieName: string): number | string | undefined => {
  const arr = (document?.cookie || '').split('; ').map(entry => {
    const [key, value] = entry.split('=');
    return [key, parseFloat(value) || value];
  });
  const map = new Map(arr);
  return map.get(cookieName) as number | string | undefined;
};

export const setDocumentCookie = (cookieName: string, value: number | string, opts: optsParam = {}) => {
  const options = [
    opts.expires && `expires=${opts.expires}`,
    opts.maxAge && `max-age=${opts.maxAge}`,
    `path=${opts.path || '/'}`,
  ].filter(Boolean);

  const newStr = `${cookieName}=${value};${options.join(';')};`;
  if (!!document && !!document.cookie) {
    document.cookie = newStr;
  }
};
