import { createContext, useEffect, useReducer, useState } from 'react';
import { io } from 'socket.io-client';
import { INIT_STATE, messageReducer } from './messageReducer';

import type { MessageType, StateType } from './messageReducer';

type MessageContextType = {
  offTyping: (param: string) => void;
  onTyping: (param: string) => void;
  sendMessage: (param: MessageType) => void;
  state: StateType;
};

export const MessageContext = createContext({} as MessageContextType);

export const MessageContextComponent = ({ children }) => {
  const [state, dispatch] = useReducer(messageReducer, INIT_STATE);
  const [localSocket, setLocalSocket] = useState({});

  const sendMessage = (message: MessageType) => {
    localSocket?.emit('cMessage', message);
  };

  const offTyping = (username: string) => {
    const hasCurrentUsername = state.typing.includes(username);
    if (hasCurrentUsername) {
      localSocket?.emit('cTyping', { on: false, username });
    }
  };

  const onTyping = (username: string) => {
    const hasCurrentUsername = state.typing.includes(username);
    if (!hasCurrentUsername) {
      localSocket?.emit('cTyping', { on: true, username });
    }
  };

  useEffect(() => {
    const socket = io('/api/v1/chats', {
      transports: ['websocket'],
      withCredentials: true,
    });
    setLocalSocket(socket);

    socket.on('connect', () => {
      console.log('client connected', socket.id);

      socket?.emit('cLoad');
    });

    socket.on('connect_error', err => {
      console.log('client error', err);
    });

    socket.on('sLoad', list => {
      dispatch({
        list,
        type: 'list',
      });
    });

    socket.on('sMessage', ({ chatUuid, content, timestamp, username }) => {
      dispatch({
        message: { chatUuid, content, timestamp, username },
        type: 'message',
      });
    });

    socket.on('sTyping', ({ on, username }) => {
      dispatch({
        on,
        type: 'typing',
        username,
      });
    });
  }, []);

  const value = {
    offTyping,
    onTyping,
    sendMessage,
    state,
  };

  return (<MessageContext value={value}>
    {children}
  </MessageContext>);
};
