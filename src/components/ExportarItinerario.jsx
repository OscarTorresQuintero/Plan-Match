import React from 'react'

export default function ExportarItinerario({ lugar, actividades }) {
  // Descargar una versión imprimible (HTML) y abrir la ventana de impresión
  const descargarPDF = () => {
    let contenido = `<h1>${lugar?.nombre || 'Itinerario'}</h1>`;
    contenido += `<p><strong>País:</strong> ${lugar?.pais || 'N/A'}</p>`;
    contenido += `<p><strong>Precio:</strong> $${lugar?.precioCOP?.toLocaleString('es-CO') || 'N/A'}</p>`;
    contenido += `<hr><h2>Itinerario detallado</h2>`;

    Object.keys(actividades || {}).map(Number).sort((a,b)=>a-b).forEach(dia => {
      contenido += `<h3>Día ${dia}</h3>`;
      const acts = actividades[dia] || [];
      if (acts.length === 0) contenido += `<p><em>Sin actividades planificadas</em></p>`;
      else {
        contenido += '<ul>';
        acts.forEach(a => { contenido += `<li>${a.hora ? `${a.hora} — ` : ''}${a.nombre}</li>` });
        contenido += '</ul>';
      }
    });

    const w = window.open('', '_blank');
    w.document.write(`
      <html>
        <head>
          <title>Itinerario - ${lugar?.nombre || ''}</title>
          <style>body{font-family:Arial;margin:20px;} h1{color:#333;border-bottom:3px solid #4f46e5;padding-bottom:10px;} ul{margin:10px 0;} li{margin:6px 0;}</style>
        </head>
        <body>
          ${contenido}
          <hr>
          <p>Generado desde Plan Match - ${new Date().toLocaleDateString()}</p>
        </body>
      </html>
    `);
    w.document.close();
    w.print();
  }

  const descargarJSON = () => {
    const datos = { lugar, actividades, fechaGeneracion: new Date().toISOString() };
    const blob = new Blob([JSON.stringify(datos, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `itinerario-${lugar?.nombre || 'sin-nombre'}-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-5 border-l-4 border-indigo-500 shadow-md">
      <h4 className="text-lg font-bold text-gray-900 mb-4">📥 Exportar Itinerario</h4>

      <div className="space-y-2">
        <button onClick={descargarPDF} className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-3 rounded-lg font-bold hover:scale-105 transition">📄 Descargar PDF</button>
        <button onClick={descargarJSON} className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-lg font-bold hover:scale-105 transition">💾 Descargar JSON</button>
      </div>

      <p className="text-xs text-gray-600 mt-4 text-center">✅ Guarda tu itinerario para consultarlo después</p>
    </div>
  )
}

