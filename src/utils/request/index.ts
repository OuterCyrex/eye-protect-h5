import axios from 'axios';
import type { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { showToast } from 'vant';
import store from '@/store';
import { useUserStore } from '@/store/modules/user';

const baseURL = import.meta.env.VITE_APP_BASE_URL;

const service: AxiosInstance = axios.create({
  withCredentials: false,
  timeout: 10000,
  baseURL: baseURL,
});
let loginRedirecting = false;

const redirectToLogin = () => {
  if (typeof window === 'undefined') return;
  if (loginRedirecting) return;
  if (window.location.pathname === '/login') return;

  loginRedirecting = true;
  const redirect = `${window.location.pathname}${window.location.search}${window.location.hash}`;
  window.location.replace(`/login?redirect=${encodeURIComponent(redirect)}`);
};

service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

service.interceptors.response.use(
  (response: AxiosResponse) => {
    const res = response.data;
    if (res.code === 4005) {
      const userStore = useUserStore(store);
      userStore.logout();
      showToast(res.message || '登录已过期，请重新登录');
      redirectToLogin();
      return Promise.reject(res.message || 'Token expired');
    }

    if (res.code !== 200) {
      showToast(res.message);
      return Promise.reject(res.message || 'Error');
    } else {
      return res.data;
    }
  },
  (error: AxiosError) => {
    console.log('err' + error);
    showToast(error.message);
    return Promise.reject(error.message);
  },
);

export const http = {
  get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return service.get(url, config);
  },

  post<T = any>(url: string, data?: object, config?: AxiosRequestConfig): Promise<T> {
    return service.post(url, data, config);
  },

  put<T = any>(url: string, data?: object, config?: AxiosRequestConfig): Promise<T> {
    return service.put(url, data, config);
  },

  delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return service.delete(url, config);
  },
};

const getAuthHeaders = (config?: AxiosRequestConfig) => {
  const userStore = useUserStore(store);
  return {
    ...config?.headers,
    Authorization: userStore.getToken,
  };
};

export const httpAuth = {
  get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return service.get(url, {
      ...config,
      headers: getAuthHeaders(config),
    });
  },

  post<T = any>(url: string, data?: object, config?: AxiosRequestConfig): Promise<T> {
    return service.post(url, data, {
      ...config,
      headers: getAuthHeaders(config),
    });
  },

  put<T = any>(url: string, data?: object, config?: AxiosRequestConfig): Promise<T> {
    return service.put(url, data, {
      ...config,
      headers: getAuthHeaders(config),
    });
  },

  delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return service.delete(url, {
      ...config,
      headers: getAuthHeaders(config),
    });
  },
};

export default service;
