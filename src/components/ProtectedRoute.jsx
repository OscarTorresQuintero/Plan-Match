import { Navigate } from 'react-router-dom'

export default function ProtectedRoute({ children }) {
  const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null
  const user = typeof window !== 'undefined' ? localStorage.getItem('user') : null
  if (!token && !user) {
    return <Navigate to="/login" replace />
  }
  return children
}
