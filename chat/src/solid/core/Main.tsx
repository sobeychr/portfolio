import { Show } from 'solid-js';
import { ChatMain } from '@s-components/chat/main';
import { Login } from '@s-components/login';
import { Sidebar } from '@s-components/sidebar';
import { useUserContext } from '@s-context/user';

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
