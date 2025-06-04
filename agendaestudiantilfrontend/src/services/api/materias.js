import api from './api';

export default {
  getMaterias: () => api.get('/materias'),
  getMateriaById: (id) => api.get(`/materias/${id}`),
  createMateria: (data) => api.post('/materias', data),
  updateMateria: (id, data) => api.put(`/materias/${id}`, data),
  deleteMateria: (id) => api.delete(`/materias/${id}`),
  getCorrelativas: (id) => api.get(`/correlativas/${id}`)
};