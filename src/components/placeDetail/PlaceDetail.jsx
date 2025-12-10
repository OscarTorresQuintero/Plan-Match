import React, { useState } from "react";
import InfoSection from "./InfoSection";
import "./PlaceDetail.css";

const PlaceDetail = ({ place }) => {
  const [selectedPlace] = useState(place);

  return (
    <div className="place-detail-container">
      <div className="place-detail-content">
        {/* Imagen Principal */}
        <div className="place-detail-image">
          <img src={selectedPlace.imagen} alt={selectedPlace.nombre} />
          <div className="image-overlay">
            <h1 className="place-detail-title">{selectedPlace.nombre}</h1>
            <p className="place-detail-country">📍 {selectedPlace.pais}</p>
          </div>
        </div>

        {/* Info Section */}
        <div className="place-detail-info">
          <InfoSection
            name={selectedPlace.nombre}
            price={selectedPlace.precioCOP}
            rating={selectedPlace.rating}
            description={selectedPlace.descripcion}
            place={selectedPlace}
          />
        </div>
      </div>
    </div>
  );
};

export default PlaceDetail;

