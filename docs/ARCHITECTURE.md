# Plan-Match — Arquitectura y documentación rápida

Este documento resume la arquitectura general del proyecto y describe los
componentes más relevantes para facilitar mantenimiento y extensiones.

## Resumen general

- Tech stack: React + Vite + TailwindCSS.
- Rutas principales definidas en `src/App.jsx`.
- Persistencia: `localStorage` para estado offline; MockAPI (`src/service/api.js`) para persistencia remota opcional.
- Export: componentes permiten exportar itinerarios a PDF y JSON.

## Estructura importante

- `src/main.jsx` — Punto de entrada. Monta `App` en `#root`.
- `src/App.jsx` — Router principal. Define rutas públicas y protegidas.
- `src/service/api.js` — Encapsula llamadas a MockAPI (find/create/update perfiles y usuarios).
- `src/components/QuestionFlowPage.jsx` — Contenedor principal del flujo (preguntas) y header de usuario.
- `src/Pages/Profile.jsx` — Página de perfil con listado y acciones sobre viajes.
- `src/components/Itinerary.jsx` — Editor/visor de itinerarios (añadir días/actividades, confirmar, exportar).

## Flujo de perfil y sincronización

1. Al confirmar un itinerario desde `Itinerary.jsx`, la app intenta guardar el trip en MockAPI
   con `saveProfileForEmail(email, profileBody)`.
2. Si falla (red), hace fallback a `localStorage.profiles` para asegurar disponibilidad offline.
3. El `Profile.jsx` muestra los viajes desde MockAPI si es posible; si no, lee `localStorage.profiles`.

## Guía rápida para desarrolladores

- Añadir nuevas rutas: edita `src/App.jsx` y usa `ProtectedRoute` para rutas que requieran login.
- Añadir métodos API: agrégalos en `src/service/api.js` y documenta su contrato.
- Evitar ruptura: los componentes manejan errores de parsing de `localStorage` con try/catch; usa la misma estrategia.

## Archivos a revisar primero

- `src/Pages/Profile.jsx` — lógica de UI y sincronización.
- `src/components/Itinerary.jsx` — lógica de creación de itinerarios.
- `src/service/api.js` — integra con MockAPI.

---

Si quieres, puedo generar documentación más detallada por archivo (JSDoc para cada función
exportada, ejemplo de payloads y errores esperados). Dime si prefieres un formato Markdown por
archivo, o comentarios JSDoc directamente en los ficheros fuente.