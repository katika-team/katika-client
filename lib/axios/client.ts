import axios from 'axios';

const BASE_URL = __DEV__ 
  ? 'http://10.167.23.33:5000/api'
  : 'http://10.167.23.33:5000/api';

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Log all outgoing requests
apiClient.interceptors.request.use(
  (config) => {
    console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
    console.log('Request Data:', config.data);
    console.log('Auth Header:', config.headers.Authorization || 'None');
    return config;
  },
  (error) => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

// Log all incoming responses
apiClient.interceptors.response.use(
  (response) => {
    console.log(`API Response: ${response.status} ${response.config.url}`);
    console.log('Response Data:', response.data);
    return response;
  },
  (error) => {
    console.error(`API Error: ${error.response?.status} ${error.config?.url}`);
    console.error('Error Response:', error.response?.data);
    console.error('Error Message:', error.message);
    return Promise.reject(error);
  }
);

export const setAuthToken = (token: string | null) => {
  if (token) {
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    console.log('Auth token set successfully');
  } else {
    delete apiClient.defaults.headers.common['Authorization'];
    console.log('Auth token cleared');
  }
};

export default apiClient;