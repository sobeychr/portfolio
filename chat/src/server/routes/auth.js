import { decodeToken, generateTokens, getAuthToken, saveTokens, validateToken } from './../auth-utils.js';
import { AUTH_COOKIE_REFRESH, AUTH_COOKIE_TOKEN, AUTH_POST } from './../configs.js';

export const authRoutes = app => {
  const unauthResponse = response => response
    .status(401)
    .append('Set-Cookie', `${AUTH_COOKIE_TOKEN}=; Path=/; Max-Age=-1`)
    .append('Set-Cookie', `${AUTH_COOKIE_REFRESH}=; Path=/; Max-Age=-1`)
    .send(JSON.stringify({
      loggedIn: false,
    })).end();

  app.post('/api/v1/login', (req, res) => {
    const username = req.body?.[AUTH_POST] || ''; // from POST
    const isValid = !!username;

    if (isValid) {
      const payload = { username };
      const newTokenData = generateTokens(payload);

      saveTokens(username, newTokenData);

      res
        .status(200)
        .send(JSON.stringify({
          ...newTokenData,
          loggedIn: true,
          username,
        })).end();

      return false;
    }

    unauthResponse(res);
  });

  app.post('/api/v1/reset', (req, res) => {
    const isValid = validateToken(req, true);
    if (isValid) {
      const token = getAuthToken(req);
      const { username } = decodeToken(token);
      const payload = { username };
      const newTokenData = generateTokens(payload);

      saveTokens(username, newTokenData);

      res
        .status(200)
        .send(JSON.stringify({
          ...newTokenData,
          loggedIn: true,
          username,
        })).end();

      return false;
    }

    unauthResponse(res);
  });
};
