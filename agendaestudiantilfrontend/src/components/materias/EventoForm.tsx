// src/components/materias/EventoForm.tsx
import React from 'react';
import { Evento } from '../../types/materiaTypes';

interface EventoFormProps {
  materiaId: string;
  onSubmit: (evento: Omit<Evento, 'id'>) => void;
}

const EventoForm: React.FC<EventoFormProps> = ({ materiaId, onSubmit }) => {
  const [evento, setEvento] = React.useState<Omit<Evento, 'id'>>({
    tipo: 'Parcial',
    fecha: '',
    temas: '',
    estado: 'pendiente'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(evento);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Agregar Nuevo Evento</h3>
      <div>
        <label>Tipo:</label>
        <select
          value={evento.tipo}
          onChange={(e) => setEvento({...evento, tipo: e.target.value as any})}
        >
          <option value="Parcial">Parcial</option>
          <option value="Recuperatorio">Recuperatorio</option>
          <option value="TP">Trabajo Práctico</option>
          <option value="Final">Examen Final</option>
        </select>
      </div>
      {/* Agrega más campos según necesites */}
      <button type="submit">Guardar Evento</button>
    </form>
  );
};

export default EventoForm;