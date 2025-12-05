import React from "react";

const PlaceCard = ({ lugar, onSelect }) => {
  return (
    <div
      className="border rounded-lg shadow-md p-3 cursor-pointer hover:shadow-lg"
      onClick={() => onSelect(lugar)}
    >
      <img
        src={lugar.imagen}
        alt={lugar.nombre}
        className="w-full h-40 object-cover rounded-md"
      />

      <h2 className="text-xl font-bold mt-2">{lugar.nombre}</h2>
      <p className="text-sm text-gray-600">{lugar.descripcion}</p>

      <div className="mt-2 text-sm">
        <p><strong>Precio:</strong> ${lugar.precio.toLocaleString()}</p>
        <p><strong>Plan:</strong> {lugar.tipoPlan}</p>
        <p><strong>Rating:</strong> ⭐ {lugar.rating}</p>
      </div>
    </div>
  );
};

export default PlaceCard;
