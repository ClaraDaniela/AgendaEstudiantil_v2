import api from './api';

export default {
  login: async (credentials) => {
    return api.post('/auth/login', credentials);
  },
  logout: () => {
    localStorage.removeItem('token');
  },
  getProfile: async () => {
    return api.get('/auth/profile');
  },
  register: async (userData) => {
    return api.post('/auth/register', userData);
  }
};