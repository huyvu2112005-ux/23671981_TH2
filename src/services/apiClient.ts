import axios from 'axios';
import {STUDENT} from '../constants/student';

export const apiClient = axios.create({
  baseURL: 'https://fakestoreapi.com',
  timeout: 10000,
});

apiClient.interceptors.request.use(config => {
  if (config.headers) {
    if (typeof config.headers.set === 'function') {
      config.headers.set('X-Student-Id', STUDENT.mssv);
    } else {
      config.headers['X-Student-Id'] = STUDENT.mssv;
    }
  }
  return config;
});
