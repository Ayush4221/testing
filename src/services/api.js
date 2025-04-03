import axios from 'axios';
import NetInfo from '@react-native-community/netinfo';

const API_BASE_URL = 'http://10.138.168.185:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Check network connectivity before making requests
api.interceptors.request.use(
  async config => {
    const networkState = await NetInfo.fetch();

    if (!networkState.isConnected) {
      return Promise.reject(new Error('No internet connection'));
    }

    console.log(`🚀 API Request: ${config.method.toUpperCase()} ${config.url}`);
    return config;
  },
  error => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor to handle errors and log responses
api.interceptors.response.use(
  response => {
    console.log(`✅ API Response: ${response.config.method.toUpperCase()} ${response.config.url}`, {
      status: response.status,
      data: response.data
    });
    return response;
  },
  error => {
    console.error('❌ API Error:', {
      url: error.config?.url,
      method: error.config?.method?.toUpperCase(),
      status: error.response?.status,
      message: error.message,
      data: error.response?.data
    });
    return Promise.reject(error);
  }
);

export default api;