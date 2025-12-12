import { useState } from "react";
import FormularioActividad from "./FormularioActividad.jsx";
import SelectorDia from "./SelectorDia.jsx";
import CardActividad from "./CardActividad.jsx";
import ResumenLugar from "./ResumenLugar.jsx";
import ResumenActividades from "./ResumenActividades.jsx";
import BotonConfirmar from "./BotonConfirmar.jsx";
import HeaderItinerario from "./HeaderItinerario.jsx";
import BotonAgregarDia from "./BotonAgregarDia.jsx";
import ContadorEstadisticas from "./ContadorEstadisticas.jsx";
import ResumenConfirmacion from "./ResumenConfirmacion.jsx";
import PresupuestoTotal from "./PresupuestoTotal.jsx";

export default function Itinerary({ lugar, onBack }) {
  const [dia, setDia] = useState(1);
  const [actividades, setActividades] = useState({ 1: [] });

  if (!lugar) return null;

  // Agregar una actividad al día actual
  function agregar(nombre, hora) {
    setActividades(prev => ({
      ...prev,
      [dia]: [...(prev[dia] || []), { nombre, hora }]
    }));
  }

  // Eliminar una actividad del día actual
  function eliminar(i) {
    setActividades(prev => ({
      ...prev,
      [dia]: prev[dia].filter((_, idx) => idx !== i)
    }));
  }

  // Agregar un nuevo día
  function agregarDia() {
    const nuevoDia = Math.max(...Object.keys(actividades).map(Number)) + 1;
    setActividades(prev => ({
      ...prev,
      [nuevoDia]: []
    }));
    setDia(nuevoDia);
  }

  // Eliminar un día específico
  function eliminarDia(diaAEliminar) {
    const diasRestantes = Object.keys(actividades)
      .map(Number)
      .filter(d => d !== diaAEliminar)
      .sort((a, b) => a - b);

    if (diasRestantes.length === 0) {
      alert("⚠️ No puedes eliminar todos los días. Debe haber al menos un día.");
      return;
    }

    const nuevasActividades = { ...actividades };
    delete nuevasActividades[diaAEliminar];
    setActividades(nuevasActividades);

    // Si el día eliminado era el actual, cambiar al primer día restante
    if (dia === diaAEliminar) {
      setDia(diasRestantes[0]);
    }
  }

  // Confirmar itinerario
  function confirmar() {
    console.log("Itinerario confirmado:", { lugar: lugar.nombre, actividades });
    alert(`¡Itinerario confirmado para ${lugar.nombre}! 🎉`);
    onBack();
  }

  const dias = Object.keys(actividades).map(Number).sort((a, b) => a - b);

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-green-50 px-4 md:px-8 py-12">
      <div className="max-w-6xl mx-auto">
        {/* HEADER */}
        <HeaderItinerario lugar={lugar} onBack={onBack} />

        {/* RESUMEN DEL LUGAR */}
        <ResumenLugar lugar={lugar} />

        {/* RESUMEN DE ACTIVIDADES */}
        <ResumenActividades actividades={actividades} />

        {/* SECCIÓN PRINCIPAL: SELECTOR DE DÍAS Y EDITOR DE ACTIVIDADES */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* PANEL IZQUIERDO: SELECTOR DE DÍAS */}
          <div className="lg:col-span-1 bg-white rounded-2xl p-6 shadow-lg border border-gray-100 h-fit">
            <h3 className="text-xl font-black text-gray-900 mb-4">📆 Días</h3>
            
            <SelectorDia dia={dia} setDia={setDia} dias={dias} />
            
            <BotonAgregarDia onClick={agregarDia} />

            <div className="space-y-2">
              <p className="text-sm font-bold text-gray-700">Resumen:</p>
              {dias.map(d => (
                <div 
                  key={d} 
                  className={`p-3 rounded-lg border-2 transition-all flex justify-between items-center ${
                    d === dia 
                      ? "bg-blue-100 border-blue-500" 
                      : "bg-gray-50 border-gray-200"
                  }`}
                >
                  <div>
                    <p className="font-bold text-gray-900">Día {d}</p>
                    <p className="text-xs text-gray-600">{actividades[d]?.length || 0} actividades</p>
                  </div>
                  {dias.length > 1 && (
                    <button
                      onClick={() => eliminarDia(d)}
                      className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-xs font-bold transition-all transform hover:scale-110"
                      title="Eliminar este día"
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* PANEL DERECHO: EDITOR DE ACTIVIDADES */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <h3 className="text-2xl font-black text-gray-900 mb-2">Día {dia}</h3>
            <p className="text-gray-600 mb-6 font-semibold">Añade y organiza tus actividades</p>

            {/* Formulario para agregar actividades */}
            <FormularioActividad agregar={agregar} />

            {/* Lista de actividades */}
            <div className="mt-6 mb-6">
              <h4 className="text-lg font-bold text-gray-900 mb-4">
                Actividades ({actividades[dia]?.length || 0})
              </h4>

              {actividades[dia]?.length === 0 ? (
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-8 rounded-xl border-2 border-dashed border-blue-300 text-center">
                  <p className="text-gray-600 text-lg">✨ No hay actividades aún</p>
                  <p className="text-gray-500 text-sm">¡Añade tu primera actividad para este día!</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {actividades[dia].map((actividad, index) => (
                    <CardActividad
                      key={index}
                      actividad={actividad}
                      index={index}
                      eliminar={eliminar}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* CONTADORES Y ESTADÍSTICAS */}
        <ContadorEstadisticas actividades={actividades} dias={dias} />

        {/* PRESUPUESTO TOTAL */}
        <PresupuestoTotal lugar={lugar} actividades={actividades} dias={dias} />

        {/* RESUMEN ANTES DE CONFIRMAR */}
        <ResumenConfirmacion lugar={lugar} actividades={actividades} />

        {/* BOTONES DE ACCIÓN */}
        <div className="mt-8">
          <BotonConfirmar onConfirmar={confirmar} onCancelar={onBack} />
        </div>
      </div>
    </div>
  );
}
