import { Sidebar } from '@s-components/sidebar';
import { Login } from '@s-components/login';
import { ChatMain } from '@s-components/chat/main';
import { useUserContext } from '@s-context/user';
import { Show } from 'solid-js';

export const Main = () => {
  const { user } = useUserContext();

  return <>
    <Sidebar />
    <Show when={!user()?.isLoggedIn}>
      <Login />
    </Show>
    <ChatMain />
  </>;
};
