import { io } from 'socket.io-client';
import { createContext, createSignal, onMount, useContext } from 'solid-js';
import { createStore } from 'solid-js/store';
import { CMessage } from '@classes/CMessage';
import { useChatContext } from '@s-context/chat';
import { useUserContext } from '@s-context/user';

type StoreType = {
  messages: CMessage[];
  typing: string[];
};

type MessageContextType = {
  getMessages: () => CMessage[];
  loadMessages: () => void;
  offTyping: () => void;
  onTyping: () => void;
  sendMessage: (param: string) => void;
  typingCount: () => number;
};

const INIT_STATE = {
  messages: [],
  typing: [],
} as StoreType;

export const MessageContext = createContext({} as MessageContextType);

export const MessageContextComponent = (props) => {
  const chatContext = useChatContext();
  const userContext = useUserContext();
  const [localSocket, setLocalSocket] = createSignal({});
  const [store, setStore] = createStore(INIT_STATE);

  const getMessages = () => store.messages.filter(({ chatUuid }) => chatUuid === chatContext?.chat()?.uuid);

  const loadMessages = () => {
    const chatUuid = chatContext?.chat()?.uuid;
    if (chatUuid) {
      localSocket()?.emit('cLoad', chatUuid);
    }
  };

  const offTyping = () => {
    const username = userContext?.user()?.username;
    const chatUuid = chatContext?.chat()?.uuid;
    localSocket()?.emit('cTyping', { chatUuid, on: false, username });
  };

  const onTyping = () => {
    const username = userContext?.user()?.username;
    const hasCurrentUsername = store.typing.includes(username);

    if (!hasCurrentUsername) {
      const chatUuid = chatContext?.chat()?.uuid;
      localSocket()?.emit('cTyping', { chatUuid, on: true, username });
    }
  };

  const sendMessage = (content: string) => {
    const message = new CMessage({
      chatUuid: chatContext?.chat()?.uuid,
      content,
      timestamp: Date.now(),
      username: userContext?.user()?.username,
    });
    localSocket()?.emit('cMessage', message);
  };

  const typingCount = () => store.typing.length;

  onMount(() => {
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
      const isSkip = (on && store.typing.includes(username))
        || (!on && !store.typing.includes(username));

      if (!isSkip) {
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
      }
    });
  });

  const value = {
    getMessages,
    loadMessages,
    offTyping,
    onTyping,
    sendMessage,
    typingCount,
  };

  return <MessageContext.Provider value={value}>
    {props.children}
  </MessageContext.Provider>;
};

export const useMessageContext = (): MessageContextType => useContext(MessageContext);
