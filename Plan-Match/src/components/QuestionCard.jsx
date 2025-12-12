export default function QuestionCard({ pregunta, opciones, onSelect }) {
  return (
    <div className="p-8 bg-white rounded-2xl shadow-lg border-2 border-blue-200">
      <div className="mb-6">
        <div className="inline-block p-3 bg-gradient-to-r from-blue-500 to-green-500 rounded-full mb-4">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-blue-700 mb-2">{pregunta}</h2>
        <div className="h-1 w-20 bg-gradient-to-r from-blue-500 via-yellow-400 to-green-500 rounded-full"></div>
      </div>

      <div className="flex flex-col gap-3">
        {opciones.map((op, i) => (
          <button
            key={i}
            className="p-4 bg-white border-2 border-yellow-300 rounded-xl hover:bg-yellow-50 hover:border-green-400 transition-colors duration-150 font-medium text-gray-700"
            onClick={() => onSelect(op)}
          >
            {op}
          </button>
        ))}
      </div>
    </div>
  );
}
