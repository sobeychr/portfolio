import { createContext, useCallback, useState } from 'react';

export type ChatEntry = {
  icon: string;
  name: string;
  uuid: string;
};

type ChatContextType = {
  chat: ChatEntry;
  chatIndex: number;
  chatList: ChatEntry[],
  setChatById: (param: string) => void;
  setChatList: (param: ChatEntry[]) => void;
};

export const ChatContext = createContext({} as ChatContextType);

export const ChatContextComponent = ({ children }) => {
  const [chat, setChat] = useState({} as ChatEntry);
  const [chatIndex, setChatIndex] = useState(0);
  const [chatList, setChatList] = useState([] as ChatEntry[]);

  const setChatById = useCallback((id: string) => {
    const newIndex = chatList.findIndex(({ uuid }) => uuid === id);
    const newChat = chatList[newIndex];

    if (newChat) {
      setChat(newChat);
      setChatIndex(newIndex);
    }
  }, [chatList]);

  const value = {
    chat,
    chatIndex,
    chatList,
    setChatById,
    setChatList,
  };

  return (<ChatContext value={value}>
    {children}
  </ChatContext>);
};
