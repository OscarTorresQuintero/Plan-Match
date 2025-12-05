import React from "react";
import PlaceCard from "./PlaceCard";
import { lugares } from "./data/lugares";

const PlacesList = ({ onSelect }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
      {lugares.map((lugar) => (
        <PlaceCard key={lugar.id} lugar={lugar} onSelect={onSelect} />
      ))}
    </div>
  );
};

export default PlacesList;
