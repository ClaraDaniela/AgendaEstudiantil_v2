export type Notas = {
  parcial1?: number;
  parcial2?: number;
  final?: number;
};

export type Modalidad = {
  id: number;
  nombre: string;
};

export type Evento = {
  id?: number;
  tipo: 'Parcial' | 'Recuperatorio' | 'Trabajo Practico' | 'Examen Final';
  numero?: number;
  temasAEstudiar?: string;
  estado: 'Pendiente' | 'En curso' | 'Finalizado';
  fechaEntrega?: string;
  dia?: 'Lunes' | 'Martes' | 'Miércoles' | 'Jueves' | 'Viernes' | 'Sábado' | 'Domingo';
  horaInicio?: string;
  horaFin?: string;
  notaParcial1?: number;
  notaParcial2?: number;
  notaFinal?: number;
};

export type Materia = {
  id?: number;
  nombre: string;
  horario: string;
  anioDeCarrera: number;
  anio: string;
  modalidad: Modalidad | string;
  correlativas: string[];
  notas: Notas;
  eventos: Evento[];
};

export type User = {
  id: number;
  nombre: string;
  rol: 'admin' | 'estudiante' | 'profesor';
};