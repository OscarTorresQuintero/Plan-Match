//Autor: Angie Maritza Carrillo Fuquene
//Ficha: 3293689
//Fecha actualizacion: 08/12/2025
//Descripcion: Punto de entrada principal de la aplicacion que renderiza el componente App

// Dependencias necesarias para renderizar la aplicacion
//ReactDOM para renderizar el componente en el DOM
//BrowserRouter para manejar la navegacion entre paginas
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";

// Renderizar la aplicacion dentro del elemento con id "root"
ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter basename="/Plan-Match">
    <App />
  </BrowserRouter>
);
