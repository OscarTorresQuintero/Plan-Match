import React, { useState } from "react";
import PlaceDetail from "./components/placeDetail/PlaceDetail";
import lugares from "./data/lugares";
import "./App.css";

function App() {
  const [selectedPlace, setSelectedPlace] = useState(lugares[0]);
  const [showDetail, setShowDetail] = useState(false);

  const handleSelectPlace = (place) => {
    setSelectedPlace(place);
    setShowDetail(true);
  };

  const handleBackToList = () => {
    setShowDetail(false);
  };

  if (showDetail) {
    return (
      <div className="app-container">
        <button className="back-button" onClick={handleBackToList}>
          ← Volver a Lugares
        </button>
        <PlaceDetail place={selectedPlace} />
      </div>
    );
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>🌍 Plan Match - Descubre Lugares Increíbles</h1>
        <p>Explora los mejores destinos turísticos del mundo</p>
      </header>

      <div className="places-grid">
        {lugares.map((place) => (
          <div key={place.id} className="place-card" onClick={() => handleSelectPlace(place)}>
            <div className="place-card-image">
              <img src={place.imagen} alt={place.nombre} />
              <div className="place-card-overlay">
                <button className="view-details-btn">Ver Detalles</button>
              </div>
            </div>
            <div className="place-card-content">
              <h2>{place.nombre}</h2>
              <p className="place-country">📍 {place.pais}</p>
              <div className="place-card-footer">
                <span className="place-rating">
                  {"★".repeat(place.rating)}
                  {"☆".repeat(5 - place.rating)}
                </span>
                <span className="place-price">
                  {place.precioCOP === 0 ? "Gratis" : `$${place.precioCOP.toLocaleString("es-CO")}`}
                </span>
              </div>
              <p className="place-description">{place.descripcion}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

