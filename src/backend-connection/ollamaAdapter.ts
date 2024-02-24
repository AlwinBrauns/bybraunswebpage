import axios from "axios";
import { KeycloakInstance } from "../main.ts";

const ollamaAdapter = axios.create({
  baseURL: "https://llm.bybrauns.com",
});

ollamaAdapter.interceptors.request.use(
  (config) => {
    const token = KeycloakInstance.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default ollamaAdapter;
