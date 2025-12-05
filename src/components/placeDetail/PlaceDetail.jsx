import React from "react";
import ImageGallery from "./ImageGallery";
import InfoSection from "./InfoSection";

const PlaceDetail = ({ place }) => {
  if (!place) return <p>No se encontró el lugar.</p>;

  return (
    <div className="place-detail p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">{place.name}</h1>
      <ImageGallery images={place.images} />
      <InfoSection
        name={place.name}
        price={place.price}
        distance={place.distance}
        rating={place.rating}
        description={place.description}
        hours={place.hours}
      />
    </div>
  );
};

export default PlaceDetail;

