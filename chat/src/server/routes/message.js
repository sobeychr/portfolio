import cookieParser from 'cookie-parser';
import { Server as IoServer } from 'socket.io';
import { validateCookie, validateToken } from './../auth-utils.js';
import { getFile, saveFile } from './../utils.js';

export const messageRoutes = (_app, options = {}) => {
  const { server } = options;

  const io = new IoServer(server);

  io.engine.use(cookieParser());
  io.engine.use((req, _res, next) => {
    const isValid = validateToken(req) || validateCookie(req);

    if (isValid) {
      next();
    }
    else {
      next(new Error('unauthorized request'));
    }
  });

  io.of('/api/v1/message').on('connection', (socket) => {
    console.log('server connected', socket.id);

    socket.on('connect_error', err => {
      console.log('connection error', socket.id, err);
    });

    socket.on('disconnect', () => {
      console.log('server disconnected', socket.id);
    });

    socket.on('cLoad', (chatUuid) => {
      const cached = getFile(`cache/${chatUuid}.json`) || [];
      socket.emit('sLoad', cached);
    });

    socket.on('cMessage', ({ chatUuid, content, timestamp, username, }) => {
      const newMessage = {
        chatUuid, content, timestamp, username,
      };

      const path = `cache/${chatUuid}.json`;
      const prevList = getFile(path) || [];
      const newList = [...prevList, newMessage];
      saveFile(path, JSON.stringify(newList));

      socket.emit('sMessage', newMessage);
      socket.broadcast.emit('sMessage', newMessage);
    });

    socket.on('cTyping', ({ chatUuid, on, username }) => {
      socket.broadcast.emit('sTyping', { chatUuid, on, username });
    });
  });
};
