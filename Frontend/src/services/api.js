import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:5000/yoga-verse',
  withCredentials: true
});
