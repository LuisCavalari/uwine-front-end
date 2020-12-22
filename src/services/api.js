import axios from 'axios';
import { getToken } from './auth';
import router from '../router';
import store from '../store';

const api = axios.create({
  baseURL: 'https://nameless-escarpment-55393.herokuapp.com/api',
});

api.interceptors.request.use(async (config) => {
  const token = getToken();
  const apiCopy = config;
  if (token) {
    apiCopy.headers.Authorization = `Bearer ${token}`;
  }
  return apiCopy;
});
api.interceptors.response.use(
  response => response,
  (err) => {
    const isTokenExpired = !!err.response.data.expiredToken;
    if (err.response.status === 401 && isTokenExpired) {
      store.dispatch('logout');
      router.push('/');
    }
    return Promise.reject(err);
  },

);

export default api;
