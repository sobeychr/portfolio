import { Server as IoServer } from 'socket.io';
import { getFile } from './../utils.js';

export const chatRoutes = (app, options = {}) => {
  const { server } = options;

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

  const io = new IoServer(server);
  io.of('/api/v1/chats').on('connection', (socket) => {
    console.log('server connected', socket.id);

    socket.on('disconnect', () => {
      console.log('server disconnected', socket.id);
    });

    socket.on('newuser', username => {
      socket.emit('adduser', username);
    });

    socket.on('cTyping', username => {
      console.log('sTyping', username);
    });
  });
};
