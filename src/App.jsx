import { useState } from "react";
import PlacesList from "./components/PlacesList";
import PlaceDetail from "./components/placeDetail/PlaceDetail";

function App() {
  const [selectedPlace, setSelectedPlace] = useState(null);

  return (
    <div className="app-container">
      {selectedPlace ? (
        <PlaceDetail 
          place={selectedPlace} 
          onBack={() => setSelectedPlace(null)} 
        />
      ) : (
        <PlacesList onSelectPlace={setSelectedPlace} />
      )}
    </div>
  );
}

export default App;

