
export default function SelectorDia({ dia, setDia, dias }) {
  return (
    <div className="flex gap-2 mb-6 flex-wrap">
      {dias.map(n => (
        <button
          key={n}
          onClick={() => setDia(n)}
          className={`px-4 py-2 rounded-lg font-bold transition-all transform hover:scale-105 ${
            dia === n 
              ? "bg-blue-600 text-white shadow-lg" 
              : "bg-gray-200 text-gray-900 hover:bg-gray-300"
          }`}
        >
          Día {n}
        </button>
      ))}
    </div>
  );
}
