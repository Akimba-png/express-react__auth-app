import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import { User } from '../models/user';
import { tokenService } from '../services/token-service';
import { ApiRoute, BASE_URL } from '../const';

export const createApi = (onUnAuth: () => void) => {
  const api = axios.create({
    baseURL: BASE_URL,
    timeout: 5000,
    withCredentials: true,
  });

  const onSend = (request: InternalAxiosRequestConfig) => {
    const accessToken = tokenService.getToken() ?? '';
    request.headers.Authorization = `Bearer ${accessToken}`;
    return request;
  };

  const onSuccess = (response: AxiosResponse) => {
    return response;
  };

  const onFail = async (error: AxiosError) => {
    const initialRequest = error.config;
    if (
      initialRequest &&
      error.response &&
      error.response.status === 401
    ) {
      try {
        const response = await axios.get<User>(
          `${BASE_URL}${ApiRoute.Refresh}`,
          { withCredentials: true }
        );
        tokenService.setToken(response.data.accessToken);
        return api.request(initialRequest);
      } catch (error) {
        onUnAuth();
        return;
      }
    }
    if (error.response) {
      throw error;
    }
    throw error;
  };

  api.interceptors.request.use(onSend);
  api.interceptors.response.use(onSuccess, onFail);

  return api;
};
