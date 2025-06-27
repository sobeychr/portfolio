import { createContext, useEffect, useReducer, useState } from 'react';
import { io } from 'socket.io-client';
import { CMessage, type CMessageParam } from '@classes/CMessage';
import { INIT_STATE, messageReducer } from './messageReducer';

type MessageContextType = {
  messages: CMessage[];
  offTyping: (param: string) => void;
  onTyping: (param: string) => void;
  sendMessage: (param: CMessageParam) => void;
  typing: string[];
};

export const MessageContext = createContext({} as MessageContextType);

export const MessageContextComponent = ({ children }) => {
  const [state, dispatch] = useReducer(messageReducer, INIT_STATE);
  const [localSocket, setLocalSocket] = useState({});

  const sendMessage = (message: CMessageParam) => {
    localSocket?.emit('cMessage', new CMessage(message));
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
        message: new CMessage({ chatUuid, content, timestamp, username }),
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
    messages: state.messages || [],
    offTyping,
    onTyping,
    sendMessage,
    typing: state.typing || [],
  };

  return (<MessageContext value={value}>
    {children}
  </MessageContext>);
};
