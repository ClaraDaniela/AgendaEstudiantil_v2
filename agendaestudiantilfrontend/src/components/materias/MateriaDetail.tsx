// src/components/materias/EventoForm.tsx
import React, { useState } from 'react';
import { Evento } from '../../types/materiaTypes';

interface EventoFormProps {
  onSubmit: (eventoData: Omit<Evento, 'id'>) => void;
}

const EventoForm: React.FC<EventoFormProps> = ({ onSubmit }) => {
  const [tipo, setTipo] = useState<Evento['tipo']>('Parcial');
  const [fecha, setFecha] = useState('');
  const [temas, setTemas] = useState('');
  const [estado, setEstado] = useState<Evento['estado']>('pendiente');
  const [nota, setNota] = useState<number | ''>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      tipo,
      fecha,
      temas,
      estado,
      ...(nota !== '' && { nota: Number(nota) })
    });
  };

  return (
    <form onSubmit={handleSubmit} className="evento-form">
      <div className="form-group">
        <label>Tipo de evento:</label>
        <select 
          value={tipo} 
          onChange={(e) => setTipo(e.target.value as Evento['tipo'])}
          required
        >
          <option value="Parcial">Parcial</option>
          <option value="Recuperatorio">Recuperatorio</option>
          <option value="TP">Trabajo Práctico</option>
          <option value="Final">Examen Final</option>
        </select>
      </div>

      <div className="form-group">
        <label>Fecha:</label>
        <input
          type="date"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label>Temas a evaluar:</label>
        <textarea
          value={temas}
          onChange={(e) => setTemas(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label>Estado:</label>
        <select
          value={estado}
          onChange={(e) => setEstado(e.target.value as Evento['estado'])}
          required
        >
          <option value="pendiente">Pendiente</option>
          <option value="aprobado">Aprobado</option>
          <option value="desaprobado">Desaprobado</option>
        </select>
      </div>

      <div className="form-group">
        <label>Nota (opcional):</label>
        <input
          type="number"
          min="0"
          max="10"
          step="0.5"
          value={nota}
          onChange={(e) => setNota(e.target.value === '' ? '' : Number(e.target.value))}
        />
      </div>

      <button type="submit">Agregar Evento</button>
    </form>
  );
};

export default EventoForm;