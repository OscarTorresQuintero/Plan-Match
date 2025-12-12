import { useState } from "react";

export default function FormularioActividad({ agregar }) {
  const [nombre, setNombre] = useState("");
  const [hora, setHora] = useState("");

  function enviar(e) {
    e.preventDefault();
    if (!nombre || !hora) return;
    agregar(nombre, hora);
    setNombre("");
    setHora("");
  }

  return (
    <form onSubmit={enviar} className="flex gap-2 mb-3">
      <input
        className="border p-2 flex-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Actividad"
        value={nombre}
        onChange={e => setNombre(e.target.value)}
      />
      <input
        className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        type="time"
        value={hora}
        onChange={e => setHora(e.target.value)}
      />
      <button type="submit" className="bg-green-500 hover:bg-green-600 text-white px-4 rounded-lg font-bold transition-all">
        +
      </button>
    </form>
  );
}
