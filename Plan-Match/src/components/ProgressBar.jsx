export default function ProgressSteps({ paso, total }) {
  const porcentaje = ((paso + 1) / total) * 100;

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-3">
        <span className="text-sm font-semibold text-blue-700">Paso {paso + 1} de {total}</span>
        <span className="text-sm font-bold text-green-600">{Math.round(porcentaje)}%</span>
      </div>
      <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-blue-500 via-yellow-400 to-green-500 transition-all duration-200 ease-out"
          style={{ width: `${porcentaje}%` }}
        />
      </div>
      <div className="flex justify-between mt-3">
        {Array.from({ length: total }).map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-colors duration-150 ${
              index <= paso ? 'bg-gradient-to-r from-blue-500 to-green-500' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
