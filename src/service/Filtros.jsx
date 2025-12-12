import lugares from "./data.json";

/**
 * Calcula una puntuación de similitud entre dos lugares (0-100)
 * Basado en múltiples criterios ponderados
 */
function calcularSimilaridad(respuestasUsuario, lugar) {
  let puntuacion = 0;
  let criteriosEvaluados = 0;

  // 1. TIPO DE ACTIVIDAD (25 puntos) - Muy importante
  if (respuestasUsuario.tipoActividad && lugar.tipoActividad) {
    const tiposNormalizados = normalizarTipoActividad(respuestasUsuario.tipoActividad);
    
    if (tiposNormalizados.includes(lugar.tipoActividad)) {
      puntuacion += 25;
    } else if (
      (respuestasUsuario.tipoActividad.toLowerCase().includes("aventura") && lugar.tipoActividad === "naturaleza") ||
      (respuestasUsuario.tipoActividad.toLowerCase() === "naturaleza" && lugar.tipoActividad === "aventura") ||
      (respuestasUsuario.tipoActividad.toLowerCase().includes("cultura") && lugar.tipoActividad === "urbano") ||
      (respuestasUsuario.tipoActividad.toLowerCase() === "urbano" && lugar.tipoActividad === "cultural")
    ) {
      puntuacion += 18;
    }
    criteriosEvaluados += 25;
  }

  // 2. CATEGORÍA (20 puntos) - Muy importante
  if (respuestasUsuario.categoria && lugar.categoria) {
    if (respuestasUsuario.categoria === lugar.categoria) {
      puntuacion += 20;
    } else if (
      (respuestasUsuario.categoria === "histórico" && lugar.categoria === "arquitectura") ||
      (respuestasUsuario.categoria === "arquitectura" && lugar.categoria === "histórico") ||
      (respuestasUsuario.categoria === "playa" && lugar.categoria === "parque") ||
      (respuestasUsuario.categoria === "parque" && lugar.categoria === "playa")
    ) {
      puntuacion += 12;
    }
    criteriosEvaluados += 20;
  }

  // 3. CLIMA (15 puntos)
  if (respuestasUsuario.clima && lugar.clima) {
    if (respuestasUsuario.clima === lugar.clima) {
      puntuacion += 15;
    } else if (respuestasUsuario.clima === "variable") {
      puntuacion += 8; // El clima variable acepta cualquier cosa
    }
    criteriosEvaluados += 15;
  }

  // 4. PRESUPUESTO (15 puntos) - Importante
  if (respuestasUsuario.presupuesto && lugar.presupuesto) {
    if (respuestasUsuario.presupuesto === lugar.presupuesto) {
      puntuacion += 15;
    } else if (
      (respuestasUsuario.presupuesto === "bajo" && lugar.presupuesto === "medio") ||
      (respuestasUsuario.presupuesto === "medio" && lugar.presupuesto === "bajo") ||
      (respuestasUsuario.presupuesto === "medio" && lugar.presupuesto === "alto") ||
      (respuestasUsuario.presupuesto === "alto" && lugar.presupuesto === "medio")
    ) {
      puntuacion += 8;
    }
    criteriosEvaluados += 15;
  }

  // 5. TIEMPO DE VISITA (12 puntos)
  if (respuestasUsuario.tiempoVisita && lugar.tiempoVisita) {
    if (respuestasUsuario.tiempoVisita === lugar.tiempoVisita) {
      puntuacion += 12;
    }
    criteriosEvaluados += 12;
  }

  // 6. ACCESIBILIDAD (8 puntos)
  if (respuestasUsuario.accesibilidad && lugar.accesibilidad) {
    if (respuestasUsuario.accesibilidad === lugar.accesibilidad) {
      puntuacion += 8;
    } else if (respuestasUsuario.accesibilidad === "media") {
      puntuacion += 4; // Accesibilidad media es flexible
    }
    criteriosEvaluados += 8;
  }

  // 7. RATING (5 puntos)
  if (respuestasUsuario.rating && lugar.rating) {
    const ratingNum = parseInt(respuestasUsuario.rating);
    if (lugar.rating >= ratingNum) {
      puntuacion += 5;
    }
    criteriosEvaluados += 5;
  }

  // 8. PRECIO SIMILAR (5 puntos)
  if (respuestasUsuario.precioCOP && lugar.precioCOP) {
    const precioNum = parsePrecio(respuestasUsuario.precioCOP);
    const diferencia = Math.abs(precioNum - lugar.precioCOP);
    const maxPrecio = Math.max(precioNum, lugar.precioCOP);
    const porcentajeDiferencia = (diferencia / maxPrecio) * 100;

    if (porcentajeDiferencia < 30) {
      puntuacion += 5;
    } else if (porcentajeDiferencia < 50) {
      puntuacion += 2;
    }
    criteriosEvaluados += 5;
  }

  // Normalizar puntuación
  if (criteriosEvaluados === 0) return 0;
  return Math.round((puntuacion / criteriosEvaluados) * 100);
}

/**
 * Normaliza el tipoActividad del usuario a los valores de la base de datos
 */
function normalizarTipoActividad(userInput) {
  if (!userInput) return null;
  
  const input = userInput.toLowerCase();
  
  // Mapear opciones del usuario a valores de la BD
  if (input.includes("relax") || input === "relajación") {
    return ["relajación", "playa"];
  } else if (input.includes("aventura") || input.includes("exploración")) {
    return ["aventura", "naturaleza"];
  } else if (input.includes("cultura") || input === "cultural") {
    return ["cultural", "urbano"];
  } else if (input === "urbano") {
    return ["urbano"];
  } else if (input === "naturaleza") {
    return ["naturaleza"];
  }
  
  return [userInput];
}

/**
 * Parsea distintas formas de escribir el precio que puede devolver el cuestionario.
 * Acepta formatos como: "100k COP", "1.2M", "1200000", "300k"
 */
function parsePrecio(input) {
  if (!input && input !== 0) return null;
  if (typeof input === "number") return input;
  const str = String(input).trim();
  // Si ya es un número largo, extraer dígitos
  // Normalizar separadores comunes (coma/espacio/punto)
  // Nota: evitamos crear variables sin usar.

  // Buscar sufijos k o m
  const lower = str.toLowerCase();
  const kMatch = lower.match(/([0-9]+(?:\.[0-9]+)?)k/);
  const mMatch = lower.match(/([0-9]+(?:\.[0-9]+)?)m/);

  if (kMatch) {
    return Math.round(parseFloat(kMatch[1]) * 1000);
  }
  if (mMatch) {
    return Math.round(parseFloat(mMatch[1]) * 1000000);
  }

  // Si termina con COP y tiene 'k' sin espacio (ej: 1200k), ya cubierto.
  // Si la cadena contiene solo dígitos, devolver como entero
  const digitsOnly = str.replace(/[^0-9]/g, "");
  if (digitsOnly.length >= 1) {
    // Si el número parece pequeño (<=4 dígitos) y el input original contenía 'k' escrito como texto (ej: '100k'), esa ruta ya se cubrió.
    return parseInt(digitsOnly, 10);
  }

  return null;
}

/**
 * Filtro inteligente que busca lugares que coincidan con las preferencias del usuario
 */
export function filtrarLugares(respuestas) {
  // Si no hay respuestas, retornar todos los lugares
  if (!respuestas || Object.keys(respuestas).length === 0) {
    return lugares;
  }

  // Paso 1: Filtros obligatorios (requisitos mínimos)
  const lugaresBasicos = lugares.filter((lugar) => {
    // FILTRO PRECIO MÁXIMO
    if (respuestas.precioCOP) {
      const precioNum = parsePrecio(respuestas.precioCOP);
      // Si parsePrecio no puede determinar el número, no aplicar filtro de precio
      if (precioNum && lugar.precioCOP > precioNum) return false;
    }

    // FILTRO DISTANCIA (IMPORTANTE PARA MOSTRAR TODO EL MUNDO)
    if (respuestas.distancia) {
      const distNum = parseInt(respuestas.distancia.replace(/[^0-9]/g, ""));
      if (lugar.distancia && lugar.distancia > distNum) return false;
    }

    // FILTRO RATING MÍNIMO
    if (respuestas.rating) {
      const ratingNum = parseInt(respuestas.rating);
      if (lugar.rating && lugar.rating < ratingNum) return false;
    }

    return true;
  });

  // Si no hay resultados con filtros obligatorios, relajamos SOLO el filtro de precio
  // pero mantenemos siempre el filtro de distancia y rating (el usuario pidió km)
  let lugaresBase = [];
  if (lugaresBasicos.length > 0) {
    lugaresBase = lugaresBasicos;
  } else {
    // Relajar precio: aplicar únicamente distancia y rating
    const distNumRelax = respuestas.distancia
      ? parseInt(respuestas.distancia.replace(/[^0-9]/g, ""))
      : null;
    const ratingNumRelax = respuestas.rating ? parseInt(respuestas.rating) : null;

    const lugaresRelax = lugares.filter((lugar) => {
      if (distNumRelax && lugar.distancia && lugar.distancia > distNumRelax) return false;
      if (ratingNumRelax && lugar.rating && lugar.rating < ratingNumRelax) return false;
      return true;
    });

    // Si encontramos lugares respetando distancia/rating, los usamos; si no, mostramos todos
    lugaresBase = lugaresRelax.length > 0 ? lugaresRelax : lugares;
  }

  console.log("📍 Lugares después de filtros obligatorios:", lugaresBase.length);
  console.log("📍 Distancia máxima seleccionada:", respuestas.distancia);
  console.log("📍 Presupuesto máximo seleccionado:", respuestas.precioCOP);

  // Paso 2: Crear objeto con preferencias del usuario
  const preferenciasUsuario = {
    tipoActividad: respuestas.tipoActividad,
    categoria: respuestas.categoria,
    clima: respuestas.clima,
    presupuesto: respuestas.presupuesto,
    tiempoVisita: respuestas.tiempoVisita,
    accesibilidad: respuestas.accesibilidad,
    rating: respuestas.rating,
    precioCOP: respuestas.precioCOP,
  };

  // Paso 3: Calcular similitud para cada lugar
  const lugaresConSimilaridad = lugaresBase
    .map((lugar) => ({
      ...lugar,
      similitud: calcularSimilaridad(preferenciasUsuario, lugar),
    }))
    .sort((a, b) => b.similitud - a.similitud);

  // Paso 4: Incluir como relevantes los lugares con similitud >= 25 o que estén dentro
  // de la distancia máxima seleccionada (priorizamos distancia cuando el usuario la pide)
  const distNum = respuestas.distancia
    ? parseInt(respuestas.distancia.replace(/[^0-9]/g, ""))
    : null;

  const lugaresRelevantes = lugaresConSimilaridad.filter((lugar) => {
    if (lugar.similitud >= 25) return true; // umbral ligeramente más permisivo
    if (distNum && lugar.distancia && lugar.distancia <= distNum) return true; // incluir por distancia
    return false;
  });

  console.log("✅ Lugares filtrados por similitud/distancia:", lugaresRelevantes.length);
  console.log(
    "🌍 OPCIONES RECOMENDADAS (pais/dist):",
    lugaresRelevantes
      .slice(0, 30)
      .map((l) => `${l.nombre} (${l.pais}) - ${l.distancia || "n/a"}km - ${l.similitud}%`)
      .join(" | ")
  );

  // PASO 5: OPTIMIZAR ORDEN PARA MOSTRAR DIVERSIDAD INTERNACIONAL
  // Si el usuario selecciona distancia grande (>5000km), priorizar países fuera de Colombia
  let resultadosOrdenados = lugaresRelevantes;
  
  if (distNum && distNum > 5000) {
    // Separar por país
    const lugaresColombiaFuerza = resultadosOrdenados.filter(l => l.pais === "Colombia");
    const lugaresInternacionales = resultadosOrdenados.filter(l => l.pais !== "Colombia");
    
    // Si hay distancia grande, mostrar más internacionales
    // Tomar pocos de Colombia (máximo 3) y el resto internacionales (hasta 50)
    const colombiaLimitado = lugaresColombiaFuerza.slice(0, 3);
    const internacionalesSeleccionados = lugaresInternacionales.slice(0, 50);
    
    resultadosOrdenados = [...internacionalesSeleccionados, ...colombiaLimitado];
  }

  // Ordenar resultados por similitud (desc) y devolver hasta 50 para mostrar más opciones
  const resultados = resultadosOrdenados.sort((a, b) => b.similitud - a.similitud).slice(0, 50);

  console.log("📊 RESULTADOS FINALES:", resultados.length, "destinos encontrados");
  console.log("🌎 Distribución: Colombia: ", resultados.filter(r => r.pais === "Colombia").length, "| Internacionales: ", resultados.filter(r => r.pais !== "Colombia").length);
  return resultados;
}
