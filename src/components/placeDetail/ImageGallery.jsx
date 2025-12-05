import React, { useState } from "react";

const ImageGallery = ({ images }) => {
  const [selected, setSelected] = useState(0);

  if (!images || images.length === 0) return <p>No hay imágenes disponibles.</p>;

  return (
    <div className="image-gallery mb-4">
      <img
        src={images[selected]}
        alt={`Imagen ${selected + 1}`}
        className="w-full h-64 object-cover rounded"
      />
      <div className="flex mt-2 space-x-2 overflow-x-auto">
        {images.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={`Miniatura ${idx + 1}`}
            className={`w-16 h-16 object-cover rounded cursor-pointer border-2 ${
              idx === selected ? "border-blue-500" : "border-gray-200"
            }`}
            onClick={() => setSelected(idx)}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
