import React from "react";

const ImageGallery = ({ imagen }) => {
  return (
    <div>
      <img
        src={imagen}
        alt="Lugar"
        className="w-full h-72 object-cover rounded-xl shadow"
      />
    </div>
  );
};

export default ImageGallery;

