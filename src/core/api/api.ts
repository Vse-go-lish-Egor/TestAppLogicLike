import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://logiclike.com',
  timeout: 20000,
  headers: {
    'Content-Type': 'application/json',
  },
});
