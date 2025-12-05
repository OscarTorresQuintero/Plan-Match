export default function DaySelector({ diaSeleccionado, setDiaSeleccionado }) {
  return (
    <div className="flex gap-2 mb-4">
      <button
        onClick={() => setDiaSeleccionado(1)}
        className={`px-4 py-2 rounded ${
          diaSeleccionado === 1 ? "bg-blue-600 text-white" : "bg-gray-200"
        }`}
      >
        Día 1
      </button>

      <button
        onClick={() => setDiaSeleccionado(2)}
        className={`px-4 py-2 rounded ${
          diaSeleccionado === 2 ? "bg-blue-600 text-white" : "bg-gray-200"
        }`}
      >
        Día 2
      </button>
    </div>
  );
}
