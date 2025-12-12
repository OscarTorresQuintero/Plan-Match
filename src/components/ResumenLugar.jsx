export default function ResumenLugar({ lugar }) {
  if (!lugar) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="col-span-2">
        <img 
          src={lugar.imagen} 
          alt={lugar.nombre} 
          className="w-full h-64 object-cover rounded-2xl shadow-lg hover:shadow-xl transition-all" 
        />
      </div>
      <div className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl border-l-4 border-blue-500 shadow-md">
        <h3 className="text-2xl font-black text-gray-900 mb-4">{lugar.nombre}</h3>
        
        <div className="space-y-4">
          <div>
            <p className="text-xs text-gray-600 font-bold uppercase">País</p>
            <p className="text-lg font-black text-gray-900">📍 {lugar.pais}</p>
          </div>

          {lugar.precioCOP && (
            <div className="bg-white rounded-lg p-3 border border-green-200">
              <p className="text-xs text-gray-600 font-bold uppercase">Presupuesto</p>
              <p className="text-2xl font-black text-green-600">${lugar.precioCOP.toLocaleString("es-CO")}</p>
            </div>
          )}

          {lugar.rating && (
            <div className="bg-white rounded-lg p-3 border border-yellow-200">
              <p className="text-xs text-gray-600 font-bold uppercase">Calificación</p>
              <p className="text-2xl font-black text-yellow-600">⭐ {lugar.rating}</p>
            </div>
          )}

          {lugar.categoria && (
            <div className="bg-white rounded-lg p-3">
              <p className="text-xs text-gray-600 font-bold uppercase">Categoría</p>
              <p className="text-lg font-bold text-purple-700 capitalize">🎯 {lugar.categoria}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
