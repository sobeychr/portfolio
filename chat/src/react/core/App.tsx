import { UserContextComponent } from '@context/user';
import { Main } from '@core/Main';

export const App = () => {
  return <UserContextComponent>
    <Main />
  </UserContextComponent>;
};
