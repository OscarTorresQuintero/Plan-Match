import { useState } from "react";
import QuestionCard from "./QuestionCard.jsx";
import ProgressSteps from "./ProgressBar.jsx";
import { filtrarLugares } from "../service/Filtros.jsx";

export default function QuestionFlow() {
  const preguntas = [
    {
      key: "precioCOP",
      pregunta: "¿Cuál es tu presupuesto máximo?",
      opciones: ['100k COP', '300k COP', '500k COP', '800k COP', '1200k COP']
    },
    {
      key: "distancia",
      pregunta: "¿Qué distancia máxima quieres viajar?",
      opciones: ['100km', '500km', '1000km', '5000km', '15000km']
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
    },
    {

      key: "rating",
      pregunta: "¿Cuál es tu calificación mínima que desea ver?",
      opciones: [1, 2, 3, 4, 5]

    },
    {
      key: "tipoActividad",
      pregunta: "¿Qué tipo de actividad prefieres?",
      opciones: ["relajación", "aventura", "cultura", "exploración"]
    },


    {
      key: "categoria",
      pregunta: "¿Qué categoría de lugar te gustaría visitar?",
      opciones: ["playa", "montaña", "ciudad", "histórico"]
    },


    {
      key: "clima",
      pregunta: "¿Qué clima prefieres?",
      opciones: ["cálido", "frío", "templado"]
    },


    {
      key: "presupuesto",
      pregunta: "¿Cuál es tu presupuesto aproximado?",
      opciones: ["bajo", "medio", "alto"]
    },


    {
      key: "tiempoVisita",
      pregunta: "¿Cuánto tiempo planeas quedarte?",
      opciones: ["corto", "medio", "largo"]
    },


    {
      key: "accesibilidad",
      pregunta: "¿Qué nivel de accesibilidad necesitas?",
      opciones: ["baja", "media", "alta"]
    },


    {
      key: "mejorEpoca",
      pregunta: "¿En qué época del año deseas viajar?",
      opciones: [
        "enero - marzo",
        "abril - junio",
        "julio - septiembre",
        "octubre - diciembre"
      ]
    },



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
