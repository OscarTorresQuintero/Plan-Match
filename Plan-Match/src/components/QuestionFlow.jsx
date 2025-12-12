import { useState } from "react";
import QuestionCard from "./QuestionCard.jsx";
import ProgressSteps from "./ProgressBar.jsx";
import PlacesResults from "./PlacesResults.jsx";
import { filtrarLugares } from "../service/Filtros.jsx";
import logo from "../assets/logoPlanmatch.jpeg";

export default function QuestionFlow() {
  const preguntas = [
    { key: "precioCOP", pregunta: "¿Cuál es tu presupuesto máximo?", opciones: ['100k COP', '300k COP', '500k COP', '800k COP', '1200k COP'] },
    { key: "distancia", pregunta: "¿Qué distancia máxima quieres viajar?", opciones: ['100km', '500km', '1000km', '5000km', '15000km'] },
    { key: "tipo", pregunta: "¿Qué tipo de plan buscas?", opciones: ["Relax", "Aventura", "Fiesta"] },
    { key: "personas", pregunta: "¿Para cuántas personas es el viaje?", opciones: [1, 2, 3, 4, 5] },
    { key: "rating", pregunta: "¿Cuál es tu calificación mínima que desea ver?", opciones: [1, 2, 3, 4, 5] },
    { key: "tipoActividad", pregunta: "¿Qué tipo de actividad prefieres?", opciones: ["relajación", "aventura", "cultura", "exploración"] },
    { key: "categoria", pregunta: "¿Qué categoría de lugar te gustaría visitar?", opciones: ["playa", "montaña", "ciudad", "histórico"] },
    { key: "clima", pregunta: "¿Qué clima prefieres?", opciones: ["cálido", "frío", "templado"] },
    { key: "presupuesto", pregunta: "¿Cuál es tu presupuesto aproximado?", opciones: ["bajo", "medio", "alto"] },
    { key: "tiempoVisita", pregunta: "¿Cuánto tiempo planeas quedarte?", opciones: ["corto", "medio", "largo"] },
    { key: "accesibilidad", pregunta: "¿Qué nivel de accesibilidad necesitas?", opciones: ["baja", "media", "alta"] },
    { key: "mejorEpoca", pregunta: "¿En qué época del año deseas viajar?", opciones: ["enero - marzo", "abril - junio", "julio - septiembre", "octubre - diciembre"] }
  ];

  const [paso, setPaso] = useState(0);
  const [respuestas, setRespuestas] = useState({});
  const [resultados, setResultados] = useState(null);
  const total = preguntas.length;

  const handleSelect = (opcion) => {
    const key = preguntas[paso].key;
    const nuevasRespuestas = { ...respuestas, [key]: opcion };
    setRespuestas(nuevasRespuestas);

    if (paso + 1 < total) {
      setPaso(paso + 1);
    } else {
      const resultadosFiltrados = filtrarLugares(nuevasRespuestas);
      console.log("RESULTADOS DEL FILTRO:", resultadosFiltrados);
      setResultados(resultadosFiltrados);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-white to-green-200 flex flex-col items-center py-10">
      {/* Header Logo y Título */}
      <div className="flex flex-col items-center mb-6">
        <img src={logo} alt="Logo PlanMatch" className="w-24 h-24 rounded-full shadow-lg border-4 border-white" />
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-yellow-500 to-green-600 drop-shadow-lg mt-3">Plan Match</h1>
        <p className="text-gray-700 text-lg font-semibold tracking-wide">Encuentra tu próximo destino 🔥</p>
      </div>

      {/* Mostrar Cuestionario o Resultados */}
      {resultados === null ? (
        <div className="w-full max-w-2xl bg-white p-6 rounded-2xl shadow-lg border border-blue-100">
          <ProgressSteps paso={paso} total={total} />
          <QuestionCard pregunta={preguntas[paso].pregunta} opciones={preguntas[paso].opciones} onSelect={handleSelect} />
        </div>
      ) : (
        <div className="w-full bg-white rounded-2xl shadow-lg border border-blue-100">
          <PlacesResults resultados={resultados} />
        </div>
      )}

      <p className="mt-10 text-gray-600 text-sm">✈️ Tu Mundo, Tu Salario, Tu Plan 🌍</p>
    </div>
  );
}
