import api from './axiosConfig';

export const login = async ({ username, password }: { username: string; password: string }) => {
  try {
    const res = await api.post('/auth/login', { username, password });

    return res.data;
  } catch (err) {
    console.log('login err', err);
  }
};
export const refreshToken = async (refreshToken: string) => {
  try {
    const res = await api.post('/auth/refresh', { refreshToken });

    return res.data;
  } catch (err) {
    console.log('refresh token err', err);
  }
};
