// src/services/eventoService.ts
import { axiosInstance } from './api/axiosConfig';
import { Evento } from '../types/materiaTypes';

export const EventoService = {
  async create(eventoData: Omit<Evento, 'id'> & { materiaId: string }): Promise<Evento> {
    const { data } = await axiosInstance.post('/eventos', eventoData);
    return data;
  },

  async getByMateria(materiaId: string): Promise<Evento[]> {
    const { data } = await axiosInstance.get(`/materias/${materiaId}/eventos`);
    return data;
  }
};