import { useState } from "react";
import FormularioActividad from "./FormularioActividad.jsx";
import ItineraryCard from "./ItineraryCard.jsx";

export default function Itinerario() {
  const [actividades, setActividades] = useState([]);

  function agregarActividad(nuevaActividad) {
    setActividades([...actividades, nuevaActividad]);
  }

  function eliminarActividad(index) {
    setActividades(actividades.filter((_, i) => i !== index));
  }

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Itinerario</h1>

      <FormularioActividad agregarActividad={agregarActividad} />

      <h2 className="text-xl font-semibold mb-2">Actividades:</h2>
      {actividades.length === 0 && <p>No hay actividades aún.</p>}

      {actividades.map((act, i) => (
        <ItineraryCard
          key={i}
          actividad={act}
          eliminar={() => eliminarActividad(i)}
        />
      ))}
    </div>
  );
}
