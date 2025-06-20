import { useContext } from 'react';
import { ChatContext } from '@context/chat';

export const Chat = () => {
  const chatContext = useContext(ChatContext);
  const selected = chatContext.selectedChat;

  return <h1>Chat {selected}</h1>;
};
