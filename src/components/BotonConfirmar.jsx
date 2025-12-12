export default function BotonConfirmar({ onConfirmar, onCancelar }) {
  return (
    <div className="flex gap-4 justify-end mt-8 pt-6 border-t border-gray-200">
      <button
        onClick={onCancelar}
        className="bg-gray-200 hover:bg-gray-300 text-gray-900 py-3 px-8 rounded-lg font-bold transition-all transform hover:scale-105 shadow-md"
      >
        ← Volver
      </button>
      <button
        onClick={onConfirmar}
        className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-3 px-8 rounded-lg font-bold transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
      >
         Confirmar Itinerario
      </button>
    </div>
  );
}
