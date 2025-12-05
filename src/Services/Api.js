export const API_URL = "https://6932294111a8738467d1ad93.mockapi.io/api/v1/Plan";

//DOCUMENTAR Y ACTUALIZAR
export const registerUser = async (data) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return await res.json();
};

export const getUserByEmail = async (email) => {
  const res = await fetch(`${API_URL}?email=${email}`);
  return await res.json();
};