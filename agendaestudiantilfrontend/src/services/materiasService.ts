import { axiosInstance } from './api/axiosConfig';
import { Materia, Evento } from '../types/materiaTypes';

export const MateriaService = {
  async getAll(): Promise<Materia[]> {
    const { data } = await axiosInstance.get('/materias');
    return data;
  },

  async getById(id: string): Promise<Materia> {
    const { data } = await axiosInstance.get(`/materias/${id}`);
    return data;
  },

  async create(materia: Omit<Materia, 'id'>): Promise<Materia> {
    const { data } = await axiosInstance.post('/materias', materia);
    return data;
  },

  async update(id: string, materia: Partial<Materia>): Promise<Materia> {
    const { data } = await axiosInstance.put(`/materias/${id}`, materia);
    return data;
  },

  async delete(id: string): Promise<void> {
    await axiosInstance.delete(`/materias/${id}`);
  },

  // Eventos específicos
  async addEvento(materiaId: string, evento: Omit<Evento, 'id'>): Promise<Evento> {
    const { data } = await axiosInstance.post(`/materias/${materiaId}/eventos`, evento);
    return data;
  },
};