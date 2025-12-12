/**
 * Servicio API centralizado
 * ------------------------
 * Autor: Angie Maritza Carrillo Fuquene
 * Fecha actualización: 08/12/2025
 * Descripción:
 *   Este archivo expone funciones para interactuar con el backend (MockAPI)
 *   y encapsula todas las llamadas fetch usadas por la aplicación.
 *
 * Contrato de las funciones exportadas:
 * - registerUser(userData): Promise<json> -> Crea un nuevo usuario en la API.
 * - getUsers(): Promise<json[]> -> Lista usuarios (uso limitado en la app).
 * - findUserByEmail(email): Promise<json[]> -> Busca usuarios por email.
 * - createUser(userData): alias de registerUser.
 * - findProfileByEmail(email): Promise<json[]> -> Busca perfiles (contienen trips) por email.
 * - createProfile(profileData): Promise<json> -> Crea un nuevo perfil con trips.
 * - updateProfile(id, profileData): Promise<json> -> Actualiza perfil existente por id.
 * - saveProfileForEmail(email, profileBody): Promise<json> -> Guarda o actualiza (busca antes).
 *
 * Notas de implementación:
 * - MockAPI expone recursos sencillos mediante queries (?email=...).
 * - Estas funciones suponen que la API responde JSON y re-lanzan errores de red
 *   a la capa llamante para que gestione fallbacks (localStorage, mensajes al usuario).
 * - No hay manejo de autenticación en estas llamadas; se asume que el cliente
 *   controla qué email usar y qué permisos aplicar.
 */

// URL base de la API
const API_URL = "https://6932294111a8738467d1ad93.mockapi.io/api/v1/Plan";

// Recurso para perfiles (guardamos viajes y metadatos de usuario)
const PROFILES_URL = API_URL + "/profiles";

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

// Buscar usuario por email (MockAPI soporta filtrado por query string ?email=)
export const findUserByEmail = async (email) => {
  if (!email) return [];
  const response = await fetch(`${API_URL}?email=${encodeURIComponent(email)}`);
  return response.json();
};

// Alias más explícito para crear usuario (ya existe registerUser)
export const createUser = async (userData) => {
  return registerUser(userData);
};

// --- Perfiles (via MockAPI) ---
// Buscar perfil por email
export const findProfileByEmail = async (email) => {
  if (!email) return [];
  const res = await fetch(`${PROFILES_URL}?email=${encodeURIComponent(email)}`);
  return res.json();
};

// Crear perfil
export const createProfile = async (profileData) => {
  const res = await fetch(PROFILES_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(profileData),
  });
  return res.json();
};

// Actualizar perfil por id
export const updateProfile = async (id, profileData) => {
  const res = await fetch(`${PROFILES_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(profileData),
  });
  return res.json();
};

// Guardar o actualizar perfil por email (se encarga de buscar primero)
export const saveProfileForEmail = async (email, profileBody) => {
  if (!email) throw new Error('Email requerido para guardar perfil');
  const found = await findProfileByEmail(email);
  if (found && found.length > 0) {
    const existing = found[0];
    const updated = { ...existing, ...profileBody };
    return updateProfile(existing.id, updated);
  }
  // No existe, crear nuevo
  const toCreate = { email, ...profileBody };
  return createProfile(toCreate);
};

