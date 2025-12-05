import React, { useState } from "react";
import PlaceDetail from "./components/placeDetail/PlaceDetail";
import lugares from "./data/lugares";

function App() {
  const [selectedPlace, setSelectedPlace] = useState(lugares[0]); // por ejemplo

  return (
    <div className="App">
      <PlaceDetail place={selectedPlace} />
    </div>
  );
}

export default App;

