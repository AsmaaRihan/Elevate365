import { useRouter } from 'expo-router';
import React, { createContext, PropsWithChildren, useState } from 'react';

type AuthState = {
  isLoggedIn: boolean;
  logIn: () => void;
  logOut: () => void;
};

export const AuthContext = createContext<AuthState>({
  isLoggedIn: false,
  logIn: () => {},
  logOut: () => {},
});

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  const logIn = () => {
    console.log('Logging in...');
    setIsLoggedIn(true);

    router.replace('/');
  };
  const logOut = () => {
    setIsLoggedIn(false);

    router.replace('/login');
  };

  return <AuthContext.Provider value={{ isLoggedIn, logIn, logOut }}>{children}</AuthContext.Provider>;
};
