import { ChatContextComponent } from '@s-context/chat';
import { Main } from '@s-core/Main';

export const App = () => {
  return <ChatContextComponent>
    <Main />
  </ChatContextComponent>;
};
