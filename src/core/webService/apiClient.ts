import axios from 'axios';
import {useAuthStore} from '../hooks/store/useAuthStore';

// Keeping the local copy to avoid accessing the local storage for each API call
let accessToken: string | null = null;

const BASE_URL = 'http://192.168.93.69:1337/api'; // Change this to your Strapi base URL

const ApiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS, PATCH',
  },
});

ApiClient.interceptors.request.use(
  reqConfig => {
    if (accessToken == null) {
      accessToken = useAuthStore.getState().user.token;
    }
    reqConfig.headers.Authorization = `Bearer ${accessToken}`;
    return reqConfig;
  },
  error => Promise.reject(error),
);

ApiClient.interceptors.response.use(
  response => response,
  error => {
    if (!error || !error.response) {
      const serverError = {
        data: {
          message: 'Server error. Please try again later.',
        },
      };
      return Promise.reject(serverError);
    }
    return Promise.reject(error);
  },
);

const ApiGuestClient = axios.create({
  baseURL: BASE_URL,
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS, PATCH',
  },
});

ApiGuestClient.interceptors.response.use(
  response => response,
  error => {
    if (!error || !error.response) {
      const serverError = {
        data: {
          message: 'Server error. Please try again later.',
        },
      };
      return Promise.reject(serverError);
    }
    return Promise.reject(error);
  },
);

export {ApiClient, ApiGuestClient};
