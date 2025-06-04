import api from './api';

export default {
  // Obtener todas las modalidades
  getAll: () => api.get('/modalidades'),
  
  // Obtener una modalidad por ID
  getById: (id) => api.get(`/modalidades/${id}`),
  
  // Crear nueva modalidad
  create: (data) => api.post('/modalidades', data),
  
  // Actualizar modalidad
  update: (id, data) => api.put(`/modalidades/${id}`, data),
  
  // Eliminar modalidad
  delete: (id) => api.delete(`/modalidades/${id}`),
  
  // Obtener materias asociadas a una modalidad (opcional)
  getMateriasByModalidad: (idModalidad) => api.get(`/modalidades/${idModalidad}/materias`)
};