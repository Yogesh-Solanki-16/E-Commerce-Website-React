import axios from "axios";

const createAxiosInstance = (baseURL) => {
  const instance = axios.create({
    baseURL,
    timeout: 600000,
    headers: {
      "Content-Type": "application/json",
    },
  });

  instance.interceptors.request.use(
    function (config) {
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      return Promise.reject(error);
    }
  );
  return instance;
};

const PRODUCT_API = import.meta.env.VITE_PRODUCT_API;
const SINGLE_PRODUCT_API = import.meta.env.VITE_SINGLE_PRODUCT_API;
const REGISTER_API = import.meta.env.VITE_REGISTER_API_KEY;
const LOGIN_API = import.meta.env.VITE_LOGIN_API_KEY;
const USER_API = import.meta.env.VITE_USER_API_KEY;

export const productApi = createAxiosInstance(PRODUCT_API);
export const singleProductApi = createAxiosInstance(SINGLE_PRODUCT_API);
export const registerApi = createAxiosInstance(REGISTER_API);
export const loginApi = createAxiosInstance(LOGIN_API);
export const userApi = createAxiosInstance(USER_API);
