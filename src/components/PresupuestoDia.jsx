export default function PresupuestoDia({ lugar, actividades, dia }) {
  const precioBase = lugar.precioCOP || 0;
  const numDias = Object.keys(actividades).length;
  const presupuestoDiario = Math.round(precioBase / numDias);
  const actividadesDia = actividades[dia]?.length || 0;
  const estimadoActividades = actividadesDia * 50000; // 50k por actividad (promedio)
  const totalEstimado = presupuestoDiario + estimadoActividades;

  return (
    <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-5 border-l-4 border-green-500 shadow-md">
      <h4 className="text-lg font-bold text-gray-900 mb-4">💰 Presupuesto - Día {dia}</h4>
      
      <div className="space-y-3">
        <div className="bg-white rounded-lg p-3 border-l-4 border-blue-500">
          <p className="text-xs text-gray-600 font-bold uppercase">Alojamiento (diario)</p>
          <p className="text-2xl font-black text-blue-600">${presupuestoDiario.toLocaleString("es-CO")}</p>
          <p className="text-xs text-gray-500 mt-1">({precioBase.toLocaleString("es-CO")} ÷ {numDias} días)</p>
        </div>

        <div className="bg-white rounded-lg p-3 border-l-4 border-purple-500">
          <p className="text-xs text-gray-600 font-bold uppercase">Actividades ({actividadesDia})</p>
          <p className="text-2xl font-black text-purple-600">${estimadoActividades.toLocaleString("es-CO")}</p>
          <p className="text-xs text-gray-500 mt-1">~$50k por actividad</p>
        </div>

        <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-lg p-4 border-2 border-green-500">
          <p className="text-xs text-gray-600 font-bold uppercase">Total estimado día {dia}</p>
          <p className="text-3xl font-black text-green-700">${totalEstimado.toLocaleString("es-CO")}</p>
        </div>
      </div>

      <div className="mt-4 bg-blue-50 rounded-lg p-3 border border-blue-200">
        <p className="text-xs text-gray-600 font-bold mb-1">💡 Presupuesto total del viaje:</p>
        <p className="text-xl font-black text-blue-700">
          ${(precioBase + (Object.values(actividades).reduce((sum, act) => sum + act.length, 0) * 50000)).toLocaleString("es-CO")}
        </p>
      </div>
    </div>
  );
}
