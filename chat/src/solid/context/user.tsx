import { createContext, createSignal, useContext } from 'solid-js';
import { CUser } from '@classes/CUser';

type UserContextType = {
  user: () => CUser;
  loginUser: (username: string) => void;
};

const UserContext = createContext({} as UserContextType);

export const UserContextComponent = (props) => {
  const [user, setUser] = createSignal(new CUser);

  const loginUser = (username: string) => {
    setUser(new CUser({
      isLoggedIn: true,
      username,
    }));
  };

  const value = {
    loginUser,
    user,
  };

  return <UserContext.Provider value={value}>
    {props.children}
  </UserContext.Provider>;
};

export const useUserContext = (): UserContextType => useContext(UserContext);
