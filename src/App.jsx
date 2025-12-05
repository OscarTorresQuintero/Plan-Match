import React, { useState } from "react";
import PlacesList from "./components/PlacesList";
import PlaceDetail from "./placeDetail/PlaceDetail";

function App() {
  const [selectedPlace, setSelectedPlace] = useState(null);

  return (
    <div className="max-w-6xl mx-auto p-4">
      {!selectedPlace ? (
        <PlacesList onSelect={setSelectedPlace} />
      ) : (
        <PlaceDetail lugar={selectedPlace} onBack={() => setSelectedPlace(null)} />
      )}
    </div>
  );
}

export default App;
