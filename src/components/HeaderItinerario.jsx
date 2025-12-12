export default function HeaderItinerario({ lugar, onBack }) {
  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-5xl font-black text-gray-900 mb-2">📅 Itinerario</h1>
        <p className="text-gray-600 font-semibold">Planifica tu viaje a {lugar.nombre}</p>
      </div>
      <button
        onClick={onBack}
        className="bg-gray-200 hover:bg-gray-300 text-gray-900 py-3 px-5 rounded-lg font-bold transition-all transform hover:scale-105"
      >
        ← Volver
      </button>
    </div>
  );
}
