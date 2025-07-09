import { createContext, useState } from 'react';
import { CUser } from '@classes/CUser';
import { AUTH_REFRESH, AUTH_TOKEN } from '@utils/configs';
import { setDocumentCookie } from '@utils/cookie';

export type LoginUserParam = {
  loggedIn: boolean;
  refresh_expire: number;
  refresh: string;
  token_expire: number;
  token: string;
  username: string;
};

type UserContextType = {
  user: CUser;
  loginUser: (username: string) => void;
};

export const UserContext = createContext({} as UserContextType);

export const UserContextComponent = ({ children }) => {
  const [user, setUser] = useState(new CUser);

  const loginUser = (response: LoginUserParam) => {
    const { refresh, refresh_expire, token, token_expire, username } = response;

    setDocumentCookie(AUTH_REFRESH, refresh, {
      timestamp: (refresh_expire * 1000),
    });
    setDocumentCookie(AUTH_TOKEN, token, {
      timestamp: (token_expire * 1000),
    });

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
