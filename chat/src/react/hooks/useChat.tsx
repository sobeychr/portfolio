import { useEffect, useReducer, useState } from 'react';
import { io } from 'socket.io-client';

const INIT_STATE = {
  typing: [],
};

const reducer = (state, action) => {
  if (action.type === 'typing') {
    const uniques = new Set([...state.typing, action.username]);
    const newTyping = Array.from(uniques);

    return {
      ...state,
      typing: newTyping,
    };
  }

  return state;
};

export const useChat = () => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);
  const [localSocket, setLocalSocket] = useState({});

  const onTyping = (username) => {
    localSocket?.emit('cTyping', username);
  };

  useEffect(() => {
    if (!localSocket?.emit) {
      const socket = io('/api/v1/chats', {
        transports: ['websocket'],
        withCredentials: true,
      });
      setLocalSocket(socket);

      socket.on('connect', () => {
        console.log('client connected', socket.id);
      });

      socket.on('connect_error', err => {
        console.log('client error', err);
      });

      socket.on('sTyping', username => {
        dispatch({ type: 'typing', username });
      });
    }
  }, []);

  return {
    onTyping,
    state,
  };
};
