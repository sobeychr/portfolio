export const cacheToResponse = (str: string): Response => {
  const data = JSON.parse(str);
  return new Response(data.text, {
    headers: new Headers(data.headers),
    status: data.status,
  });
};

export const quickError = (error: Error): Response => {
  const str = JSON.stringify({
    code: 500,
    message: error.message,
    name: error.name,
  });

  return new Response(str, {
    headers: new Headers({
      'Content-Length': str.length,
      'Content-Type': 'application/json;charset=utf8',
    }),
    status: 500,
  });
};

export const quickJson = (content: object | object[] | string): Response => {
  const da = new Date();
  const size = JSON.stringify(content).length;

  const str = JSON.stringify({
    content,
    meta: {
      generated: da.toISOString(),
      size,
      timestamp: Math.floor(da.getTime() * .001),
    },
  });

  return new Response(str, {
    headers: new Headers({
      'Content-Length': str.length,
      'Content-Type': 'application/json;charset=utf8',
    }),
  });
};

export const responseToCache = async (response: Response): Promise<string> => {
  const resp = response.clone();
  return JSON.stringify({
    headers: Object.fromEntries(resp.headers.entries()),
    status: resp.status,
    text: await resp.text(),
  });
};
