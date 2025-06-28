import { ChatContextComponent } from '@s-context/chat';
import { MessageContextComponent } from '@s-context/message';
import { Main } from '@s-core/Main';

export const App = () => {
  return <ChatContextComponent>
    <MessageContextComponent>
      <Main />
    </MessageContextComponent>
  </ChatContextComponent>;
};
