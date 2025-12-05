import React, { useState } from "react";
import PlacesList from "./PlacesList";
import PlaceDetail from "./placeDetail/PlaceDetail";

function App() {
  const [selectedPlace, setSelectedPlace] = useState(null);

  return (
    <div className="max-w-5xl mx-auto">
      {!selectedPlace ? (
        <PlacesList onSelect={setSelectedPlace} />
      ) : (
        <PlaceDetail lugar={selectedPlace} onBack={() => setSelectedPlace(null)} />
      )}
    </div>
  );
}

export default App;
