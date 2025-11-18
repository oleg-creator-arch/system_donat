import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_URL_BACK,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});
