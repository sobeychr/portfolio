import { createContext, useState } from 'react';

type ChatContextType = {
  selectedChat: number;
  setSelectedChat: (param: number) => void;
};

export const ChatContext = createContext({} as ChatContextType);

export const ChatContextComponent = ({ children }) => {
  const [selectedChat, setSelectedChat] = useState(0);

  const tt = (id) => {
    console.log('chat context', id);
    setSelectedChat(id);
  };

  const value = {
    selectedChat,
    setSelectedChat: tt,
  };

  return (<ChatContext value={value}>
    {children}
  </ChatContext>);
};
