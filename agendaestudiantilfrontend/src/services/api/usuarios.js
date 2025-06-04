import api from './api';

export default {
  // Obtener todos los usuarios (solo admin)
  getAll: () => api.get('/usuarios'),
  
  // Obtener un usuario por ID
  getById: (id) => api.get(`/usuarios/${id}`),
  
  // Registrar nuevo usuario
  register: (userData) => api.post('/usuarios/registro', userData),
  
  // Actualizar usuario
  update: (id, userData) => api.put(`/usuarios/${id}`, userData),
  
  // Eliminar usuario (solo admin)
  delete: (id) => api.delete(`/usuarios/${id}`),
  
  // Login de usuario
  login: (credentials) => api.post('/usuarios/login', credentials),
  
  // Obtener perfil del usuario logueado
  getProfile: () => api.get('/usuarios/perfil'),
  
  // Obtener materias del usuario (opcional)
  getMateriasByUsuario: (idUsuario) => api.get(`/usuarios/${idUsuario}/materias`)
};