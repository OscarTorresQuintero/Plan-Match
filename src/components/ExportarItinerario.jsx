export default function ExportarItinerario({ lugar, actividades }) {
  const exportarPDF = () => {
    // Crear contenido HTML para el PDF
    let contenido = `
      <h1>${lugar.nombre}</h1>
      <p><strong>País:</strong> ${lugar.pais}</p>
      <p><strong>Precio:</strong> $${lugar.precioCOP?.toLocaleString("es-CO") || "N/A"}</p>
      <hr>
      <h2>Itinerario Detallado</h2>
    `;

    Object.keys(actividades)
      .map(Number)
      .sort((a, b) => a - b)
      .forEach(dia => {
        contenido += `<h3>Día ${dia}</h3>`;
        const actividadesDia = actividades[dia];
        if (actividadesDia.length === 0) {
          contenido += `<p><em>Sin actividades planificadas</em></p>`;
        } else {
          contenido += `<ul>`;
          actividadesDia.forEach(act => {
            contenido += `<li><strong>${act.hora}</strong> - ${act.nombre}</li>`;
          });
          contenido += `</ul>`;
        }
      });

    // Crear ventana de impresión
    const ventana = window.open("", "_blank");
    ventana.document.write(`
      <html>
        <head>
          <title>Itinerario - ${lugar.nombre}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            h1 { color: #333; border-bottom: 3px solid #4f46e5; padding-bottom: 10px; }
            h2 { color: #555; margin-top: 20px; }
            h3 { color: #777; margin-top: 15px; }
            ul { margin: 10px 0; }
            li { margin: 8px 0; }
            hr { margin: 20px 0; }
          </style>
        </head>
        <body>
          ${contenido}
          <hr>
          <p><em>Generado desde Plan Match - ${new Date().toLocaleDateString("es-CO")}</em></p>
        </body>
      </html>
    `);
    ventana.document.close();
    ventana.print();
  };

  const exportarJSON = () => {
    const datos = {
      lugar: lugar.nombre,
      pais: lugar.pais,
      precio: lugar.precioCOP,
      fechaGeneracion: new Date().toISOString(),
      itinerario: actividades
    };

    const blob = new Blob([JSON.stringify(datos, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `itinerario-${lugar.nombre}-${new Date().getTime()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-5 border-l-4 border-indigo-500 shadow-md">
      <h4 className="text-lg font-bold text-gray-900 mb-4">📥 Exportar Itinerario</h4>
      
      <div className="space-y-2">
        <button
          onClick={exportarPDF}
          className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white py-3 rounded-lg font-bold transition-all transform hover:scale-105 shadow-md flex items-center justify-center gap-2"
        >
          📄 Descargar como PDF
        </button>
        
        <button
          onClick={exportarJSON}
          className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-3 rounded-lg font-bold transition-all transform hover:scale-105 shadow-md flex items-center justify-center gap-2"
        >
          💾 Descargar como JSON
        </button>
      </div>

      <p className="text-xs text-gray-600 mt-4 text-center">
        ✅ Guarda tu itinerario para consultarlo después
      </p>
    </div>
  );
}
