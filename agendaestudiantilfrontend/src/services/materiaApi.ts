import axios from 'axios';
import { Materia, Evento } from '../types/Materia';

// URL base debe coincidir con el backend
const API_URL = 'http://localhost:3000';

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getMaterias = async (): Promise<Materia[]> => {
  try {
    const response = await axiosInstance.get('/materias');
    return response.data;
  } catch (error) {
    console.error('Error al obtener las materias', error);
    throw error;
  }
};

export const getMateriaById = async (id: number): Promise<Materia> => {
  try {
    const response = await axiosInstance.get(`/materias/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener la materia', error);
    throw error;
  }
};

export const createMateria = async (materiaData: Omit<Materia, 'id'>): Promise<Materia> => {
  try {
    const response = await axiosInstance.post('/materias', materiaData);
    return response.data;
  } catch (error) {
    console.error('Error al crear la materia', error);
    throw error;
  }
};

export const updateMateria = async (id: number, materiaData: Partial<Materia>): Promise<Materia> => {
  try {
    const response = await axiosInstance.put(`/materias/${id}`, materiaData);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar la materia', error);
    throw error;
  }
};

export const deleteMateria = async (id: number): Promise<void> => {
  try {
    await axiosInstance.delete(`/materias/${id}`);
  } catch (error) {
    console.error('Error al eliminar la materia', error);
    throw error;
  }
};

// Servicios específicos para eventos
export const getEventosByMateria = async (materiaId: number): Promise<Evento[]> => {
  try {
    const response = await axiosInstance.get(`/materias/${materiaId}/eventos`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener los eventos de la materia', error);
    throw error;
  }
};

export const addEventoToMateria = async (materiaId: number, eventoData: Omit<Evento, 'id'>): Promise<Evento> => {
  try {
    const response = await axiosInstance.post(`/materias/${materiaId}/eventos`, eventoData);
    return response.data;
  } catch (error) {
    console.error('Error al agregar evento a la materia', error);
    throw error;
  }
};