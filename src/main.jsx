/**
 * Punto de entrada de la aplicación
 * -------------------------------
 * - Monta React en el elemento #root.
 * - Mantén este archivo pequeño: la mayoría de la lógica de la app
 *   se encuentra en `App.jsx` y los componentes bajo `src/`.
 */
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
