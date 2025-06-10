export const quickJson = (content: object | object[] | string) => {
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
    })
  });
};
