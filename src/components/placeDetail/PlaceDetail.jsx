import InfoSection from "./InfoSection";
import ImageGallery from "./ImageGallery";

function PlaceDetail({ place, onBack }) {
  return (
    <div className="p-4">
      <button onClick={onBack} className="mb-4 bg-gray-200 px-3 py-1 rounded">
        ← Volver
      </button>

      <h1 className="text-2xl font-bold mb-4">{place.nombre}</h1>

      <ImageGallery imagen={place.imagen} />

      <InfoSection
        descripcion={place.descripcion}
        rating={place.rating}
        precio={place.precio}
        horario={place.horario}
        plan={place.plan}
      />
    </div>
  );
}

export default PlaceDetail;

