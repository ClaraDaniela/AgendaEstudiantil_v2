import React from 'react';
import styles from './MateriaList.module.css'; 

interface Materia {
  id: string;
  nombre: string;
  horario: string;
  eventos?: Array<{
    tipo: string;
    fechaEntrega: string;
  }>;
}

interface MateriaListProps {
  materias: Materia[];
  onDelete: (id: string) => void;
}

const MateriaList: React.FC<MateriaListProps> = ({ materias, onDelete }) => {
  const extractDia = (horario: string) => horario.split(' ')[0];
  const extractHora = (horario: string) => horario.substring(horario.indexOf(' ') + 1);
  const getExamenDate = (eventos?: Materia['eventos']) =>
    eventos?.find((e) => e.tipo === 'Parcial')?.fechaEntrega || 'N/A';

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th className={styles.headerCell}>Materia</th>
          <th className={styles.headerCell}>Día</th>
          <th className={styles.headerCell}>Hora</th>
          <th className={styles.headerCell}>Examen</th>
          <th className={styles.headerCell}>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {materias.map((materia) => (
          <tr key={materia.id}>
            <td className={styles.dataCell}>{materia.nombre}</td>
            <td className={styles.dataCell}>{extractDia(materia.horario)}</td>
            <td className={styles.dataCell}>{extractHora(materia.horario)}</td>
            <td className={styles.dataCell}>{getExamenDate(materia.eventos)}</td>
            <td className={styles.dataCell}>
              <button 
                onClick={() => onDelete(materia.id)}
                className={styles.deleteButton}
              >
                Eliminar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MateriaList;