import axios from 'axios';

import AsyncStorage from '@react-native-async-storage/async-storage';
import ENV from '../config/env';
import { refreshToken } from './authAPI';

const instance = axios.create({
  baseURL: ENV.URL,
  timeout: ENV.TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

const authStorageItem = 'auth-key';

instance.interceptors.request.use(
  async (config) => {
    const value = await AsyncStorage.getItem(authStorageItem);

    const auth = JSON.parse(value || 'null');
    if (auth !== null) {
      config.headers.Authorization = `Bearer ${auth.token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(undefined, async (error) => {
  if (error.response?.status === 401) {
    const value = await AsyncStorage.getItem(authStorageItem);

    const auth = JSON.parse(value || 'null');

    await refreshToken(auth.refreshToken);
    return instance(error.config);
  }
  if (error.response?.status === 500) {
    console.log('Server Error');
  }

  throw error;
});
export default instance;
