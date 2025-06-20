import { AUTH_COOKIE, AUTH_POST, DURATION_DAY, DURATION_WEEK } from './../configs.js';
import { decodeToken, getCookieHeader, getToken } from './../utils.js';

export const authRoutes = app => {
  const getExpires = () => Math.floor(Date.now() * .001) + DURATION_WEEK;

  const unauthResponse = res => res
    .status(401)
    .append(...getCookieHeader(AUTH_COOKIE, '', -1))
    .send(JSON.stringify({
      loggedIn: false,
    })).end();

  app.post('/api/v1/login', async (req, res) => {
    const username = req.body?.[AUTH_POST] || ''; // from POST

    if (username) {
      const expires = getExpires();
      const newToken = getToken({ expires, username });
      const cookieHeader = getCookieHeader(AUTH_COOKIE, newToken, DURATION_WEEK);

      res
        .status(200)
        .append(...cookieHeader)
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
    const tokenCookie = req.cookies?.[AUTH_COOKIE] || ''; // from COOKIE
    const tokenPost = req.body?.[AUTH_COOKIE] || ''; // from POST
    const token = tokenPost || tokenCookie;

    if (token) {
      const { expires = 0, username = '' } = decodeToken(token);
      const diff = expires - Math.floor(Date.now() * 0.001);
      const isValid = diff > 0 && !!username;

      if (isValid) {

        const isNeedRefresh = diff < DURATION_DAY;
        if (isNeedRefresh) {
          const newExpires = getExpires();
          const newToken = getToken({ expires: newExpires, username });
          const cookieHeader = getCookieHeader(AUTH_COOKIE, newToken, DURATION_WEEK);

          res
            .status(200)
            .append(...cookieHeader)
            .send(JSON.stringify({
              expires,
              loggedIn: true,
              token: newToken,
              username,
            })).end();
          return false;
        }

        // regular valid
        res
          .status(200)
          .send(JSON.stringify({
            expires,
            loggedIn: true,
            token,
            username,
          })).end();
        return false;
      }
    }

    unauthResponse(res);
  });
};
