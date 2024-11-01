import axios from "axios";
import { BASE_URL } from "./constants";
import {
  getRefreshToken,
  getToken,
  removeRefreshToken,
  removeToken,
  setToken,
} from "./tools";

const request = axios.create({
  baseURL: BASE_URL,
});

export const requestWithoutToken = axios.create({
  baseURL: BASE_URL,
});

request.interceptors.request.use(
  function (config) {
    const token = getToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

request.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    if (error.status === 401 && !originalRequest._retry) {
      try {
        originalRequest._retry = true;
        const { data } = await requestWithoutToken.post("/token", {
          refreshToken: getRefreshToken(),
        });
        setToken(data.accessToken);

        return request(originalRequest);
      } catch (error) {
        removeToken();
        removeRefreshToken();
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

export default request;
