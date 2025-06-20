import { createContext, useState } from 'react';

type UserContextType = {
  isLoggedIn: boolean;
  setIsLoggedIn: (param: boolean) => void;
  setUsername: (param: string) => void;
  username: string;
};

export const UserContext = createContext({} as UserContextType);

export const UserContextComponent = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  const value = {
    isLoggedIn,
    setIsLoggedIn,
    setUsername,
    username,
  };

  return (<UserContext value={value}>
    {children}
  </UserContext>);
};
