export default function PresupuestoTotal({ lugar, actividades, dias }) {
  const precioLugar = lugar.precioCOP || 0;
  const totalActividades = Object.values(actividades).reduce((sum, act) => sum + act.length, 0);
  const estimadoActividades = totalActividades * 50000; // $50k por actividad
  const total = precioLugar + estimadoActividades;

  return (
    <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border-l-4 border-green-500 shadow-lg">
      <h4 className="text-xl font-black text-gray-900 mb-4">💰 Presupuesto Total</h4>
      
      <div className="space-y-3">
        <div className="bg-white rounded-lg p-3 border-l-4 border-blue-500">
          <p className="text-xs font-bold text-gray-600 uppercase">Alojamiento ({dias.length} días)</p>
          <p className="text-2xl font-black text-blue-600">${precioLugar.toLocaleString("es-CO")}</p>
        </div>

        <div className="bg-white rounded-lg p-3 border-l-4 border-purple-500">
          <p className="text-xs font-bold text-gray-600 uppercase">Actividades ({totalActividades})</p>
          <p className="text-2xl font-black text-purple-600">${estimadoActividades.toLocaleString("es-CO")}</p>
          <p className="text-xs text-gray-500 mt-1">~$50k por actividad</p>
        </div>

        <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-lg p-4 border-2 border-green-500">
          <p className="text-xs font-bold text-gray-700 uppercase">Total estimado</p>
          <p className="text-3xl font-black text-green-700">${total.toLocaleString("es-CO")}</p>
        </div>
      </div>
    </div>
  );
}
