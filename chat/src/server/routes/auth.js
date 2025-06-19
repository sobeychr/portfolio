import { AUTH_COOKIE, AUTH_POST, DURATION_WEEK } from './../configs.js';

export const authRoutes = app => {
  const getExpires = () => Math.floor(Date.now() * .001) + DURATION_WEEK;

  const unauthResponse = res => res
    .status(401)
    .append('Set-Cookie', `${AUTH_COOKIE}=; Path=/; Max-Age=-1`)
    .send(JSON.stringify({
      loggedIn: false,
    })).end();

  app.post('/api/v1/login', async (req, res) => {
    const username = req.body?.[AUTH_POST] || ''; // from POST

    if (username) {
      const expires = getExpires();

      const header = btoa(JSON.stringify({ alg: 'mocked', typ: 'JWT' }));
      const payload = btoa(JSON.stringify({ expires, username }));
      const signature = btoa('some-mocked-signature');
      const newToken = [header, payload, signature].join('.').replaceAll('=', '').replaceAll('%3D', '');

      res
        .status(200)
        .append('Set-Cookie', `${AUTH_COOKIE}=${newToken}; Path=/; Max-Age=${DURATION_WEEK}`)
        .send(JSON.stringify({
          expires,
          loggedIn: true,
          token: newToken,
          username,
        })).end();

      return false;
    }

    unauthResponse(res);
  });

  app.post('/api/v1/reset', async (req, res) => {
    const token = req.cookies?.[AUTH_COOKIE] || ''; // from COOKIE

    if (token) {
      const [header = '', payload = '', signature = ''] = token.split('.');
      const content = JSON.parse(atob(payload) || '{}') || {};
      const { expires = 0, username = '' } = content;

      if (expires >= Date.now() * .001 && !!username) {
        const newExpires = getExpires();
        const newPayload = btoa(JSON.stringify({ expires: newExpires, username }));
        const newToken = [header, newPayload, signature].join('.').replaceAll('=', '').replaceAll('%3D', '');

        res
          .status(200)
          .append('Set-Cookie', `${AUTH_COOKIE}=${newToken}; Path=/; Max-Age=${DURATION_WEEK}`)
          .send(JSON.stringify({
            expires,
            loggedIn: true,
            token: newToken,
            username,
          })).end();
        return false;
      }
    }

    unauthResponse(res);
  });
};
