import axios from "axios";

import ENV from "../config/env";

const instance = axios.create({
  baseURL: ENV.URL,
  timeout: ENV.TIMEOUT,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  async (config) => {
    // const token = await AsyncStorage.get('token')

    // if(token){
    //   if (!config.headers){
    //     config.headers = {}
    //   } config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(undefined, async (error) => {
  if (error.response?.status === 401) {
    // await refreshToken();
    return instance(error.config); // Retry original request
  }
  if (error.response?.status === 500) {
    console.log("Server Error");
  }

  throw error;
});
export default instance;
