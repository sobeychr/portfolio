import { ChatContextComponent } from '@context/chat';
import { UserContextComponent } from '@context/user';
import { Main } from '@core/Main';

export const App = () => {
  return <UserContextComponent>
    <ChatContextComponent>
      <Main />
    </ChatContextComponent>
  </UserContextComponent>;
};
