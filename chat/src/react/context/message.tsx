import { createContext, useContext, useEffect, useReducer, useState } from 'react';
import { io } from 'socket.io-client';
import { CMessage } from '@classes/CMessage';
import { ChatContext } from '@r-context/chat';
import { UserContext } from '@r-context/user';
import { AUTH_TOKEN } from '@utils/configs';
import { getDocumentCookie } from '@utils/cookie';
import { INIT_STATE, messageReducer, TYPE_LIST, TYPE_MESSAGE, TYPE_TYPING } from './messageReducer';

type MessageContextType = {
  getMessages: () => CMessage[];
  loadMessages: () => void;
  offTyping: () => void;
  onTyping: () => void;
  sendMessage: (param: string) => void;
  typingCount: number;
};

export const MessageContext = createContext({} as MessageContextType);

export const MessageContextComponent = ({ children }) => {
  const chatContext = useContext(ChatContext);
  const userContext = useContext(UserContext);
  const [state, dispatch] = useReducer(messageReducer, INIT_STATE);
  const [localSocket, setLocalSocket] = useState({});

  const isLoggedIn = userContext?.user?.isLoggedIn;

  const getMessages = () => state.messages.filter(({ chatUuid }) => chatUuid === chatContext?.chat?.uuid);

  const loadMessages = () => {
    const chatUuid = chatContext?.chat?.uuid;
    if (chatUuid) {
      localSocket?.emit('cLoad', chatUuid);
    }
  };

  const offTyping = () => {
    const username = userContext?.user?.username;
    const chatUuid = chatContext?.chat?.uuid;
    localSocket?.emit('cTyping', { chatUuid, on: false, username });
  };

  const onTyping = () => {
    const username = userContext?.user?.username;
    const hasCurrentUsername = state.typing.includes(username);

    if (!hasCurrentUsername) {
      const chatUuid = chatContext?.chat?.uuid;
      localSocket?.emit('cTyping', { chatUuid, on: true, username });
    }
  };

  const sendMessage = (content: string) => {
    const message = new CMessage({
      chatUuid: chatContext?.chat?.uuid,
      content,
      timestamp: Date.now(),
      username: userContext?.user?.username,
    });
    localSocket?.emit('cMessage', new CMessage(message));
  };

  const typingCount = state.typing.length;

  useEffect(() => {
    const authToken = getDocumentCookie(AUTH_TOKEN);
    if (!!authToken && isLoggedIn) {
      const socket = io('/api/v1/message', {
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

      socket.on('sLoad', list => {
        dispatch({
          list,
          type: TYPE_LIST,
        });
      });

      socket.on('sMessage', ({ chatUuid, content, timestamp, username }) => {
        dispatch({
          message: new CMessage({ chatUuid, content, timestamp, username }),
          type: TYPE_MESSAGE,
        });
      });
    }
  }, [isLoggedIn]);

  useEffect(() => {
    localSocket?.on?.('sTyping', ({ on, username }) => {
      const isSkip = (on && state.typing.includes(username))
        || (!on && !state.typing.includes(username));

      if (!isSkip) {
        dispatch({
          on,
          type: TYPE_TYPING,
          username,
        });
      }
    });
  }, [localSocket, state.typing]);

  const value = {
    getMessages,
    loadMessages,
    offTyping,
    onTyping,
    sendMessage,
    typingCount,
  };

  return (<MessageContext value={value}>
    {children}
  </MessageContext>);
};
