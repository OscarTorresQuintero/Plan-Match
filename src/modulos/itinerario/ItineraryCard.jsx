export default function ItineraryCard({ actividad, eliminar }) {
  return (
    <div className="border p-4 rounded shadow mb-2 flex justify-between items-center">
      <div>
        <h3 className="font-bold">{actividad.nombre}</h3>
        <p>Hora: {actividad.hora}</p>
      </div>
      <button
        onClick={eliminar}
        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
      >
        Eliminar
      </button>
    </div>
  );
}
