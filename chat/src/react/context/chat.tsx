import { createContext, useCallback, useState } from 'react';

export type ChatEntry = {
  icon: string;
  name: string;
  uuid: string;
};

type ChatContextType = {
  chat: ChatEntry;
  chatList: ChatEntry[],
  setChatById: (param: string) => void;
  setChatList: (param: ChatEntry[]) => void;
};

export const ChatContext = createContext({} as ChatContextType);

export const ChatContextComponent = ({ children }) => {
  const [chat, setChat] = useState({} as ChatEntry);
  const [chatList, setChatList] = useState([] as ChatEntry[]);

  const setChatById = useCallback((id: string) => {
    const newChat = chatList.find(({ uuid }) => uuid === id);

    if (newChat) {
      setChat(newChat);
    }
  }, [chatList]);

  const value = {
    chat,
    chatList,
    setChatById,
    setChatList,
  };

  return (<ChatContext value={value}>
    {children}
  </ChatContext>);
};
