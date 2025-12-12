import { useState } from "react";

export default function NotasDia({ notas, setNotas, dia }) {
  const [editando, setEditando] = useState(false);
  const [nota, setNota] = useState(notas[dia] || "");

  const guardar = () => {
    setNotas(prev => ({
      ...prev,
      [dia]: nota
    }));
    setEditando(false);
  };

  return (
    <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-xl p-5 border-l-4 border-yellow-500 shadow-md">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-lg font-bold text-gray-900">📝 Notas del Día {dia}</h4>
        {!editando && (
          <button
            onClick={() => setEditando(true)}
            className="text-sm bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-lg font-bold transition-all"
          >
            Editar
          </button>
        )}
      </div>

      {editando ? (
        <div className="space-y-3">
          <textarea
            value={nota}
            onChange={e => setNota(e.target.value)}
            placeholder="Escriba observaciones, recomendaciones, clima esperado, etc..."
            className="w-full border-2 border-yellow-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 resize-none h-24"
          />
          <div className="flex gap-2">
            <button
              onClick={guardar}
              className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg font-bold transition-all"
            >
              ✅ Guardar
            </button>
            <button
              onClick={() => {
                setEditando(false);
                setNota(notas[dia] || "");
              }}
              className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-900 py-2 rounded-lg font-bold transition-all"
            >
              ✕ Cancelar
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg p-4 min-h-20">
          {nota ? (
            <p className="text-gray-700 text-sm leading-relaxed">{nota}</p>
          ) : (
            <p className="text-gray-400 italic text-sm">Sin notas. ¡Haz clic en Editar para agregar!</p>
          )}
        </div>
      )}
    </div>
  );
}
