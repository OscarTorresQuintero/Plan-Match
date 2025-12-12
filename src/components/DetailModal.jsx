import React from "react";

export default function DetailModal({ lugar, onClose, onReserve }) {
  if (!lugar) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-slideUp">
        {/* Header con imagen y botón cerrar */}
        <div className="relative">
          <div className="h-80 overflow-hidden rounded-t-3xl bg-gradient-to-br from-gray-300 to-gray-400">
            <img
              src={lugar.imagen}
              alt={lugar.nombre}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white rounded-full p-3 hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-110"
          >
            <svg
              className="w-6 h-6 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Contenido */}
        <div className="p-8">
          <h2 className="text-5xl font-black text-gray-900 mb-3">
            {lugar.nombre}
          </h2>

          {/* Ubicación y Rating */}
          <div className="flex items-center gap-3 mb-8">
            <span className="text-lg bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-bold">
               {lugar.pais}
            </span>
            {lugar.rating && (
              <span className="text-lg bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full font-bold">
                ⭐ {lugar.rating}
              </span>
            )}
          </div>

          {/* Descripción */}
          <p className="text-gray-700 text-lg mb-8 leading-relaxed">
            {lugar.descripcion}
          </p>

          {/* Grid de información mejorado */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
            {lugar.precioCOP && (
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl border-l-4 border-green-500 hover:shadow-lg transition-all">
                <p className="text-sm text-gray-600 font-bold mb-1">Precio estimado</p>
                <p className="text-2xl font-black text-green-700">
                  ${lugar.precioCOP.toLocaleString("es-CO")}
                </p>
              </div>
            )}

            {lugar.tipoActividad && (
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl border-l-4 border-purple-500 hover:shadow-lg transition-all">
                <p className="text-sm text-gray-600 font-bold mb-1">Tipo de actividad</p>
                <p className="text-lg font-bold text-purple-700 capitalize">
                  {lugar.tipoActividad}
                </p>
              </div>
            )}

            {lugar.categoria && (
              <div className="bg-gradient-to-br from-pink-50 to-pink-100 p-4 rounded-xl border-l-4 border-pink-500 hover:shadow-lg transition-all">
                <p className="text-sm text-gray-600 font-bold mb-1">Categoría</p>
                <p className="text-lg font-bold text-pink-700 capitalize">
                  {lugar.categoria}
                </p>
              </div>
            )}

            {lugar.clima && (
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl border-l-4 border-blue-500 hover:shadow-lg transition-all">
                <p className="text-sm text-gray-600 font-bold mb-1">Clima</p>
                <p className="text-lg font-bold text-blue-700 capitalize">
                  {lugar.clima}
                </p>
              </div>
            )}

            {lugar.presupuesto && (
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-xl border-l-4 border-orange-500 hover:shadow-lg transition-all">
                <p className="text-sm text-gray-600 font-bold mb-1">Presupuesto</p>
                <p className="text-lg font-bold text-orange-700 capitalize">
                  {lugar.presupuesto}
                </p>
              </div>
            )}

            {lugar.tiempoVisita && (
              <div className="bg-gradient-to-br from-teal-50 to-teal-100 p-4 rounded-xl border-l-4 border-teal-500 hover:shadow-lg transition-all">
                <p className="text-sm text-gray-600 font-bold mb-1">Duración recomendada</p>
                <p className="text-lg font-bold text-teal-700 capitalize">
                  {lugar.tiempoVisita}
                </p>
              </div>
            )}
          </div>

          {/* Mejor Época */}
          {lugar.mejorEpoca && (
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-5 rounded-xl border-l-4 border-indigo-500 mb-6 hover:shadow-lg transition-all">
              <p className="text-sm text-gray-600 font-bold mb-2">
                Mejor época para visitar
              </p>
              <p className="text-xl font-black text-indigo-700">
                🗓️ {lugar.mejorEpoca}
              </p>
            </div>
          )}

          {/* Accesibilidad */}
          {lugar.accesibilidad && (
            <div className="bg-gradient-to-r from-red-50 to-pink-50 p-5 rounded-xl border-l-4 border-red-500 mb-6 hover:shadow-lg transition-all">
              <p className="text-sm text-gray-600 font-bold mb-2">
                Accesibilidad
              </p>
              <p className="text-xl font-black text-red-700 capitalize">
                ♿ {lugar.accesibilidad}
              </p>
            </div>
          )}

          {/* Actividades */}
          {lugar.actividades && lugar.actividades.length > 0 && (
            <div className="mb-8">
              <p className="text-2xl font-black text-gray-900 mb-4">Actividades disponibles</p>
              <div className="flex flex-wrap gap-2">
                {lugar.actividades.map((actividad, idx) => (
                  <span
                    key={idx}
                    className="bg-gradient-to-r from-indigo-100 to-indigo-200 text-indigo-700 px-4 py-2 rounded-full font-bold text-sm hover:shadow-md transition-all"
                  >
                    🎯 {actividad}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Botones de acción mejorados */}
          <div className="flex gap-4 mt-8">
            <button
              onClick={onClose}
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-900 py-3 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
            >
              Cerrar
            </button>
            <button
              onClick={() => {
                if (typeof onReserve === "function") onReserve(lugar);
                onClose();
              }}
              className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              ✈️ Crear itinerario
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
