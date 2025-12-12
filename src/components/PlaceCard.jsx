import React from "react";

export default function PlaceCard({ lugar, onOpenDetails, onHover }) {
  return (
    <div
      className="group bg-white rounded-xl shadow-md overflow-hidden cursor-pointer transition-all duration-500 hover:shadow-2xl hover:scale-105 transform"
      onMouseEnter={() => onHover?.(lugar)}
      onMouseLeave={() => onHover?.(null)}
      onClick={() => onOpenDetails?.(lugar)}
    >
      {/* Imagen superior */}
      <div className="relative h-40 bg-gradient-to-br from-gray-300 to-gray-400 overflow-hidden">
        <img
          src={lugar.imagen}
          alt={lugar.nombre}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-120"
        />
        {/* Overlay oscuro en hover */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-500"></div>
        
        {lugar.rating && (
          <div className="absolute top-3 right-3 bg-white rounded-full px-3 py-1.5 font-bold shadow-lg text-sm z-20 transition-all duration-300 group-hover:scale-110">
            ⭐ {lugar.rating}
          </div>
        )}
      </div>

      {/* Contenido */}
      <div className="p-4 flex flex-col h-full">
        <h3 className="text-lg font-bold text-gray-900 mb-1.5 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
          {lugar.nombre}
        </h3>

        <p className="text-gray-600 text-xs mb-3 line-clamp-2 flex-grow">
          {lugar.descripcion}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-semibold hover:bg-blue-200 transition-colors">
            {lugar.pais}
          </span>
          {lugar.categoria && (
            <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full font-semibold capitalize hover:bg-purple-200 transition-colors">
              {lugar.categoria}
            </span>
          )}
        </div>

        {/* Precio */}
        {lugar.precioCOP !== undefined && lugar.precioCOP !== null && (
          <div className="text-sm font-bold text-green-600 mb-2.5">
            ${lugar.precioCOP.toLocaleString("es-CO")}
          </div>
        )}

        {/* Barra de similitud */}
        {typeof lugar.similitud === "number" && (
          <div className="mb-3">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs text-gray-600 font-semibold">Compatibilidad</span>
              <span className="text-xs font-bold text-blue-600">{lugar.similitud}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
              <div
                className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 h-2 rounded-full transition-all duration-700"
                style={{ width: `${lugar.similitud}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Botón */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onOpenDetails?.(lugar);
          }}
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-2 rounded-lg text-xs font-bold transition-all duration-300 transform group-hover:shadow-lg"
        >
          Ver detalles →
        </button>
      </div>
    </div>
  );
}
