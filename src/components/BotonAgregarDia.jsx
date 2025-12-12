export default function BotonAgregarDia({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full mb-6 px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg font-bold transition-all transform hover:scale-105 shadow-md"
    >
      + Agregar Día
    </button>
  );
}
