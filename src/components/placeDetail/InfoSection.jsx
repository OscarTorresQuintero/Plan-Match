import React from "react";

const InfoSection = ({ lugar }) => {
  return (
    <div className="mt-4 p-4 border rounded-lg shadow bg-white">
      <h1 className="text-2xl font-bold">{lugar.nombre}</h1>
      <p className="mt-2">{lugar.descripcion}</p>

      <div className="mt-4 space-y-1 text-gray-700">
        <p><strong>Precio:</strong> ${lugar.precio.toLocaleString()}</p>
        <p><strong>Horario:</strong> {lugar.horario}</p>
        <p><strong>Tipo de plan:</strong> {lugar.tipoPlan}</p>
        <p><strong>Rating:</strong> ⭐ {lugar.rating}</p>
      </div>
    </div>
  );
};

export default InfoSection;

