import { createContext, createEffect, createResource, createSignal, useContext } from 'solid-js';
import { CHAT_COOKIE } from '@utils/configs';
import { getDocumentCookie } from '@utils/cookie';
import { baseRequest } from '@utils/request';

type ChatContextType = {
  chat: () => ChatEntry;
  chatList: () => ChatEntry[];
  setChatById: (param: string) => void;
};

const ChatContext = createContext({} as ChatContextType);

const fetchChatList = async () =>
  baseRequest({
    url: '/api/v1/chat/list',
  });

export type ChatEntry = {
  icon: string;
  index: number;
  name: string;
  uuid: string;
};

export const ChatContextComponent = (props) => {
  const [chat, setChat] = createSignal({} as ChatEntry);
  const [chatList] = createResource(fetchChatList);

  const setChatById = (id: string) => {
    const newChat = (chatList() || []).find(({ uuid }) => uuid === id);

    if (newChat) {
      setChat(newChat);
    }
  };

  const value = {
    chat,
    chatList,
    setChatById,
  };

  createEffect(() => {
    if (!chatList.loading && !chatList.error) {
      const lastChatId = getDocumentCookie(CHAT_COOKIE) as string | undefined;
      const lastChat = (chatList() || []).find(({ uuid }) => uuid === lastChatId);
      const firstChat = chatList()?.[0];

      setChat(lastChat || firstChat);
    }
  });

  return <ChatContext.Provider value={value}>
    {props.children}
  </ChatContext.Provider>;
};

export const useChatContext = (): ChatContextType => {
  const context = useContext(ChatContext);
  return {
    chat: () => context.chat(),
    chatList: () => context.chatList() || [],
    setChatById: context.setChatById,
  };
};
