import React from "react";

const ImageGallery = ({ imagen }) => {
  return (
    <div className="w-full">
      <img
        src={imagen}
        alt="Foto del lugar"
        className="w-full h-72 object-cover rounded-xl shadow"
      />
    </div>
  );
};

export default ImageGallery;
