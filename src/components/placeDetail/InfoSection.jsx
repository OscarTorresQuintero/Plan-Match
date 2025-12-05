import React from "react";

const InfoSection = ({ name, price, distance, rating, description, hours }) => {
  return (
    <div className="info-section bg-white p-4 rounded shadow">
      <p><strong>Precio:</strong> {price || "No disponible"}</p>
      <p><strong>Distancia:</strong> {distance ? `${distance} km` : "No disponible"}</p>
      <p><strong>Rating:</strong> {rating ? `${rating} ` : "No disponible"}</p>
      <p className="mt-2">{description || "Sin descripción"}</p>
      <p className="mt-2"><strong>Horario:</strong> {hours || "No disponible"}</p>
    </div>
  );
};

export default InfoSection;
