import React, { useState } from "react";
import PlacesList from "./components/PlacesList";
import PlaceDetail from "./components/placeDetail/PlaceDetail";
import lugares from "./data/lugares";

function App() {
  const [selectedPlace, setSelectedPlace] = useState(null);

  return (
    <div className="p-4">
      {selectedPlace ? (
        <PlaceDetail
          place={selectedPlace}
          onBack={() => setSelectedPlace(null)}
        />
      ) : (
        <PlacesList places={lugares} onSelect={setSelectedPlace} />
      )}
    </div>
  );
}

export default App;


