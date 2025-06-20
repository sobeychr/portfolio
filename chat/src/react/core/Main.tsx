import { useContext, useEffect } from 'react';
import { Chat } from '@components/chat';
import { Login } from '@components/login';
import { Sidebar } from '@components/sidebar';
import type { ChatEntry } from '@context/chat';
import { ChatContext } from '@context/chat';
import { UserContext } from '@context/user';
import { baseRequest } from '@utils/request';

export const Main = () => {
  const chatContext = useContext(ChatContext);
  const userContext = useContext(UserContext);

  useEffect(() => {
    baseRequest({
      url: '/api/v1/chat/list',
    })
      .then((resp: ChatEntry[]) => {
        chatContext.setChatList(resp);
      });
  }, []);

  return <>
    <Sidebar />
    <main>
      {!userContext.isLoggedIn ? <Login /> : <Chat />}
    </main>
  </>;
};
