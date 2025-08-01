import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL = 'C:\Users\abinaya.g\Documents\Projects\Ecom\backend'; 
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});


axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('jwtToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const storedToken = await AsyncStorage.getItem('jwtToken');
      if (storedToken) {
        console.warn('JWT token expired or invalid. Logging out...');
        await AsyncStorage.removeItem('jwtToken');
      }
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;