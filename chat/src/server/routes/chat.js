import { getFile } from './../utils.js';

export const chatRoutes = (app) => {
  let cacheList;
  const getList = () => {
    if (cacheList) {
      return cacheList;
    }

    cacheList = JSON.stringify(getFile('chats.json', true));
    return cacheList;
  };

  app.get('/api/v1/chat/list', (_req, res) => {
    const data = getList();

    res
      .status(200)
      .set({
        'Content-Length': data.toString().length,
        'Content-Type': 'application/json; charset=utf-8',
      })
      .send(data).end();
  });
};
