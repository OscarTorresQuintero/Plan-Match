import React, { useState } from "react";

import PlacesList from "./components/PlacesList";
import PlaceDetail from "./components/placeDetail/PlaceDetail";

function App() {
  const [selectedPlace, setSelectedPlace] = useState(null);

  return (
    <>
      {!selectedPlace ? (
        <PlacesList onSelectPlace={setSelectedPlace} />
      ) : (
        <PlaceDetail place={selectedPlace} onBack={() => setSelectedPlace(null)} />
      )}
    </>
  );
}

export default App;

