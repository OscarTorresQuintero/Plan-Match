import React from "react";
import PlaceCard from "./PlaceCard";
import { lugares } from "../data/lugares";

const PlacesList = ({ onSelect }) => {
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
      {lugares.map((lugar) => (
        <PlaceCard key={lugar.id} lugar={lugar} onSelect={onSelect} />
      ))}
    </div>
  );
};

export default PlacesList;

