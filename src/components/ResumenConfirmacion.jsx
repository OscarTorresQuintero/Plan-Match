export default function ResumenConfirmacion({ lugar, actividades }) {
  const dias = Object.keys(actividades).length;
  const totalActividades = Object.values(actividades).reduce((sum, act) => sum + act.length, 0);

  return (
    <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border-l-4 border-green-500 shadow-lg">
      <h4 className="text-xl font-black text-gray-900 mb-4">✅ Resumen de tu Itinerario</h4>
      
      <div className="space-y-2 text-gray-700">
        <div className="flex justify-between items-center">
          <span className="font-bold">Destino:</span>
          <span className="text-lg font-black text-green-600">{lugar.nombre}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-bold">Días:</span>
          <span className="text-lg font-black text-blue-600">{dias}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-bold">Actividades:</span>
          <span className="text-lg font-black text-purple-600">{totalActividades}</span>
        </div>
        {lugar.precioCOP && (
          <div className="flex justify-between items-center pt-2 border-t border-green-300">
            <span className="font-bold">Presupuesto:</span>
            <span className="text-lg font-black text-green-700">${lugar.precioCOP.toLocaleString("es-CO")}</span>
          </div>
        )}
      </div>
    </div>
  );
}
