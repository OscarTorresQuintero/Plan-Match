<ImageGallery images={[selectedPlace.imagen]} />  // usamos la única imagen como array
<InfoSection
  name={selectedPlace.nombre}
  price={selectedPlace.precioCOP}
  distance={"No disponible"}   // como no tienes distancia
  rating={selectedPlace.rating}
  description={selectedPlace.descripcion}
  hours={"No disponible"}      // como no tienes horarios
/>

