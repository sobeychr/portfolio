import type { APIRoute } from 'astro';

export const GET: APIRoute = () => {
  const str = JSON.stringify({

  });
  return new Response(str, {
    headers: new Headers({
      'Content-Length': str.length,
      'Content-Type': 'application/json;charset=utf8',
    })
  });
};
