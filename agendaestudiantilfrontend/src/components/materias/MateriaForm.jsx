import { useState, useEffect } from 'react';
import materiasService from '../../services/api/materias';
import modalidadesService from '../../services/api/modalidades';

const MateriaForm = ({ onClose, onRefresh, materiaData }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    anioDeCarrera: 1,
    idModalidad: '',
    horario: '',
    anioAcademico: new Date().getFullYear()
  });

  const [modalidades, setModalidades] = useState([]);
  const [correlativas, setCorrelativas] = useState([]);

  useEffect(() => {
    const loadModalidades = async () => {
      const { data } = await modalidadesService.getAll();
      setModalidades(data);
    };
    loadModalidades();

    if (materiaData) {
      setFormData(materiaData);
      loadCorrelativas(materiaData.idMateria);
    }
  }, []);

  const loadCorrelativas = async (idMateria) => {
    const { data } = await materiasService.getCorrelativas(idMateria);
    setCorrelativas(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.idMateria) {
        await materiasService.update(formData.idMateria, formData);
      } else {
        await materiasService.create(formData);
      }
      onRefresh();
      onClose();
    } catch (error) {
      console.error('Error guardando materia:', error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="materia-form">
        <h2>{formData.idMateria ? 'Editar' : 'Nueva'} Materia</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nombre:</label>
            <input
              type="text"
              value={formData.nombre}
              onChange={(e) => setFormData({...formData, nombre: e.target.value})}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Año de Carrera:</label>
              <select
                value={formData.anioDeCarrera}
                onChange={(e) => setFormData({...formData, anioDeCarrera: e.target.value})}
              >
                {[1, 2, 3, 4, 5].map(anio => (
                  <option key={anio} value={anio}>{anio}° Año</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Modalidad:</label>
              <select
                value={formData.idModalidad}
                onChange={(e) => setFormData({...formData, idModalidad: e.target.value})}
                required
              >
                <option value="">Seleccione...</option>
                {modalidades.map(mod => (
                  <option key={mod.idModalidad} value={mod.idModalidad}>
                    {mod.nombre}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Horario:</label>
            <input
              type="text"
              value={formData.horario}
              onChange={(e) => setFormData({...formData, horario: e.target.value})}
              placeholder="Ej: Lunes 18:00-22:00"
              required
            />
          </div>

          {correlativas.length > 0 && (
            <div className="correlativas-list">
              <h4>Correlativas:</h4>
              <ul>
                {correlativas.map(corr => (
                  <li key={corr.idMateria}>{corr.nombre}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="form-actions">
            <button type="button" onClick={onClose} className="btn-cancel">
              Cancelar
            </button>
            <button type="submit" className="btn-save">
              {formData.idMateria ? 'Actualizar' : 'Guardar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MateriaForm;