import axios from "axios";
import { config } from "config";

export const apiClient = axios.create({
  baseURL: config.apiBaseUrl,
  timeout: 65000,
});

export const setTokenLoyalty = (token) => {
  if (token) {
    apiClient.defaults.headers.common.Authorization = `Bearer ${token}`;
  }
};

export const getAccessToken = () => {
  return apiClient.defaults.headers.common.Authorization?.split(" ")?.[1];
};
