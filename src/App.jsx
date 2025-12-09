//Autor: Angie Maritza Carrillo Fuquene
//Ficha: 3293689
//Fecha actualizacion: 08/12/2025
//Descripcion: Componente principal de la aplicacion que maneja las rutas entre paginas.

// Dependencias necesarias para la navegacion entre paginas
//Routes y Route para definir las rutas de la aplicacion
//importa los componentes de las paginas
import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import ForgotPassword from "./Pages/ForgotPassword";
import Home from "./Pages/Home";

// Componente principal de la aplicacion
function App() {
  return (
    //Aqui definimos las rutas de la aplicacion
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
}

// Exportar el componente App como predeterminado
export default App;
