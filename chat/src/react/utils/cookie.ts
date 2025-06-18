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
