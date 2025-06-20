import { useContext } from 'react';
import { ChatContext } from '@context/chat';

export const Chat = () => {
  const chatContext = useContext(ChatContext);
  const chat = chatContext.chat;

  return <h1>Chat {chat?.name}</h1>;
};
