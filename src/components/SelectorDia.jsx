<<<<<<< HEAD
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
=======
export default function SelectorDia({ dia, setDia, dias }) {
  return (
    <div className="flex gap-2 mb-6 flex-wrap">
      {dias.map(n => (
        <button
          key={n}
          onClick={() => setDia(n)}
          className={`px-4 py-2 rounded-lg font-bold transition-all transform hover:scale-105 ${
            dia === n 
              ? "bg-blue-600 text-white shadow-lg" 
              : "bg-gray-200 text-gray-900 hover:bg-gray-300"
          }`}
        >
          Día {n}
        </button>
      ))}
>>>>>>> 5214fdc (Guardando cambios antes de moverme a main)
    </div>
  );
}
