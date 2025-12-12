
/**
 * App Router
 * ----------
 * Este archivo define las rutas principales de la aplicación usando React Router.
 * Contiene rutas públicas (/login, /register) y rutas protegidas que requieren
 * sesión (envueltas por `ProtectedRoute`).
 *
 * Puntos clave:
 * - /login, /register, /forgot: páginas de autenticación.
 * - /home: tablero principal (requiere login).
 * - /profile: página de perfil (requiere login).
 * - /app: flujo de preguntas / creador de itinerario (requiere login).
 *
 * Si necesitas exponer nuevas rutas, agrégalas aquí y envuélvelas con
 * `ProtectedRoute` cuando necesiten autenticación.
 */
import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import QuestionFlow from "./components/QuestionFlow.jsx";
import Login from './Pages/Login.jsx'
import Register from './Pages/Register.jsx'
import ForgotPassword from './Pages/ForgotPassword.jsx'
import Home from './Pages/Home.jsx'
import Profile from './Pages/Profile.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import QuestionFlowPage from './components/QuestionFlowPage.jsx'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot" element={<ForgotPassword />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/home" element={
          <ProtectedRoute>
            <div className="min-h-screen bg-gray-100 p-6">
              <Home />
            </div>
          </ProtectedRoute>
        } />
        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />
        <Route path="/app" element={
          <ProtectedRoute>
            <QuestionFlowPage />
          </ProtectedRoute>
        } />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
