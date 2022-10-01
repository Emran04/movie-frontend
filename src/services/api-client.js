import axios from 'axios';
// import { LOCAL_STORAGE_KEY } from 'configs/storage';

// const token = localStorage.getItem(LOCAL_STORAGE_KEY);
// if (token) {
//   axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem(LOCAL_STORAGE_KEY)}`;
// }

const instance = axios.create({
  baseURL: `${process.env.REACT_APP_API_ENDPOINT}`,
  headers: { 'Access-Control-Allow-Origin': '*' },
});

// Add a response interceptor
// instance.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     if (error.response && error.response.status === 401) {
//       window.localStorage.removeItem(LOCAL_STORAGE_KEY);
//       window.location.reload();
//     }
//     return Promise.reject(error);
//   },
// );

export default instance;
