/**
 * Página de Perfil
 * ----------------
 * Propósito:
 * - Mostrar los viajes guardados para el usuario actual (localStorage y MockAPI).
 * - Proveer acciones sobre cada viaje: abrir (modal), exportar (PDF/JSON),
 *   renombrar, eliminar y sincronizar con backend.
 *
 * Comportamiento clave:
 * - Carga el `user` desde `localStorage` y usa su `email` para buscar el perfil
 *   en MockAPI mediante `findProfileByEmail`. Si falla, hace fallback a
 *   `localStorage.profiles`.
 * - El modal permite previsualizar el viaje sin navegar fuera de la página.
 * - "Volver a opciones de viajes" y las acciones del modal no cierran la sesión
 *   (a menos que el usuario pulse explícitamente "Cerrar sesión").
 *
 * Recomendaciones de mantenimiento:
 * - Mantener la sincronización con MockAPI en `saveProfileForEmail` para
 *   evitar divergencias entre dispositivos.
 */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { findProfileByEmail, updateProfile, saveProfileForEmail } from '../service/api.js';
import ProfileEditor from '../components/ProfileEditor.jsx';

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [message, setMessage] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingValue, setEditingValue] = useState('');
  const [debugMode, setDebugMode] = useState(false);
  const [parseError, setParseError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [messageType, setMessageType] = useState('info'); // 'info' | 'success' | 'error'
  
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [localProfiles, setLocalProfiles] = useState({});
  const navigate = useNavigate();

  const handleLogout = () => {
    const ok = window.confirm('¿Seguro que quieres cerrar sesión?');
    if (!ok) return;
    // Limpiar sólo lo necesario
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    // No eliminar perfiles locales; solo cerrar sesión
    navigate('/login');
  };

  useEffect(() => {
    // Support unlocked profile view: if no logged user, allow selecting a local profile
    const userRaw = localStorage.getItem('user');
    let user = null;
    if (userRaw) {
      try { user = JSON.parse(userRaw); } catch (e) { console.warn('usuario en localStorage no válido', e); }
    }

    const defaultEmail = user?.email || user?.id || null;

    const defaultProfile = (email) => ({ name: user?.name || '', email: email || 'anon', trips: [] });

    (async () => {
      // If we have a logged user, prefer backend -> localStorage
      if (user) {
        const email = defaultEmail;
        try {
          const found = await findProfileByEmail(email);
          if (found && found.length > 0) {
            const p = found[0];
            p.email = p.email || email;
            p.name = p.name || user.name || '';
            p.trips = Array.isArray(p.trips) ? p.trips : [];
            setProfile(p);
            setLoading(false);
            return;
          }
        } catch (err) {
          console.warn('Error cargando perfil desde backend, usando localStorage', err);
          setParseError(err?.message || String(err));
        }

        try {
          const profilesRaw = localStorage.getItem('profiles');
          const profiles = profilesRaw ? JSON.parse(profilesRaw) : {};
          const p = profiles[email] || defaultProfile(email);
          p.email = p.email || email;
          p.name = p.name || user.name || '';
          p.trips = Array.isArray(p.trips) ? p.trips : [];
          setProfile(p);
          setLoading(false);
          return;
        } catch (err) {
          console.error('Error leyendo perfiles de localStorage, usando perfil por defecto', err);
          setParseError(err?.message || String(err));
          setProfile(defaultProfile(email));
          setLoading(false);
          return;
        }
      }

      // No logged user: load available local profiles for selection
      try {
        const profilesRaw = localStorage.getItem('profiles');
        const profiles = profilesRaw ? JSON.parse(profilesRaw) : {};
        const keys = Object.keys(profiles || {});
        setLocalProfiles(profiles || {});
        if (keys.length === 1) {
          // auto-select the only local profile
          const only = profiles[keys[0]];
          only.email = only.email || keys[0];
          only.trips = Array.isArray(only.trips) ? only.trips : [];
          setProfile(only);
        } else {
          // No selection yet; show selector in UI
          setProfile(null);
        }
      } catch (err) {
        console.error('Error leyendo perfiles locales', err);
        setLocalProfiles({});
        setProfile(null);
      }
      setLoading(false);
    })();
  }, [navigate]);

  const deleteTrip = (index) => {
    if (!profile) return;
    const ok = window.confirm('¿Estás seguro que quieres eliminar este viaje? Esta acción no se puede deshacer.');
    if (!ok) return;
    const userRaw = localStorage.getItem('user');
    if (!userRaw) return;
    const user = JSON.parse(userRaw);
    const email = user.email || user.id || 'anonymous';

    // Si el perfil viene del backend (tiene id), actualizamos allí
    if (profile && profile.id) {
      const updated = { ...profile };
      updated.trips = Array.isArray(updated.trips) ? [...updated.trips] : [];
      updated.trips.splice(index, 1);
      updateProfile(profile.id, updated).then((res) => {
        setProfile(res);
        setMessage('Viaje eliminado');
        setMessageType('success');
        setTimeout(() => setMessage(''), 3000);
      }).catch((err) => {
        console.warn('No se pudo eliminar en backend, actualizando localmente', err);
        // fallback local
        try {
          const profilesRaw = localStorage.getItem('profiles');
          const profiles = profilesRaw ? JSON.parse(profilesRaw) : {};
          if (!profiles[email]) profiles[email] = { name: profile.name || '', email, trips: [] };
          profiles[email].trips.splice(index, 1);
          localStorage.setItem('profiles', JSON.stringify(profiles));
          setProfile({ ...profiles[email] });
          setMessage('Viaje eliminado localmente');
          setMessageType('info');
          setTimeout(() => setMessage(''), 3000);
        } catch (e) {
          console.error('Error actualizando localStorage en fallback', e);
          setMessage('Error eliminando viaje');
          setMessageType('error');
          setTimeout(() => setMessage(''), 3000);
        }
      });
      return;
    }

    // Fallback: localStorage
    try {
      const profilesRaw = localStorage.getItem('profiles');
      const profiles = profilesRaw ? JSON.parse(profilesRaw) : {};
      if (!profiles[email]) profiles[email] = { name: profile.name || '', email, trips: [] };
      profiles[email].trips.splice(index, 1);
      localStorage.setItem('profiles', JSON.stringify(profiles));
      setProfile({ ...profiles[email] });
      setMessage('Viaje eliminado');
      setMessageType('success');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      console.error('Error actualizando localStorage al eliminar viaje', err);
      setMessage('Error eliminando viaje');
      setMessageType('error');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const exportJSON = (trip) => {
    const datos = { ...trip };
    const blob = new Blob([JSON.stringify(datos, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `viaje-${trip.lugar?.nombre || 'sin-nombre'}-${new Date().getTime()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setMessage('JSON descargado');
    setMessageType('success');
    setTimeout(() => setMessage(''), 2000);
  };

  const exportAllJSON = () => {
    if (!profile) return;
    const datos = { profile: { name: profile.name, email: profile.email }, trips: profile.trips };
    const blob = new Blob([JSON.stringify(datos, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `mis-viajes-${new Date().toISOString().slice(0,10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setMessage('Exportado JSON con todos los viajes');
    setMessageType('success');
    setTimeout(() => setMessage(''), 2500);
  };

  // Sincronización remota removida: la app mantiene perfiles en localStorage.

  const exportPDF = (trip) => {
    // Crear HTML básico con información del viaje y abrir ventana de impresión
    let contenido = `<h1>${trip.lugar?.nombre || 'Itinerario'}</h1>`;
    contenido += `<p><strong>País:</strong> ${trip.lugar?.pais || 'N/A'}</p>`;
    contenido += `<p><strong>Precio:</strong> $${trip.lugar?.precioCOP?.toLocaleString('es-CO') || 'N/A'}</p>`;
    contenido += '<hr>';
    contenido += '<h2>Itinerario Detallado</h2>';
    Object.keys(trip.actividades || {})
      .map(Number)
      .sort((a, b) => a - b)
      .forEach(dia => {
        contenido += `<h3>Día ${dia}</h3>`;
        const actividadesDia = trip.actividades[dia] || [];
        if (actividadesDia.length === 0) contenido += `<p><em>Sin actividades planificadas</em></p>`;
        else {
          contenido += '<ul>';
          actividadesDia.forEach(act => { contenido += `<li><strong>${act.hora || ''}</strong> - ${act.nombre}</li>`; });
          contenido += '</ul>';
        }
      });

    const w = window.open('', '_blank');
    w.document.write(`
      <html>
        <head>
          <title>Itinerario - ${trip.lugar?.nombre || ''}</title>
          <style>body{font-family:Arial;margin:20px;} h1{color:#333;border-bottom:3px solid #4f46e5;padding-bottom:10px;} ul{margin:10px 0;} li{margin:6px 0;}</style>
        </head>
        <body>${contenido}<hr><p>Generado desde Plan Match - ${new Date().toLocaleDateString()}</p></body>
      </html>
    `);
    w.document.close();
    w.print();
    setMessage('PDF generado (ventana de impresión)');
    setTimeout(() => setMessage(''), 2000);
  };

  const startRename = (index) => {
    setEditingIndex(index);
    const current = profile?.trips?.[index];
    setEditingValue(current?.lugar?.nombre || '');
  };

  const confirmRename = (index) => {
    if (!profile) return;
    const updated = { ...profile };
    updated.trips = Array.isArray(updated.trips) ? [...updated.trips] : [];
    if (!updated.trips[index]) return;
    updated.trips[index] = { ...updated.trips[index], lugar: { ...updated.trips[index].lugar, nombre: editingValue } };

    // Update backend if possible
    if (profile.id) {
      updateProfile(profile.id, updated).then((res) => {
        setProfile(res);
        setMessage('Nombre actualizado');
        setEditingIndex(null);
        setEditingValue('');
        setTimeout(() => setMessage(''), 2000);
      }).catch((err) => {
        console.warn('Fallo actualizar backend, aplicando localmente', err);
        // fallback local
        const userRaw = localStorage.getItem('user');
        const user = userRaw ? JSON.parse(userRaw) : null;
        const email = user?.email || user?.id || 'anonymous';
        const profilesRaw = localStorage.getItem('profiles');
        const profiles = profilesRaw ? JSON.parse(profilesRaw) : {};
        if (!profiles[email]) profiles[email] = { name: profile.name || '', trips: [] };
        profiles[email] = updated;
        localStorage.setItem('profiles', JSON.stringify(profiles));
        setProfile(updated);
        setMessage('Nombre actualizado localmente');
        setEditingIndex(null);
        setEditingValue('');
        setTimeout(() => setMessage(''), 2000);
      });
    } else {
      // local only
      const userRaw = localStorage.getItem('user');
      const user = userRaw ? JSON.parse(userRaw) : null;
      const email = user?.email || user?.id || 'anonymous';
      const profilesRaw = localStorage.getItem('profiles');
      const profiles = profilesRaw ? JSON.parse(profilesRaw) : {};
      profiles[email] = updated;
      localStorage.setItem('profiles', JSON.stringify(profiles));
      setProfile(updated);
      setMessage('Nombre actualizado');
      setEditingIndex(null);
      setEditingValue('');
      setTimeout(() => setMessage(''), 2000);
    }
  };

  if (loading) return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center py-20">
        <div className="inline-block animate-pulse bg-gray-200 h-8 w-8 rounded-full mb-4"></div>
        <div className="text-lg text-gray-600">Cargando perfil...</div>
      </div>
    </div>
  );
  if (!profile) {
    // If we have localProfiles available, allow the user to pick one
    const keys = Object.keys(localProfiles || {});
    if (keys.length > 0) {
      return (
        <div className="max-w-4xl mx-auto p-6">
          <div className="bg-white p-6 shadow rounded">
            <h3 className="text-xl font-semibold">Perfiles locales disponibles</h3>
            <p className="mt-2 text-sm text-gray-600">Selecciona un perfil para ver sus viajes (no requiere inicio de sesión).</p>
            <div className="mt-4 space-y-2">
              {keys.map((k) => (
                <div key={k} className="flex items-center justify-between p-3 border rounded">
                  <div>
                    <div className="font-semibold">{localProfiles[k].name || k}</div>
                    <div className="text-xs text-gray-500">{k} · { (localProfiles[k].trips||[]).length } viajes</div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => { const p = localProfiles[k]; p.email = p.email || k; setProfile(p); }} className="px-3 py-1 bg-indigo-600 text-white rounded">Seleccionar</button>
                    <button onClick={() => { const cp = JSON.parse(JSON.stringify(localProfiles)); delete cp[k]; localStorage.setItem('profiles', JSON.stringify(cp)); setLocalProfiles(cp); }} className="px-3 py-1 bg-gray-200 rounded">Eliminar local</button>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex gap-2">
              <button onClick={() => { localStorage.setItem('openDestinos', '1'); navigate('/app'); }} className="px-4 py-2 bg-indigo-600 text-white rounded">Crear nuevo viaje</button>
              <button onClick={() => { localStorage.removeItem('profiles'); setLocalProfiles({}); }} className="px-4 py-2 bg-gray-200 rounded">Borrar todos los locales</button>
            </div>
          </div>
        </div>
      );
    }

    // No profiles at all: suggest creating one
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white p-6 shadow rounded">
          <h3 className="text-xl font-semibold">Perfil no encontrado</h3>
          <p className="mt-2 text-sm text-gray-600">No hay perfiles locales ni sesión iniciada. Crea un viaje para comenzar.</p>
          <div className="mt-4"><button onClick={() => { localStorage.setItem('openDestinos', '1'); navigate('/app'); }} className="px-4 py-2 bg-indigo-600 text-white rounded">Ir a opciones de viajes</button></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="rounded-lg overflow-hidden shadow-lg mb-6">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-white text-2xl font-bold">
              {profile.name ? profile.name.split(' ').map(n => n[0]).slice(0,2).join('') : 'U'}
            </div>
            <div>
              <h2 className="text-2xl font-bold">{profile.name}</h2>
              <p className="text-sm opacity-90">{profile.email || '—'}</p>
              <div className="mt-2">
                <ProfileEditor profile={profile} onSave={(p) => { setProfile(p); setMessage('Perfil actualizado'); setMessageType('success'); setTimeout(() => setMessage(''), 2500); }} />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right mr-4">
              <p className="text-sm opacity-80">Viajes guardados</p>
              <p className="text-3xl font-extrabold">{(profile.trips || []).length}</p>
            </div>
              <div className="flex items-center gap-2">
              <button onClick={exportAllJSON} className="text-sm px-3 py-2 bg-white/10 hover:bg-white/20 rounded text-white">Exportar todo</button>
              <button onClick={() => handleLogout()} className="text-sm px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded">Cerrar sesión</button>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
          <button onClick={() => { localStorage.setItem('openDestinos', '1'); navigate('/app'); }} className="text-sm text-indigo-600 underline">← Volver a opciones de viajes</button>
          <button onClick={() => setDebugMode(d => !d)} className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded">{debugMode ? 'Ocultar debug' : 'Mostrar debug'}</button>
        </div>
        <div>{loading ? null : (message ? (
          <div className={`${messageType === 'success' ? 'bg-green-50 border-green-200 text-green-800' : messageType === 'error' ? 'bg-red-50 border-red-200 text-red-800' : 'bg-blue-50 border-blue-200 text-blue-800'} mb-0 p-2 border rounded`}>{message}</div>
        ) : null)}</div>
      </div>

      {debugMode && (
        <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded text-sm text-gray-800">
          <div className="font-semibold mb-2">Debug</div>
          {parseError && <div className="mb-2 text-red-600">Parse error: {parseError}</div>}
          <pre className="max-h-48 overflow-auto text-xs p-2 bg-white border rounded">{JSON.stringify(profile, null, 2)}</pre>
        </div>
      )}

      {message && (
        <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-800 rounded">{message}</div>
      )}

      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="text-lg font-semibold mb-2">Viajes guardados</h3>
        {profile.trips.length === 0 ? (
          <p className="text-gray-600">No tienes viajes guardados todavía.</p>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {profile.trips.map((t, i) => (
              <div key={i} className="border rounded-lg p-4 bg-gray-50 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      {editingIndex === i ? (
                        <div className="flex items-center gap-2">
                          <input value={editingValue} onChange={(e) => setEditingValue(e.target.value)} className="border rounded px-2 py-1" />
                          <button onClick={() => confirmRename(i)} className="bg-green-600 text-white px-3 py-1 rounded">OK</button>
                          <button onClick={() => { setEditingIndex(null); setEditingValue(''); }} className="bg-gray-200 px-3 py-1 rounded">Cancelar</button>
                        </div>
                      ) : (
                        <>
                          <h4 className="font-bold text-lg">{t.lugar?.nombre || 'Lugar desconocido'}</h4>
                          <p className="text-sm text-gray-600">{t.lugar?.pais} · <span className="font-semibold">${t.lugar?.precioCOP?.toLocaleString('es-CO') || 'N/A'}</span></p>
                        </>
                      )}
                    </div>
                    <div className="text-sm text-gray-500">Guardado: {t.fecha ? new Date(t.fecha).toLocaleString() : '—'}</div>
                  </div>

                  <div className="mt-3 text-sm text-gray-700">
                    <strong>Actividades:</strong>
                    {(!t.actividades || Object.keys(t.actividades).length === 0) ? (
                      <p className="text-sm text-gray-600">Sin actividades</p>
                    ) : (
                      <ul className="list-disc list-inside mt-2">
                        {Object.entries(t.actividades).map(([dia, acts]) => (
                          <li key={dia}><strong>Día {dia}:</strong> {Array.isArray(acts) ? acts.map(a => a.nombre).join(', ') : ''}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-2">
                  <button onClick={() => { setSelectedTrip({ trip: t, index: i }); setIsModalOpen(true); }} className="bg-blue-600 text-white px-3 py-2 rounded">Abrir</button>
                  <button onClick={() => deleteTrip(i)} className="bg-red-500 text-white px-3 py-2 rounded">Eliminar</button>
                  <button onClick={() => exportPDF(t)} className="bg-indigo-500 text-white px-3 py-2 rounded">📄 PDF</button>
                  <button onClick={() => exportJSON(t)} className="bg-gray-700 text-white px-3 py-2 rounded">💾 JSON</button>
                  {editingIndex === i ? null : <button onClick={() => startRename(i)} className="bg-yellow-500 text-white px-3 py-2 rounded">Renombrar</button>}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    
      {/* Trip details modal */}
      {isModalOpen && selectedTrip && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white max-w-3xl w-full rounded-lg shadow-lg p-6 mx-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-bold">{selectedTrip.trip.lugar?.nombre || 'Itinerario'}</h3>
                <p className="text-sm text-gray-600">{selectedTrip.trip.lugar?.pais || ''} · ${selectedTrip.trip.lugar?.precioCOP?.toLocaleString('es-CO') || 'N/A'}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => { setIsModalOpen(false); setSelectedTrip(null); }} className="px-3 py-1 rounded bg-gray-200">Cerrar</button>
                <button onClick={() => { setIsModalOpen(false); }} className="px-3 py-1 rounded bg-white border">Minimizar</button>
              </div>
            </div>

            <div className="mt-4">
              <h4 className="font-semibold">Actividades</h4>
              {(!selectedTrip.trip.actividades || Object.keys(selectedTrip.trip.actividades).length === 0) ? (
                <p className="text-sm text-gray-600">Sin actividades planificadas</p>
              ) : (
                <div className="mt-2 space-y-2 max-h-64 overflow-auto">
                  {Object.entries(selectedTrip.trip.actividades).map(([dia, acts]) => (
                    <div key={dia} className="p-2 bg-gray-50 rounded">
                      <strong>Día {dia}:</strong>
                      <ul className="list-disc list-inside mt-1">
                        {Array.isArray(acts) ? acts.map((a, idx) => <li key={idx}>{a.hora ? `${a.hora} — ` : ''}{a.nombre}</li>) : null}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-6 flex flex-wrap gap-2 justify-end">
              <button onClick={() => { localStorage.setItem('previewItinerary', JSON.stringify(selectedTrip.trip)); localStorage.setItem('openDestinos', '1'); setIsModalOpen(false); navigate('/app'); }} className="bg-indigo-600 text-white px-4 py-2 rounded">Ir a opciones de viajes</button>
              <button onClick={() => exportPDF(selectedTrip.trip)} className="bg-indigo-500 text-white px-4 py-2 rounded">📄 PDF</button>
              <button onClick={() => exportJSON(selectedTrip.trip)} className="bg-gray-700 text-white px-4 py-2 rounded">💾 JSON</button>
              <button onClick={() => { deleteTrip(selectedTrip.index); setIsModalOpen(false); }} className="bg-red-500 text-white px-4 py-2 rounded">Eliminar</button>
              <button onClick={() => { startRename(selectedTrip.index); setIsModalOpen(false); }} className="bg-yellow-500 text-white px-4 py-2 rounded">Renombrar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
