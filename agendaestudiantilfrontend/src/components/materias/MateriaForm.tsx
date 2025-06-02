import React from "react";

function MateriaForm({ form, setForm, onSubmit }) {
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const newMateria = {
      nombre: form.nombre,
      horario: form.horario,
      anioDeCarrera: 1,
      anio: new Date().getFullYear().toString(),
      modalidad: "Presencial",
      correlativas: [],
      notas: {},
      eventos: [
        {
          tipo: "Parcial",
          numero: 1,
          temasAEstudiar: "",
          estado: "Pendiente",
          fechaEntrega: form.examen,
        },
      ],
    };
    onSubmit(newMateria);
  };

  return (
    <div className="formulario">
      <input
        name="nombre"
        placeholder="Materia"
        value={form.nombre}
        onChange={handleChange}
      />
      <input
        name="horario"
        placeholder="Horario (ej: Lunes 08:00 - 12:00)"
        value={form.horario}
        onChange={handleChange}
      />
      <input
        name="examen"
        type="date"
        value={form.examen}
        onChange={handleChange}
      />
      <button onClick={handleSubmit}>Nuevo</button>
    </div>
  );
}

export default MateriaForm;