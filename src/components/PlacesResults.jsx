import React, { useState } from "react";
import DetailModal from "./DetailModal.jsx";
import PlaceCard from "./PlaceCard.jsx";
import todosLosLugares from "../service/data.json";

const lugaresDefault = [
  {
    id: 1,
    nombre: "Playa Blanca",
    descripcion: "Una hermosa playa con agua cristalina y arena blanca.",
    imagen: "https://picsum.photos/400/250?random=1",
    pais: "Colombia",
    tipo: "Playa",
    precio: "Económico",
    precioCOP: 200000,
    categoria: "playa",
    tipoActividad: "relajación",
    rating: 4.8
  },
  {
    id: 2,
    nombre: "Santorini",
    descripcion: "Isla griega famosa por sus casas blancas y fondos azules.",
    imagen: "https://picsum.photos/400/250?random=2",
    pais: "Grecia",
    tipo: "Romántico",
    precio: "Alto",
    precioCOP: 1500000,
    categoria: "romántico",
    tipoActividad: "romance",
    rating: 4.9
  },
  {
    id: 3,
    nombre: "Tokyo",
    descripcion: "Una ciudad moderna llena de tecnología y cultura.",
    imagen: "https://picsum.photos/400/250?random=3",
    pais: "Japón",
    tipo: "Urbano",
    precio: "Moderado",
    precioCOP: 900000,
    categoria: "ciudad",
    tipoActividad: "aventura",
    rating: 4.7
  }
];

export default function PlacesResults({ resultados = lugaresDefault, onReserve }) {
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [hoveredPlace, setHoveredPlace] = useState(null);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAllPlaces, setShowAllPlaces] = useState(false);
  const [resultadosOriginales] = useState(resultados); // Guardar los resultados del filtro original

  // Auto-advance carousel for hovered place
  React.useEffect(() => {
    if (!hoveredPlace) return;
    const id = setInterval(() => {
      setCarouselIndex((i) => (i + 1) % 4);
    }, 2500);
    return () => clearInterval(id);
  }, [hoveredPlace]);

  // Determinar qué conjunto de lugares usar
  const lugaresBase = showAllPlaces 
    ? todosLosLugares 
    : (Array.isArray(resultados) && resultados.length > 0 ? resultados : lugaresDefault);

  // Filtrar lugares según búsqueda
  const lugaresFiltrados = lugaresBase.filter((lugar) => {
    if (!searchTerm.trim()) return true;
    const busqueda = searchTerm.toLowerCase();
    return (
      lugar.nombre?.toLowerCase().includes(busqueda) ||
      lugar.pais?.toLowerCase().includes(busqueda) ||
      lugar.descripcion?.toLowerCase().includes(busqueda) ||
      lugar.categoria?.toLowerCase().includes(busqueda) ||
      lugar.tipoActividad?.toLowerCase().includes(busqueda)
    );
  });

  // Obtener el lugar principal recomendado (el primero o mejor rating)
  const lugarPrincipal = lugaresFiltrados[0];

  // Obtener lugares similares recomendados (todos menos el primero, ordenados por similitud primero, luego rating)
  const lugaresRecomendados = lugaresFiltrados
    .slice(1)
    .sort((a, b) => {
      // Ordenar primero por similitud (si existe), luego por rating
      if (typeof b.similitud === "number" && typeof a.similitud === "number") {
        return b.similitud - a.similitud;
      }
      return (b.rating || 0) - (a.rating || 0);
    });

  // Calcular estadísticas
  const similitudPromedio = lugaresFiltrados.length > 0
    ? (() => {
        const withNum = lugaresFiltrados.filter((l) => typeof l.similitud === "number");
        if (withNum.length === 0) return 0;
        const total = withNum.reduce((sum, l) => sum + l.similitud, 0);
        return Math.round(total / withNum.length);
      })()
    : 0;

  const handleOpenDetails = (lugar) => {
    setSelectedPlace(lugar);
  };

  const handleCloseDetails = () => {
    setSelectedPlace(null);
  };

  const handleReserve = (lugar) => {
    // cerrar modal y delegar la navegación si se proporcionó
    setSelectedPlace(null);
    if (typeof onReserve === "function") onReserve(lugar);
    else console.log("Reservar:", lugar);
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-green-50 px-4 md:px-8 py-12">
      {/* HEADER CON TÍTULO Y ESTADÍSTICAS */}
      <div className="max-w-7xl mx-auto mb-12 animate-fadeIn">
        <div className="mb-8">
          <h1 className="text-5xl md:text-6xl font-black mb-4 text-gray-900 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            {showAllPlaces ? '🌎 Todos los Destinos' : '✈️ Tus Destinos Ideales'}
          </h1>
          <p className="text-gray-600 text-lg md:text-xl">
            {showAllPlaces 
              ? 'Explora toda nuestra colección de destinos increíbles alrededor del mundo'
              : 'Hemos encontrado los mejores lugares que coinciden con tus preferencias'}
          </p>
        </div>

        {/* ESTADÍSTICAS DE RESULTADOS */}
        {lugaresFiltrados.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-2xl shadow-md p-5 border-l-4 border-blue-500 hover:shadow-lg transition-all duration-300 transform hover:scale-105">
              <div className="text-3xl font-black text-blue-600">{lugaresFiltrados.length}</div>
              <div className="text-sm text-gray-600 font-semibold">Destinos {searchTerm ? 'encontrados' : 'disponibles'}</div>
            </div>
            <div className="bg-white rounded-2xl shadow-md p-5 border-l-4 border-green-500 hover:shadow-lg transition-all duration-300 transform hover:scale-105">
              <div className="text-3xl font-black text-green-600">{similitudPromedio}%</div>
              <div className="text-sm text-gray-600 font-semibold">Compatibilidad promedio</div>
            </div>
            {lugarPrincipal?.rating && (
              <div className="bg-white rounded-2xl shadow-md p-5 border-l-4 border-yellow-500 hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                <div className="text-3xl font-black text-yellow-600">⭐ {lugarPrincipal.rating}</div>
                <div className="text-sm text-gray-600 font-semibold">Rating principal</div>
              </div>
            )}
            <div className="bg-white rounded-2xl shadow-md p-5 border-l-4 border-purple-500 hover:shadow-lg transition-all duration-300 transform hover:scale-105">
              <div className="text-3xl font-black text-purple-600">{lugaresRecomendados.length}</div>
              <div className="text-sm text-gray-600 font-semibold">Alternativas similares</div>
            </div>
          </div>
        )}
      </div>

      {lugaresFiltrados.length === 0 ? (
        <div className="max-w-7xl mx-auto text-center py-16 bg-white rounded-xl shadow">
          <div className="text-5xl mb-4">
            {searchTerm ? '🔍' : '🌍'}
          </div>
          <p className="text-gray-700 text-xl font-semibold">
            {searchTerm 
              ? `No se encontraron destinos que coincidan con "${searchTerm}"`
              : 'No se encontraron destinos que coincidan con tus preferencias.'}
          </p>
          <p className="text-gray-500 mt-2">
            {searchTerm 
              ? 'Intenta con otros términos de búsqueda'
              : 'Intenta ajustar tus filtros y buscar de nuevo.'}
          </p>
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold transition-all transform hover:scale-105"
            >
              Limpiar búsqueda
            </button>
          )}
        </div>
      ) : (
        <div className="max-w-7xl mx-auto space-y-12">
          {/* SECCIÓN 1: LUGAR PRINCIPAL DESTACADO - Solo mostrar si NO están todos los lugares */}
          {lugarPrincipal && !showAllPlaces && (
            <section className="animate-slideUp">
              <div className="mb-6 flex items-center gap-3">
                <div className="w-2 h-8 bg-gradient-to-b from-yellow-400 to-orange-500 rounded-full"></div>
                <h2 className="text-3xl font-black text-gray-900">Tu mejor opción</h2>
              </div>

              <div 
                onClick={() => handleOpenDetails(lugarPrincipal)}
                className="group cursor-pointer bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.01]"
              >
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-0">
                  {/* Imagen principal */}
                  <div className="relative lg:col-span-2 h-64 lg:h-80 overflow-hidden bg-gradient-to-br from-gray-300 to-gray-400">
                    <img
                      src={lugarPrincipal.imagen}
                      alt={lugarPrincipal.nombre}
                      className="w-full h-full object-cover group-hover:scale-120 transition-transform duration-700"
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-500"></div>
                    
                    {/* Badge de rating */}
                    {lugarPrincipal.rating && (
                      <div className="absolute top-4 right-4 bg-white shadow-lg rounded-full px-4 py-2 font-bold text-lg z-10 transition-all duration-300 group-hover:scale-110">
                        ⭐ {lugarPrincipal.rating}
                      </div>
                    )}
                    {/* Badge de mejor opción */}
                    <div className="absolute top-4 left-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg animate-pulse">
                      🌟 MEJOR OPCIÓN
                    </div>
                  </div>

                  {/* Contenido información */}
                  <div className="lg:col-span-3 p-6 lg:p-8 flex flex-col justify-between">
                    <div>
                      <h3 className="text-3xl lg:text-4xl font-black text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                        {lugarPrincipal.nombre}
                      </h3>
                      
                      <p className="text-gray-700 text-base lg:text-lg mb-6 leading-relaxed">
                        {lugarPrincipal.descripcion}
                      </p>

                      {/* TAGS */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-700 px-3 py-1.5 rounded-full font-semibold text-sm hover:bg-blue-200 transition-colors">
                          📍 {lugarPrincipal.pais}
                        </span>
                        {lugarPrincipal.categoria && (
                          <span className="inline-flex items-center gap-1 bg-purple-100 text-purple-700 px-3 py-1.5 rounded-full font-semibold text-sm capitalize hover:bg-purple-200 transition-colors">
                            🎯 {lugarPrincipal.categoria}
                          </span>
                        )}
                        {lugarPrincipal.tipoActividad && (
                          <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1.5 rounded-full font-semibold text-sm capitalize hover:bg-green-200 transition-colors">
                            ⚡ {lugarPrincipal.tipoActividad}
                          </span>
                        )}
                      </div>

                      {/* PRECIO */}
                      {lugarPrincipal.precioCOP && (
                        <div className="mb-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border-l-4 border-green-500">
                          <div className="text-sm text-gray-600 font-bold mb-1">Presupuesto estimado</div>
                          <div className="text-2xl lg:text-3xl font-black text-green-600">
                            ${lugarPrincipal.precioCOP.toLocaleString("es-CO")} COP
                          </div>
                        </div>
                      )}

                      {/* BARRA DE COMPATIBILIDAD */}
                      {typeof lugarPrincipal.similitud === "number" && (
                        <div className="mb-6">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-semibold text-gray-700">Compatibilidad con tus preferencias</span>
                            <span className="text-sm font-black text-blue-600 text-lg">{lugarPrincipal.similitud}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-5 overflow-hidden shadow-sm">
                            <div
                              className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 h-5 rounded-full transition-all duration-700 shadow-lg"
                              style={{ width: `${lugarPrincipal.similitud}%` }}
                            ></div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* BOTÓN */}
                    <button
                      onClick={() => handleOpenDetails(lugarPrincipal)}
                      className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 rounded-xl font-bold text-lg transition-all duration-300 transform hover:translate-y-[-3px] shadow-lg hover:shadow-xl"
                    >
                      Explorar detalles completos →
                    </button>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* SECCIÓN DE BÚSQUEDA - Después del lugar principal */}
          <section className="animate-slideUp">
            <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 rounded-3xl p-8 md:p-12 shadow-2xl text-white text-center">
              <div className="mb-6">
                <h2 className="text-3xl md:text-4xl font-black mb-3">
                  {showAllPlaces ? '🌎 Explorando todos los destinos' : '🔍 ¿Ninguno te convenció?'}
                </h2>
                <p className="text-lg md:text-xl opacity-90">
                  {showAllPlaces 
                    ? `Mostrando ${todosLosLugares.length} destinos disponibles en total`
                    : 'Busca entre todos nuestros destinos disponibles'}
                </p>
              </div>

              {/* Barra de búsqueda */}
              <div className="max-w-2xl mx-auto mb-6">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="🌍 Busca por lugar, país, categoría o actividad..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-6 py-4 rounded-2xl text-gray-900 text-lg font-semibold placeholder-gray-500 shadow-xl focus:ring-4 focus:ring-white/50 focus:outline-none transition-all"
                  />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm("")}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-full w-8 h-8 flex items-center justify-center font-bold transition-all"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>

              {/* Botones de acción */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                {!showAllPlaces ? (
                  <button
                    onClick={() => {
                      setSearchTerm("");
                      setShowAllPlaces(true);
                    }}
                    className="bg-white text-purple-600 px-8 py-4 rounded-2xl font-black text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 transform"
                  >
                    🌎 Mostrar todos los países disponibles ({todosLosLugares.length})
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setSearchTerm("");
                      setShowAllPlaces(false);
                    }}
                    className="bg-white text-purple-600 px-8 py-4 rounded-2xl font-black text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 transform"
                  >
                    ← Volver a resultados del filtro ({resultadosOriginales.length})
                  </button>
                )}
              </div>

              {/* Información de resultados */}
              {searchTerm && (
                <div className="mt-6 bg-white/20 backdrop-blur-sm rounded-xl px-6 py-3 inline-block">
                  <p className="font-bold">
                    {lugaresFiltrados.length > 0 
                      ? `✅ ${lugaresFiltrados.length} ${lugaresFiltrados.length === 1 ? 'destino encontrado' : 'destinos encontrados'}`
                      : '❌ No se encontraron destinos con esa búsqueda'}
                  </p>
                </div>
              )}
            </div>
          </section>

          {/* SECCIÓN 2: LUGARES SIMILARES Y ALTERNATIVAS */}
          {(showAllPlaces ? lugaresFiltrados : lugaresRecomendados).length > 0 && (
            <section className="animate-slideUp">
              <div className="mb-6 flex items-center gap-3">
                <div className="w-2 h-8 bg-gradient-to-b from-blue-400 to-cyan-500 rounded-full"></div>
                <h2 className="text-3xl font-black text-gray-900">
                  {showAllPlaces 
                    ? 'Todos los destinos disponibles'
                    : 'Lugares similares que también te pueden interesar'}
                </h2>
              </div>

              <div className="flex gap-8 flex-col xl:flex-row">
                {/* GRID DE LUGARES */}
                <div className="flex-1">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {(showAllPlaces ? lugaresFiltrados : lugaresRecomendados).map((lugar, idx) => (
                      <div key={lugar.id} className={`animate-slideUp`} style={{ animationDelay: `${idx * 100}ms` }}>
                        <PlaceCard
                          lugar={lugar}
                          onOpenDetails={handleOpenDetails}
                          onHover={(p) => setHoveredPlace(p)}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* PANEL DE VISTA PREVIA A LA DERECHA - MEJORADO */}
                <div className="hidden xl:flex flex-col w-96 bg-white rounded-3xl shadow-xl p-6 sticky top-24 h-fit border border-gray-100 hover:shadow-2xl transition-all">
                  <div className="mb-4">
                    <h3 className="text-xl font-black text-gray-900 mb-1">📸 Vista previa</h3>
                    <p className="text-sm text-gray-500">Pasa el cursor sobre una tarjeta para ver más imágenes</p>
                  </div>

                  {!hoveredPlace ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <div className="text-6xl mb-3">👆</div>
                      <p className="text-gray-500 text-sm">Selecciona un lugar para ver más imágenes</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {/* Información del lugar */}
                      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-xl border-l-4 border-blue-500">
                        <p className="font-black text-gray-900 text-lg">{hoveredPlace.nombre}</p>
                        <p className="text-sm text-gray-600 font-semibold">📍 {hoveredPlace.pais}</p>
                      </div>

                      {/* Carrusel de imágenes mejorado */}
                      {(() => {
                        const imgs = [
                          hoveredPlace.imagen,
                          `https://source.unsplash.com/400x300/?${encodeURIComponent(hoveredPlace.nombre)}`,
                          `https://source.unsplash.com/400x300/?${encodeURIComponent(hoveredPlace.pais)}`,
                          `https://source.unsplash.com/400x300/?${encodeURIComponent(hoveredPlace.categoria || hoveredPlace.tipoActividad)}`,
                        ];

                        return (
                          <div>
                            {/* Imagen principal */}
                            <div className="relative overflow-hidden rounded-lg shadow-md mb-3 h-48 bg-gradient-to-br from-gray-300 to-gray-400">
                              <img
                                src={imgs[carouselIndex]}
                                alt={`${hoveredPlace.nombre} - ${carouselIndex + 1}`}
                                className="w-full h-full object-cover transition-opacity duration-500 hover:scale-105"
                              />
                              {/* Indicador de imagen */}
                              <div className="absolute bottom-3 right-3 bg-black bg-opacity-70 text-white px-3 py-1 rounded-full text-xs font-bold">
                                {carouselIndex + 1}/{imgs.length}
                              </div>
                            </div>

                            {/* Botones de navegación */}
                            <div className="flex gap-3 mb-4">
                              <button
                                onClick={() => setCarouselIndex((i) => (i - 1 + imgs.length) % imgs.length)}
                                className="flex-1 py-2.5 px-3 bg-gray-100 hover:bg-gray-200 rounded-lg font-bold text-sm transition-all transform hover:scale-105"
                              >
                                ↑ Anterior
                              </button>
                              <button
                                onClick={() => setCarouselIndex((i) => (i + 1) % imgs.length)}
                                className="flex-1 py-2.5 px-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold text-sm transition-all transform hover:scale-105"
                              >
                                Siguiente ↓
                              </button>
                            </div>

                            {/* Información adicional */}
                            {hoveredPlace.similitud !== undefined && (
                              <div className="mb-3 p-3 bg-green-50 rounded-lg border-l-4 border-green-500">
                                <p className="text-xs text-gray-600 font-bold mb-1">Compatibilidad</p>
                                <p className="text-2xl font-black text-green-600">{hoveredPlace.similitud}%</p>
                              </div>
                            )}

                            {hoveredPlace.rating && (
                              <div className="mb-4 p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
                                <p className="text-xs text-gray-600 font-bold mb-1">Calificación</p>
                                <p className="text-2xl font-black text-yellow-600">⭐ {hoveredPlace.rating}</p>
                              </div>
                            )}
                          </div>
                        );
                      })()}

                      {/* Botón para abrir detalles */}
                      <button
                        onClick={() => handleOpenDetails(hoveredPlace)}
                        className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-2.5 rounded-lg font-bold text-sm transition-all transform hover:scale-105 shadow-md hover:shadow-lg"
                      >
                        Ver detalles →
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </section>
          )}
        </div>
      )}

      {/* Modal de detalles */}
      {selectedPlace && (
        <DetailModal lugar={selectedPlace} onClose={handleCloseDetails} onReserve={handleReserve} />
      )}
    </div>
  );
}
