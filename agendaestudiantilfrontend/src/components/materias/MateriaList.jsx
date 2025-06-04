import { useEffect, useState } from 'react';
import materiasService from '../../services/api/materias';
import MateriaForm from './MateriaForm';

const MateriaList = () => {
  const [materias, setMaterias] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const loadMaterias = async () => {
      try {
        const { data } = await materiasService.getMaterias();
        setMaterias(data);
      } catch (error) {
        console.error('Error cargando materias:', error);
      }
    };
    loadMaterias();
  }, []);

  return (
    <div className="container">
      <h1>Mis Materias</h1>
      <button className="btn-add" onClick={() => setShowForm(true)}>
        <i className="bi bi-plus-circle"></i> Nueva Materia
      </button>

      {showForm && (
        <MateriaForm 
          onClose={() => setShowForm(false)}
          onRefresh={() => loadMaterias()}
        />
      )}

      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Año</th>
            <th>Modalidad</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {materias.map(materia => (
            <tr key={materia.idMateria}>
              <td>{materia.nombre}</td>
              <td>{materia.anioDeCarrera}</td>
              <td>{materia.modalidad?.nombre || 'N/A'}</td>
              <td>
                <button className="btn-edit">
                  <i className="bi bi-pencil"></i>
                </button>
                <button 
                  className="btn-delete"
                  onClick={() => materiasService.deleteMateria(materia.idMateria)}
                >
                  <i className="bi bi-trash"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MateriaList;