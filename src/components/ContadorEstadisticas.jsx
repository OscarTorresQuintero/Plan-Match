export default function ContadorEstadisticas({ actividades, dias }) {
  const totalActividades = Object.values(actividades).reduce((sum, act) => sum + act.length, 0);
  const promedioDia = dias.length > 0 ? Math.round(totalActividades / dias.length) : 0;

  return (
    <div className="grid grid-cols-3 gap-3 mb-6">
      <div className="bg-blue-100 p-4 rounded-lg border-l-4 border-blue-500 text-center">
        <p className="text-2xl font-black text-blue-600">{dias.length}</p>
        <p className="text-xs font-bold text-gray-700">Días</p>
      </div>
      <div className="bg-green-100 p-4 rounded-lg border-l-4 border-green-500 text-center">
        <p className="text-2xl font-black text-green-600">{totalActividades}</p>
        <p className="text-xs font-bold text-gray-700">Actividades</p>
      </div>
      <div className="bg-purple-100 p-4 rounded-lg border-l-4 border-purple-500 text-center">
        <p className="text-2xl font-black text-purple-600">{promedioDia}</p>
        <p className="text-xs font-bold text-gray-700">Prom/día</p>
      </div>
    </div>
  );
}
