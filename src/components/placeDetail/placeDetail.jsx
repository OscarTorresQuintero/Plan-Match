import React, { useState } from "react";
import ImageGallery from "./ImageGallery";
import InfoSection from "./InfoSection";

const PlaceDetail = ({ place }) => {
  const [selectedPlace] = useState(place);

  return (
    <div className="place-detail p-6 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold mb-4">{selectedPlace.nombre}</h1>
      <p className="text-lg text-gray-600 mb-6">{selectedPlace.pais}</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <ImageGallery images={[selectedPlace.imagen]} />
        </div>
        <div>
          <InfoSection
            name={selectedPlace.nombre}
            price={selectedPlace.precioCOP}
            distance={"No disponible"}
            rating={selectedPlace.rating}
            description={selectedPlace.descripcion}
            hours={"No disponible"}
          />
        </div>
      </div>
    </div>
  );
};

export default PlaceDetail;

