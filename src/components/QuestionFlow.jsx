import React, { useState } from "react"; // Importa React y useState
import QuestionCard from "./QuestionCard.jsx"; // Componente que renderiza una pregunta y sus opciones
import ProgressSteps from "./ProgressBar.jsx"; // Componente que muestra el progreso (barra/pasos)
import PlacesResults from "./PlacesResults.jsx"; // Componente que muestra los resultados filtrados (lugares)
import Itinerary from "./Itinerary.jsx"; // Componente que muestra el itinerario/detalle de un lugar
import { filtrarLugares } from "../service/Filtros.jsx"; // Función que filtra los lugares según respuestas
import logo from "../assets/logoPlanmatch.jpeg"; // Importa la imagen del logo (asset local)

export default function QuestionFlow() {
  // Array de preguntas: cada objeto tiene una key (identificador), la pregunta y las opciones
const preguntas = [
  {
    key: "precioCOP",
    pregunta: "¿Cuál es tu presupuesto máximo (ida + alojamiento aprox.)?",
    opciones: [
      " 0 - 100.000 COP",
      " 200.000 - 500.000 COP",
      " 600.000 - 1.200.000 COP",
      "1.300.000 -  2.000.000 COP",
      " 2.500.000 - 5.000.000 COP"
     
    ]
  },
  {
    key: "distancia",
    pregunta: "¿Cuál es la distancia máxima que te gustaría viajar desde tu ciudad?",
    opciones: [
      " 100 km",
      " 500 km",
      " 1.000 km",
      " 5.000 km",
      " 15.000 km"
    ]
  },
  {
    key: "tipo",
    pregunta: "¿Qué estilo de plan prefieres?",
    opciones: [
      "relajación",
      "aventura",
      "fiesta",
      "cultural",
      "familiar"
    ]
  },
  {
    key: "personas",
    pregunta: "¿Para cuántas personas es el viaje?",
    opciones: [1, 2, 3, 4, 5]
  },
  {
    key: "rating",
    pregunta: "¿Cuál es la calificación mínima que deseas ver?",
    opciones: [1, 2, 3, 4, 5]
  },
  {
    key: "tipoActividad",
    pregunta: "¿Qué tipo de actividad te interesa principalmente?",
    opciones: [
      "relajación",
      "aventura",
      "cultural",
      "naturaleza",
      "urbano"
    ]
  },
  {
    key: "categoria",
    pregunta: "¿Qué categoría de lugar te gustaría visitar?",
    opciones: [
      "playa",
      "montaña",
      "ciudad",
      "histórico",
      "parque natural",
      "pueblo",
      "isla"
    ]
  },
  {
    key: "clima",
    pregunta: "¿Qué clima prefieres durante el viaje?",
    opciones: ["cálido", "templado", "frío", "tropical"]
  },
  {
    key: "presupuesto",
    pregunta: "¿Cómo definirías tu presupuesto general?",
    opciones: ["bajo", "medio", "alto"]
  },
  {
    key: "tiempoVisita",
    pregunta: "¿Cuánto tiempo planeas quedarte?",
    opciones: ["corto (1-3 días)", "medio (4-7 días)", "largo (8+ días)"]
  },
  {
    key: "accesibilidad",
    pregunta: "¿Qué nivel de accesibilidad necesitas (movilidad, accesos)?",
    opciones: ["baja", "media", "alta"]
  },
  {
    key: "mejorEpoca",
    pregunta: "¿En qué época del año planeas viajar?",
    opciones: [
      "enero - marzo",
      "abril - junio",
      "julio - septiembre",
      "octubre - diciembre"
    ]
  }
];

  // Estado local: paso actual del cuestionario (índice en preguntas)
  const [paso, setPaso] = useState(0);
  // Estado que guarda las respuestas seleccionadas: objeto { key: opcion, ... }
  const [respuestas, setRespuestas] = useState({});
  // Resultados filtrados: null = aún no se han calculado (o no mostrar), array = resultados
  const [resultados, setResultados] = useState(null);
  // Itinerario seleccionado / detalle del lugar; null = no se está viendo un itinerario
  const [itinerario, setItinerario] = useState(null);
  // Total de preguntas (longitud del array)
  const total = preguntas.length;

  // Si otra parte de la app solicitó abrir directamente la vista de "Destinos ideales"
  // (por ejemplo el header -> "Opciones de viajes"), se puede forzar la vista
  // de resultados colocando la key `openDestinos` en localStorage.
  // Aquí la leemos al montar y forzamos `resultados` para que se muestre
  // el componente PlacesResults (que usará lugares por defecto si el array está vacío).
  React.useEffect(() => {
    try {
      const flag = localStorage.getItem('openDestinos');
      if (flag) {
        // Al asignar un array vacío, PlacesResults usará su fallback interno
        // y mostrará "✈️ Tus Destinos Ideales".
        setResultados([]);
        localStorage.removeItem('openDestinos');
      }
    } catch (e) {
      // no crítico
      console.warn('openDestinos check failed', e);
    }
  }, []);

  // Función que se ejecuta cuando el usuario selecciona una opción en QuestionCard
  const handleSelect = (opcion) => {
    // Obtener la key de la pregunta actual
    const key = preguntas[paso].key;
    // Crear un nuevo objeto de respuestas agregando/actualizando la respuesta a esta key
    const nuevasRespuestas = { ...respuestas, [key]: opcion };
    // Guardar en estado
    setRespuestas(nuevasRespuestas);

    // Si aún quedan preguntas, avanzar al siguiente paso
    if (paso + 1 < total) {
      setPaso(paso + 1);
    } else {
      // Si no quedan preguntas, aplicar el filtro con todas las respuestas
      const resultadosFiltrados = filtrarLugares(nuevasRespuestas);
      console.log("RESULTADOS DEL FILTRO:", resultadosFiltrados); // Para depuración
      // Guardar los resultados (esto dispara render para mostrar PlacesResults)
      setResultados(resultadosFiltrados);
    }
  };

  // Cuando el usuario selecciona un lugar en los resultados para ver el itinerario
  const handleGoItinerary = (lugar) => {
    // Guardamos el lugar seleccionado en estado para mostrar el componente Itinerary
    setItinerario(lugar);
  };

  // JSX que renderiza el flujo completo
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-white to-green-200 flex flex-col items-center py-10">
      {/* Header Logo y Título */}
      <div className="flex flex-col items-center mb-6">
        <img src={logo} alt="Logo PlanMatch" className="w-24 h-24 rounded-full shadow-lg border-4 border-white" />
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-yellow-500 to-green-600 drop-shadow-lg mt-3">Plan Match</h1>
        <p className="text-gray-700 text-lg font-semibold tracking-wide">Encuentra tu próximo destino 🔥</p>
      </div>

      {/* Lógica de renderizado condicional:
          - Si hay itinerario seleccionado -> mostrar Itinerary
          - Si no, y resultados === null -> mostrar la siguiente pregunta
          - Si no, mostrar los resultados (PlacesResults)
      */}
      {itinerario ? (
        // Si itinerario tiene valor, renderizamos la vista de Itinerary
        <Itinerary lugar={itinerario} onBack={() => setItinerario(null)} />
      ) : resultados === null ? (
        // Mientras no haya resultados (estamos haciendo el cuestionario)
        <div className="w-full max-w-2xl bg-white p-6 rounded-2xl shadow-lg border border-blue-100">
          {/* Componente que muestra el progreso (p. ej. 'Paso 3 de 12') */}
          <ProgressSteps paso={paso} total={total} />
          {/* Componente que muestra la pregunta actual y sus opciones.
              Le pasamos la pregunta y las opciones y una función onSelect
              que se ejecuta cuando el usuario elige una opción. */}
          <QuestionCard pregunta={preguntas[paso].pregunta} opciones={preguntas[paso].opciones} onSelect={handleSelect} />
        </div>
      ) : (
        // Si ya tenemos resultados (array), mostramos la lista de lugares filtrados
        <div className="w-full bg-white rounded-2xl shadow-lg border border-blue-100">
          <PlacesResults resultados={resultados} onReserve={handleGoItinerary} />
        </div>
      )}

      <p className="mt-10 text-gray-600 text-sm">✈️ Tu Mundo, Tu Salario, Tu Plan 🌍</p>
    </div>
  );    
  }