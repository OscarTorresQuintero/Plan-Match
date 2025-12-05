import React from "react";

const InfoSection = ({ name, price, distance, rating, description, hours }) => {
  const formatPrice = (priceValue) => {
    if (!priceValue || priceValue === 0) return "Gratis";
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(priceValue);
  };

  const renderStars = (ratingValue) => {
    if (!ratingValue) return "Sin calificación";
    return (
      <div className="flex items-center gap-1">
        <span className="text-yellow-400">
          {"★".repeat(ratingValue)}{"☆".repeat(5 - ratingValue)}
        </span>
        <span className="text-gray-700">({ratingValue}/5)</span>
      </div>
    );
  };

  return (
    <div className="info-section bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">{name}</h2>
      
      <div className="space-y-4">
        {/* Precio */}
        <div className="flex items-center justify-between pb-4 border-b border-gray-200">
          <span className="text-gray-600 font-semibold">Precio:</span>
          <span className="text-2xl font-bold text-green-600">{formatPrice(price)}</span>
        </div>

        {/* Rating */}
        <div className="flex items-center justify-between pb-4 border-b border-gray-200">
          <span className="text-gray-600 font-semibold">Calificación:</span>
          <div className="text-lg">{renderStars(rating)}</div>
        </div>

        {/* Distancia */}
        <div className="flex items-center justify-between pb-4 border-b border-gray-200">
          <span className="text-gray-600 font-semibold">Distancia:</span>
          <span className="text-gray-700">{distance || "No disponible"}</span>
        </div>

        {/* Horario */}
        <div className="flex items-center justify-between pb-4 border-b border-gray-200">
          <span className="text-gray-600 font-semibold">Horario:</span>
          <span className="text-gray-700">{hours || "No disponible"}</span>
        </div>

        {/* Descripción */}
        <div className="pt-4">
          <h3 className="font-semibold text-gray-800 mb-2">Descripción</h3>
          <p className="text-gray-700 leading-relaxed">
            {description || "Sin descripción disponible"}
          </p>
        </div>

        {/* Botón de acción */}
        <button className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-200">
          Visitar Lugar
        </button>
      </div>
    </div>
  );
};

export default InfoSection;

