import { createContext, useCallback, useState } from 'react';
import { CHAT_COOKIE } from '@utils/configs';
import { getDocumentCookie } from '@utils/cookie';

export type ChatEntry = {
  icon: string;
  index: number;
  name: string;
  uuid: string;
};

type ChatContextType = {
  chat: ChatEntry;
  chatList: ChatEntry[],
  initChat: (param: ChatEntry[]) => void;
  setChatById: (param: string) => void;
};

export const ChatContext = createContext({} as ChatContextType);

export const ChatContextComponent = ({ children }) => {
  const [chat, setChat] = useState({} as ChatEntry);
  const [chatList, setChatList] = useState([] as ChatEntry[]);

  const initChat = useCallback((list: ChatEntry[]) => {
    setChatList(list);

    const lastChatId = getDocumentCookie(CHAT_COOKIE) as string | undefined;
    const lastChat = list.find(({ uuid }) => uuid === lastChatId);
    const firstChat = list[0];

    setChat(lastChat || firstChat);
  }, []);

  const setChatById = useCallback((id: string) => {
    const newChat = chatList.find(({ uuid }) => uuid === id);

    if (newChat) {
      setChat(newChat);
    }
  }, [chatList.length]);

  const value = {
    chat,
    chatList,
    initChat,
    setChatById,
  };

  return (<ChatContext value={value}>
    {children}
  </ChatContext>);
};
