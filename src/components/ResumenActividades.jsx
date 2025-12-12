export default function ResumenActividades({ actividades }) {
  const totalActividades = Object.values(actividades).reduce((sum, dia) => sum + dia.length, 0);
  const dias = Object.keys(actividades).sort((a, b) => Number(a) - Number(b));

  return (
    <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-6 border border-indigo-200 shadow-md mb-8">
      <h3 className="text-2xl font-black text-gray-900 mb-4">📊 Resumen de tu viaje</h3>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-lg p-4 border-l-4 border-blue-500 shadow-sm">
          <p className="text-xs text-gray-600 font-bold uppercase">Días totales</p>
          <p className="text-3xl font-black text-blue-600">{dias.length}</p>
        </div>
        
        <div className="bg-white rounded-lg p-4 border-l-4 border-green-500 shadow-sm">
          <p className="text-xs text-gray-600 font-bold uppercase">Actividades</p>
          <p className="text-3xl font-black text-green-600">{totalActividades}</p>
        </div>
        
        <div className="bg-white rounded-lg p-4 border-l-4 border-purple-500 shadow-sm">
          <p className="text-xs text-gray-600 font-bold uppercase">Promedio/día</p>
          <p className="text-3xl font-black text-purple-600">
            {dias.length > 0 ? Math.round(totalActividades / dias.length) : 0}
          </p>
        </div>
      </div>

      <div className="space-y-3">
        <p className="text-sm font-bold text-gray-700">Desglose por día:</p>
        {dias.map(dia => (
          <div key={dia} className="flex items-center justify-between bg-white p-3 rounded-lg border border-gray-200">
            <span className="font-bold text-gray-900">Día {dia}</span>
            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-bold">
              {actividades[dia]?.length || 0} actividades
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
