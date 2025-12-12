/**
 * Header / Page container for the Question Flow and Itinerary preview
 * ------------------------------------------------------------------
 * Responsibilities:
 * - Render the top-right user widget (avatar + dropdown) with actions
 *   (Mi perfil, Opciones de viajes, Cerrar sesión).
 * - If `localStorage.previewItinerary` exists, show the Itinerary preview
 *   component instead of the QuestionFlow (this allows quick preview from
 *   the Profile page without full navigation).
 * - Provide helper methods to logout and navigate safely.
 *
 * Notes and edge-cases:
 * - All interactions that remove user data (logout) ask for confirmation.
 * - The previewItinerary is removed when the user returns from the preview.
 */
import { useMemo, useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import QuestionFlow from './QuestionFlow.jsx'
import Itinerary from './Itinerary.jsx'

export default function QuestionFlowPage() {
  const navigate = useNavigate()

  const user = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem('user'))
    } catch {
      return null
    }
  }, [])

  const name = user?.name || 'Usuario'

  const handleLogout = () => {
    const ok = window.confirm('¿Seguro que quieres cerrar sesión?')
    if (!ok) return
    localStorage.removeItem('user')
    localStorage.removeItem('authToken')
    navigate('/login', { replace: true })
  }

  const goProfile = () => {
    navigate('/profile')
  }

  // Dropdown for profile actions
  const [open, setOpen] = useState(false)
  const dropdownRef = useRef(null)
  useEffect(() => {
    const onDoc = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('click', onDoc)
    return () => document.removeEventListener('click', onDoc)
  }, [])

  const initials = (name || 'Usuario').split(' ').map(n => n[0]).slice(0,2).join('').toUpperCase()

  return (
    <div className="min-h-screen bg-gray-100 p-6 relative">
      <div className="absolute top-4 right-4" ref={dropdownRef}>
        <div className="flex items-center gap-3 bg-white/90 backdrop-blur-md px-4 py-2 rounded-lg shadow-md">
          <div className="flex flex-col mr-2">
            <span className="text-sm text-gray-500">Bienvenido</span>
            <span className="text-sm font-semibold text-gray-800">{name}</span>
          </div>
          <button onClick={() => setOpen(o => !o)} className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-semibold shadow">{initials}</button>
        </div>

        {open && (
          <div className="mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black/5 py-1">
            <button onClick={() => { goProfile(); setOpen(false) }} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50">Mi perfil</button>
            <button onClick={() => { localStorage.setItem('openDestinos', '1'); navigate('/app'); setOpen(false) }} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50">Opciones de viajes</button>
            <div className="border-t my-1"></div>
            <button onClick={() => { handleLogout(); setOpen(false) }} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50">Cerrar sesión</button>
          </div>
        )}
      </div>
      {/* Si hay un itinerario en preview (desde Perfil), mostrarlo */}
      {(() => {
        const previewRaw = localStorage.getItem('previewItinerary')
        let preview = null
        if (previewRaw) {
          try {
            preview = JSON.parse(previewRaw)
          } catch (parseErr) {
            console.error('Invalid previewItinerary', parseErr)
          }
        }

        if (preview) {
          return (
            <Itinerary
              lugar={preview.lugar}
              onBack={() => {
                localStorage.removeItem('previewItinerary')
                // fuerza re-render
                window.location.reload()
              }}
            />
          )
        }

        return <QuestionFlow />
      })()}
    </div>
  )
}
