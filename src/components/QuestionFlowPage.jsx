import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import QuestionFlow from './QuestionFlow.jsx'

export default function QuestionFlowPage() {
  const navigate = useNavigate()

  const user = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem('user'))
    } catch (err) {
      return null
    }
  }, [])

  const name = user?.name || 'Usuario'

  const handleLogout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('authToken')
    navigate('/login', { replace: true })
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6 relative">
      <div className="absolute top-4 left-4 flex items-center gap-3 bg-white/80 backdrop-blur-md px-4 py-2 rounded shadow">
        <span className="text-sm font-semibold text-gray-800">Bienvenido, {name}</span>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white text-sm px-3 py-1 rounded hover:bg-red-700"
        >
          Cerrar sesión
        </button>
      </div>
      <QuestionFlow />
    </div>
  )
}
