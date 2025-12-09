//Autor: Angie Maritza Carrillo Fuquene
//Ficha: 3293689
//Fecha actualizacion: 08/12/2025
//Descripcion: Servicio API para manejar las solicitudes relacionadas con los usuarios.

// URL base de la API
const API_URL = "https://6932294111a8738467d1ad93.mockapi.io/api/v1/Plan";

// Función para registrar un nuevo usuario
export const registerUser = async (userData) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  // Retornar la respuesta en formato JSON
  return response.json();
};

// Función para obtener todos los usuarios
export const getUsers = async () => {
  const response = await fetch(API_URL);
  return response.json();
};

