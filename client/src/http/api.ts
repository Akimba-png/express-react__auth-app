import axios from 'axios';
import { BASE_URL } from '../const';

export const createApi = () => {
  const api = axios.create({
    baseURL: BASE_URL,
    timeout: 5000,
    withCredentials: true,
  });

  return api;
};
