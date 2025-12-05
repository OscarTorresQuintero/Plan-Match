//DOCUMENTAR Y ACTUALIZAR

import { useState } from "react";
import { getUserByEmail } from "../services/api";
import FormInput from "../components/FormInput";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    const user = await getUserByEmail(email);

    if (user.length === 0 || user[0].password !== password) {
      setError("Correo o contraseña incorrectos.");
      return;
    }

    localStorage.setItem("user", JSON.stringify(user[0]));
    onLogin(user[0]);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">

      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-xl shadow-lg w-80"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Iniciar Sesión</h2>

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <FormInput
          label="Correo"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="ejemplo@gmail.com"
        />

        <FormInput
          label="Contraseña"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
        />

        <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
          Entrar
        </button>

        <p className="mt-4 text-center text-sm">
          ¿No tienes cuenta?{" "}
          <a href="/register" className="text-blue-600 underline">
            Regístrate
          </a>
        </p>
      </form>
    </div>
  );
}