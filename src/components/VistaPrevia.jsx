import { useState } from "react";

export default function VistaPrevia({ lugar, actividades, onConfirmar, onEditar }) {
  const [mostrar, setMostrar] = useState(false);
  const dias = Object.keys(actividades).map(Number).sort((a, b) => a - b);
  const totalActividades = Object.values(actividades).reduce((sum, act) => sum + act.length, 0);

  if (!mostrar) {
    return (
      <button
        onClick={() => setMostrar(true)}
        className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white py-3 rounded-lg font-bold transition-all transform hover:scale-105 shadow-lg flex items-center justify-center gap-2 mb-6"
      >
        👁️ Vista Previa del Itinerario
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-slideUp">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 flex items-center justify-between">
          <h2 className="text-2xl font-black">👁️ Vista Previa</h2>
          <button
            onClick={() => setMostrar(false)}
            className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-4 py-2 rounded-lg font-bold transition-all"
          >
            ✕
          </button>
        </div>

        {/* Contenido */}
        <div className="p-8">
          {/* Resumen del lugar */}
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-2xl border-l-4 border-blue-500 mb-6">
            <h3 className="text-3xl font-black text-gray-900 mb-2">{lugar.nombre}</h3>
            <div className="flex flex-wrap gap-4 text-sm font-bold text-gray-700">
              <div>📍 {lugar.pais}</div>
              {lugar.rating && <div>⭐ {lugar.rating}</div>}
              {lugar.precioCOP && <div>💰 ${lugar.precioCOP.toLocaleString("es-CO")}</div>}
            </div>
          </div>

          {/* Estadísticas */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-gradient-to-br from-blue-100 to-blue-50 p-4 rounded-lg border-l-4 border-blue-500 text-center">
              <p className="text-2xl font-black text-blue-600">{dias.length}</p>
              <p className="text-xs font-bold text-gray-700">Días</p>
            </div>
            <div className="bg-gradient-to-br from-green-100 to-green-50 p-4 rounded-lg border-l-4 border-green-500 text-center">
              <p className="text-2xl font-black text-green-600">{totalActividades}</p>
              <p className="text-xs font-bold text-gray-700">Actividades</p>
            </div>
            <div className="bg-gradient-to-br from-purple-100 to-purple-50 p-4 rounded-lg border-l-4 border-purple-500 text-center">
              <p className="text-2xl font-black text-purple-600">
                {totalActividades > 0 ? Math.round(totalActividades / dias.length) : 0}
              </p>
              <p className="text-xs font-bold text-gray-700">Prom/día</p>
            </div>
          </div>

          {/* Itinerario por días */}
          <div className="space-y-4 mb-6">
            <h4 className="text-xl font-bold text-gray-900">📅 Itinerario Detallado</h4>
            {dias.map(dia => (
              <div key={dia} className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 rounded-lg border-l-4 border-indigo-500">
                <h5 className="text-lg font-bold text-gray-900 mb-3">Día {dia}</h5>
                {actividades[dia]?.length === 0 ? (
                  <p className="text-gray-600 italic">Sin actividades planificadas</p>
                ) : (
                  <ul className="space-y-2">
                    {actividades[dia].map((act, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-gray-800">
                        <span className="text-xl">🕐</span>
                        <span className="font-bold">{act.hora}</span>
                        <span className="text-gray-700">{act.nombre}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>

          {/* Botones de acción */}
          <div className="flex gap-3 pt-6 border-t border-gray-200">
            <button
              onClick={() => setMostrar(false)}
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-900 py-3 rounded-lg font-bold transition-all"
            >
              ← Volver a Editar
            </button>
            <button
              onClick={() => {
                setMostrar(false);
                onConfirmar();
              }}
              className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-3 rounded-lg font-bold transition-all shadow-lg"
            >
              ✅ Confirmar e Itinerario
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
