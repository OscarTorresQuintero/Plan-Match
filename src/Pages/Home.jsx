//DOCUMENTAR Y ACTUALIZAR

export default function Home({ user, onLogout }) {
  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Bienvenido, {user.name} 👋</h1>

      <button
        onClick={onLogout}
        className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
      >
        Cerrar Sesión
      </button>
    </div>
  );
}
