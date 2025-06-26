import { ChatContextComponent } from '@context/chat';
import { MessageContextComponent } from '@context/message';
import { UserContextComponent } from '@context/user';
import { Main } from '@core/Main';

export const App = () => {
  return <UserContextComponent>
    <ChatContextComponent>
      <MessageContextComponent>
        <Main />
      </MessageContextComponent>
    </ChatContextComponent>
  </UserContextComponent>;
};
