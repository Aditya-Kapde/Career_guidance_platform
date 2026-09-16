import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '',
  withCredentials: false,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
});

api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const customMessage = 
      error.response?.data?.error || 
      error.response?.data?.message || 
      error.message || 
      'An unexpected network error occurred.';
    
    console.error('[API Error]:', customMessage, error);
    
    // Attach clean formatted message
    error.userMessage = customMessage;
    return Promise.reject(error);
  }
);

export default api;