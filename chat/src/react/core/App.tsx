import { ChatContextComponent } from '@r-context/chat';
import { MessageContextComponent } from '@r-context/message';
import { UserContextComponent } from '@r-context/user';
import { Main } from '@r-core/Main';

export const App = () => {
  return <UserContextComponent>
    <ChatContextComponent>
      <MessageContextComponent>
        <Main />
      </MessageContextComponent>
    </ChatContextComponent>
  </UserContextComponent>;
};
