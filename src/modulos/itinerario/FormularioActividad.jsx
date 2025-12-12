import { useState } from "react";

export default function FormularioActividad({ agregarActividad }) {
  const [nombre, setNombre] = useState("");
  const [hora, setHora] = useState("");

  function enviarFormulario(e) {
    e.preventDefault();
    if (!nombre || !hora) {
      alert("Por favor completa todos los campos");
      return;
    }
    agregarActividad({ nombre, hora });
    setNombre("");
    setHora("");
  }

  return (
    <form onSubmit={enviarFormulario} className="mb-4 flex gap-2 items-end">
      <div className="flex flex-col">
        <label className="mb-1">Nombre actividad</label>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="border rounded p-1"
        />
      </div>

      <div className="flex flex-col">
        <label className="mb-1">Hora</label>
        <input
          type="time"
          value={hora}
          onChange={(e) => setHora(e.target.value)}
          className="border rounded p-1"
        />
      </div>

      <button
        type="submit"
        className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600"
      >
        Agregar
      </button>
    </form>
  );
}