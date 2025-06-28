import { ChatContextComponent } from '@s-context/chat';
import { MessageContextComponent } from '@s-context/message';
import { UserContextComponent } from '@s-context/user';
import { Main } from '@s-core/Main';

export const App = () => {
  return <UserContextComponent>
    <ChatContextComponent>
      <MessageContextComponent>
        <Main />
      </MessageContextComponent>
    </ChatContextComponent>
  </UserContextComponent>;
};
