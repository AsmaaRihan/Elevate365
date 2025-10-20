import { login } from '@/src/api/authAPI';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SplashScreen, useRouter } from 'expo-router';
import React, { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';

SplashScreen.preventAutoHideAsync();

type AuthProps = {
  isLoggedIn: boolean;
  isReady: boolean;
  logIn: ({ username, password }: { username: string; password: string }) => void;
  logOut: () => void;
};

const AuthContext = createContext<AuthProps>({
  isLoggedIn: false,
  isReady: false,
  logIn: () => {},
  logOut: () => {},
});

export const useAuth = () => {
  return useContext(AuthContext);
};
const authStorageItem = 'auth-key';

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const router = useRouter();

  const storeAuthState = async (newState: { isLoggedIn: boolean; token?: string; refreshToken?: string }) => {
    try {
      const authState = JSON.stringify(newState);

      await AsyncStorage.setItem(authStorageItem, authState);
    } catch (e) {
      console.log(`logging error is ${e}`);
    }
  };

  const logIn = async ({ username, password }: { username: string; password: string }) => {
    setIsLoggedIn(true);

    try {
      const data = await login({ username, password });

      console.log('Login successful:', data);

      storeAuthState({ isLoggedIn: true, token: data.accessToken, refreshToken: data.refreshToken });
      router.replace('/');
    } catch (error) {
      console.log('Login error:', error);
    }
  };

  const getAuthStateFromStorage = async () => {
    try {
      const value = await AsyncStorage.getItem(authStorageItem);

      if (value !== null) {
        const auth = JSON.parse(value);

        setIsLoggedIn(auth.isLoggedIn);
      }
    } catch (e) {
      console.log(`logging error is ${e}`);
    }

    setIsReady(true);
  };

  const logOut = async () => {
    setIsLoggedIn(false);
    storeAuthState({ isLoggedIn: false });

    await AsyncStorage.removeItem(authStorageItem);

    router.replace('/login');
  };

  useEffect(() => {
    getAuthStateFromStorage();
  }, []);

  useEffect(() => {
    if (isReady) {
      SplashScreen.hideAsync();
    }
  }, [isReady]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, isReady, logIn, logOut }}>{children}</AuthContext.Provider>
  );
};
