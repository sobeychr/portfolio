import { useContext, useEffect } from 'react';
import { ChatMain } from '@r-components/chat/main';
import { Login } from '@r-components/login';
import { Sidebar } from '@r-components/sidebar';
import type { ChatEntry } from '@r-context/chat';
import { ChatContext } from '@r-context/chat';
import { UserContext } from '@r-context/user';
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
