function ImageGallery({ imagen }) {
  return (
    <div className="mb-4">
      <img src={imagen} alt="Lugar" className="rounded-lg w-full" />
    </div>
  );
}

export default ImageGallery;

