import { io } from 'socket.io-client';
import { useEffect, useState } from 'react';
import type { Socket } from 'socket.io';

export const useChat = () => {
  const [localSocket, setLocalSocket] = useState({} as Socket);

  useEffect(() => {
    if (!localSocket) {
      const socket = io('/api/v1/chats', {
        transports: ['websocket'],
        withCredentials: true,
      });

      socket.on('connect', () => {
        console.log('client connected', socket.id);
      });

      socket.on('connect_error', err => {
        console.log('client error', err);
      });

      setLocalSocket(socket);
    }
  }, []);

  const onTyping = (username) => {
    localSocket?.emit('cTyping', username);
  };

  return {
    onTyping,
  };
};
