import { useContext, useEffect } from 'react';
import { ChatMain } from '@components/chat/main';
import { Login } from '@components/login';
import { Sidebar } from '@components/sidebar';
import type { ChatEntry } from '@context/chat';
import { ChatContext } from '@context/chat';
import { UserContext } from '@context/user';
import { baseRequest } from '@utils/request';

export const Main = () => {
  const chatContext = useContext(ChatContext);
  const userContext = useContext(UserContext);
  const isLoggedIn = userContext?.user?.isLoggedIn;

  useEffect(() => {
    baseRequest({
      url: '/api/v1/chat/list',
    })
      .then((resp: ChatEntry[]) => {
        chatContext.initChat(resp);
      });
  }, []);

  return <>
    <Sidebar />
    {!isLoggedIn && <Login />}
    <ChatMain />
  </>;
};
