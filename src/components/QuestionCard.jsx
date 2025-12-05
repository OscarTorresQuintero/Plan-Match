export default function QuestionCard({ pregunta, opciones, onSelect }) {
  return (
    <div className="p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-xl font-bold mb-4">{pregunta}</h2>

      <div className="flex flex-col gap-3">
        {opciones.map((op, i) => (
          <button
            key={i}
            className="p-3 border rounded-lg hover:bg-blue-100 transition"
            onClick={() => onSelect(op)}
          >
            {op}
          </button>
        ))}
      </div>
    </div>
  );
}
