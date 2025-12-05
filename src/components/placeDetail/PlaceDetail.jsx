import React, { useState } from "react";
import ImageGallery from "./ImageGallery";
import InfoSection from "./InfoSection";
import lugares from "../../data/lugares";

const PlaceDetail = () => {
  const [selectedPlace, setSelectedPlace] = useState(lugares[0]); // toma el primer lugar por defecto

  if (!selectedPlace) return <p>No se encontró el lugar.</p>;

  return (
    <div className="place-detail p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">{selectedPlace.name}</h1>
      <ImageGallery images={selectedPlace.images} />
      <InfoSection
        name={selectedPlace.name}
        price={selectedPlace.price}
        distance={selectedPlace.distance}
        rating={selectedPlace.rating}
        description={selectedPlace.description}
        hours={selectedPlace.hours}
      />
    </div>
  );
};

export default PlaceDetail;


export default PlaceDetail;

