// materiaTypes.ts
// src/types/materiaTypes.ts
export interface Evento {
  id: string;
  tipo: 'Parcial' | 'Recuperatorio' | 'TP' | 'Final';
  fecha: string;
  temas: string;
  estado: 'pendiente' | 'aprobado' | 'desaprobado';
  nota?: number;
}

export interface Materia {
  id: string;
  nombre: string;
  horario: string;
  profesor?: string;
  eventos?: Evento[];
}
// userTypes.ts
export type Rol = 'admin' | 'estudiante' | 'profesor';

export type Usuario = {
  id: string;
  nombre: string;
  email: string;
  rol: Rol;
  materiasInscriptas?: string[]; // IDs de materias
};