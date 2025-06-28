import { io } from 'socket.io-client';
import { createContext, createSignal, onMount, useContext } from 'solid-js';
import { createStore } from 'solid-js/store';
import { CMessage, type CMessageParam } from '@classes/CMessage';

type StoreType = {
  messages: CMessage[];
  typing: string[];
};

type MessageContextType = {
  offTyping: (param: string) => void;
  onTyping: (param: string) => void;
  sendMessage: (param: CMessageParam) => void;
  store: StoreType;
};

const INIT_STATE = {
  messages: [],
  typing: [],
} as StoreType;

export const MessageContext = createContext({} as MessageContextType);

export const MessageContextComponent = (props) => {
  const [localSocket, setLocalSocket] = createSignal({});
  const [store, setStore] = createStore(INIT_STATE);

  const offTyping = (username: string) => {
    const hasCurrentUsername = store.typing.includes(username);
    if (hasCurrentUsername) {
      localSocket()?.emit('cTyping', { on: false, username });
    }
  };

  const onTyping = (username: string) => {
    const hasCurrentUsername = store.typing.includes(username);
    if (!hasCurrentUsername) {
      localSocket()?.emit('cTyping', { on: true, username });
    }
  };

  const sendMessage = (message: CMessageParam) => {
    localSocket()?.emit('cMessage', new CMessage(message));
  };

  onMount(() => {
    const socket = io('/api/v1/chats', {
      transports: ['websocket'],
      withCredentials: true,
    });

    socket.on('connect', () => {
      console.log('client connected', socket.id);

      socket?.emit('cLoad');
    });
    setLocalSocket(socket);

    socket.on('connect_error', err => {
      console.log('client error', err);
    });

    socket.on('sLoad', list => {
      setStore({ messages: CMessage.generateList(list || []) });
    });

    socket.on('sMessage', ({ chatUuid, content, timestamp, username }) => {
      setStore(state => {
        const newMessage = new CMessage({
          chatUuid,
          content,
          timestamp,
          username,
        });
        const newList = [...state.messages, newMessage].sort(CMessage.sort);

        return {
          ...state,
          messages: newList,
        };
      });
    });

    socket.on('sTyping', ({ on, username }) => {
      setStore(state => {
        const uniques = !on ? [] : new Set([...state.typing, username]);
        const newTyping = on
          ? Array.from(uniques)
          : [...state.typing].filter(name => name !== username);

        return {
          ...state,
          typing: newTyping,
        };
      });
    });
  });

  const value = {
    offTyping,
    onTyping,
    sendMessage,
    store,
  };

  return <MessageContext.Provider value={value}>
    {props.children}
  </MessageContext.Provider>;
};

export const useMessageContext = (): MessageContextType => useContext(MessageContext);
