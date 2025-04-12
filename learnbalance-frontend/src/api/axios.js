import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // your backend base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
