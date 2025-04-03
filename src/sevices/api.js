import axios from 'axios';

// Use your machine's IP address where the backend is running
const API_BASE_URL = 'http://192.168.6.180:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;