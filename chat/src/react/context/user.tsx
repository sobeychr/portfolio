import { createContext, useState } from 'react';
import { CUser } from '@classes/CUser';

type UserContextType = {
  user: CUser;
  loginUser: (username: string) => void;
};

export const UserContext = createContext({} as UserContextType);

export const UserContextComponent = ({ children }) => {
  const [user, setUser] = useState(new CUser as CUser);

  const loginUser = (username) => {
    setUser(new CUser({
      isLoggedIn: true,
      username,
    }));
  };

  const value = {
    loginUser,
    user,
  };

  return (<UserContext value={value}>
    {children}
  </UserContext>);
};
