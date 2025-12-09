//Autor: Angie Maritza Carrillo Fuquene
//Ficha: 3293689
//Fecha actualizacion: 08/12/2025
//Descripcion: Pagina principal que muestra la bienvenida al usuario
// autenticado y permite cerrar sesión.

// Dependencias necesarias para la pagina principal
//UseEffect para cargar los datos del usuario al montar el componente
//UseState para manejar el estado del usuario
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Componente principal de la pagina de inicio
const Home = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem("user");
    if (data) {
      setUser(JSON.parse(data));
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (!user) return null;

  return (
    <div className="p-8 text-center">
      <h1 className="text-2xl font-bold mb-4">Bienvenido, {user.name}</h1>

      <button
        onClick={logout}
        className="bg-red-500 text-white px-4 py-2 rounded"
      >
        Cerrar sesión
      </button>
    </div>
  );
};

export default Home;
