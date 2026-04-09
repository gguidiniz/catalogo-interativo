import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://dummyjson.com/products',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});
