export default function CardActividad({ actividad, index, eliminar }) {
  return (
    <div className="border border-gray-300 p-4 mt-2 flex justify-between items-center rounded-lg bg-gray-50 hover:shadow-md transition-all">
      <div>
        <strong className="text-lg text-gray-900">{actividad.nombre}</strong>
        <p className="text-sm text-gray-600">🕐 {actividad.hora}</p>
      </div>
      <button
        onClick={() => eliminar(index)}
        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg font-bold transition-all"
      >
        ✕
      </button>
    </div>
  );
}
