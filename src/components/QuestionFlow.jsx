import { useState } from "react";
import QuestionCard from "./QuestionCard.jsx";
import ProgressSteps from "./ProgressBar.jsx";
import { filtrarLugares } from "../service/Filtros.jsx";

export default function QuestionFlow() {
  const preguntas = [
    {
      key: "presupuesto",
      pregunta: "¿Cuál es tu presupuesto máximo?",
      opciones: [100, 300, 500, 800, 1200]
    },
    {
      key: "distancia",
      pregunta: "¿Qué distancia máxima quieres viajar?",
      opciones: [100, 500, 1000, 5000, 15000]
    },
    {
      key: "tipo",
      pregunta: "¿Qué tipo de plan buscas?",
      opciones: ["Relax", "Aventura", "Fiesta"]
    },
    {
      key: "personas",
      pregunta: "¿Para cuántas personas es el viaje?",
      opciones: [1, 2, 3, 4, 5]
    }
  ];

  const [paso, setPaso] = useState(0);
  const [respuestas, setRespuestas] = useState({});
  const total = preguntas.length;

  const handleSelect = (opcion) => {
    const key = preguntas[paso].key;

    const nuevasRespuestas = { ...respuestas, [key]: opcion };
    setRespuestas(nuevasRespuestas);

    if (paso + 1 < total) {
      setPaso(paso + 1);
    } else {
      const resultados = filtrarLugares(nuevasRespuestas);
      console.log("RESULTADOS DEL FILTRO:", resultados);
      alert("RESULTADOS EN CONSOLA :)");
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <ProgressSteps paso={paso} total={total} />

      <QuestionCard
        pregunta={preguntas[paso].pregunta}
        opciones={preguntas[paso].opciones}
        onSelect={handleSelect}
      />
    </div>
  );
}
