import axios from 'axios';
import { localStore } from 'utils';
import { useNavigate } from 'react-router-dom';

// Create a function to configure the Axios instance with interceptors
const configureAxios = () => {
  const instance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_REACT_APP_URL,
  });

  // Add a request interceptor to include the Authorization header
  instance.interceptors.request.use((config) => {
    const token = localStore.get('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  });

  // Add a response interceptor to handle 403 errors
  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 403) {
        // Redirect to the 403 error page
        window.location.href = '/403';
      }
      
      return Promise.reject(error);
    }
  );

  return instance;
};

const axiosInstance = configureAxios();

export const getAxiosInstance = () => axiosInstance;

export default axiosInstance;
