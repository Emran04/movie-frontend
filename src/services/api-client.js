import axios from 'axios';
import { CUSTOMER_TOKEN } from "../configs/consts";

const token = localStorage.getItem(CUSTOMER_TOKEN);
if (token) {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
}

const instance = axios.create({
  baseURL: `${process.env.REACT_APP_API_ENDPOINT}`,
  headers: { 'Access-Control-Allow-Origin': '*' },
});

// Add a response interceptor
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      window.localStorage.removeItem(CUSTOMER_TOKEN);
      window.location.href = '/customer-login';
    }
    return Promise.reject(error);
  },
);

export default instance;
