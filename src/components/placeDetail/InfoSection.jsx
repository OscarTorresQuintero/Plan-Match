import React from "react";

const InfoSection = ({ name, price, distance, rating, description, hours }) => {
  return (
    <div className="info-section bg-white p-4 rounded shadow">
      <p><strong>Precio:</strong> {price}</p>
      <p><strong>Distancia:</strong> {distance} km</p>
      <p><strong>Rating:</strong> {rating} ⭐</p>
      <p className="mt-2">{description}</p>
      <p className="mt-2"><strong>Horario:</strong> {hours}</p>
    </div>
  );
};

export default InfoSection;

