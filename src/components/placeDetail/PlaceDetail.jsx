import React from "react";
import ImageGallery from "./ImageGallery";
import InfoSection from "./InfoSection";

const PlaceDetail = ({ lugar, onBack }) => {
  if (!lugar) return null;

  return (
    <div className="p-4">
      <button
        className="mb-4 px-3 py-2 bg-gray-800 text-white rounded"
        onClick={onBack}
      >
        ← Volver
      </button>

      <ImageGallery imagen={lugar.imagen} />
      <InfoSection lugar={lugar} />
    </div>
  );
};

export default PlaceDetail;

