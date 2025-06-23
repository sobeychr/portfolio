import { io } from 'socket.io-client';
import { UserContext } from '@context/user';
import { useContext, useEffect, useState } from 'react';
import type { Socket } from 'socket.io';

export const useChat = () => {
  const userContext = useContext(UserContext);
  const { isLoggedIn, username } = userContext;

  const [localSocket, setLocalSocket] = useState({} as Socket);
  const [userList, setUserList] = useState([] as string[]);

  useEffect(() => {
    if (isLoggedIn) {
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

      socket.on('adduser', username => {
        const uniques = new Set([...userList, username]);
        setUserList(Array.from(uniques));
      });

      socket.emit('newuser', username);

      setLocalSocket(socket);
    }

    return () => {
      localSocket?.disconnect?.();
    };
  }, [isLoggedIn, username]);

  return {
    userList,
  };
};
