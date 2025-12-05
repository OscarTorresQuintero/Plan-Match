export default function ProgressSteps({ paso, total }) {
  const porcentaje = ((paso + 1) / total) * 100;

  return (
    <div className="w-full bg-gray-300 h-3 rounded-xl overflow-hidden mb-4">
      <div
        className="bg-blue-500 h-full transition-all duration-300"
        style={{ width: `${porcentaje}%` }}
      ></div>
    </div>
  );
}
