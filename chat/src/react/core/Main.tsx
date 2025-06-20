import { useContext } from 'react';
import { Chat } from '@components/chat';
import { Login } from '@components/login';
import { Sidebar } from '@components/sidebar';
import { UserContext } from '@context/user';

export const Main = () => {
  const user = useContext(UserContext);

  return <>
    <Sidebar />
    <main>
      {!user.isLoggedIn ? <Login /> : <Chat />}
    </main>
  </>;
};
