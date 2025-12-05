//DOCUMENTAR Y ACTUALIZAR


import { useState } from "react";
import { registerUser } from "../services/api";
import FormInput from "../components/FormInput";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    const newUser = { name, email, password };

    await registerUser(newUser);
    setMsg("Usuario registrado correctamente 🎉");
    setName("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">

      <form className="bg-white p-8 rounded-xl shadow-lg w-80" onSubmit={handleRegister}>
        <h2 className="text-2xl font-bold mb-4 text-center">Registro</h2>

        {msg && <p className="text-green-600 text-sm mb-2">{msg}</p>}

        <FormInput label="Nombre" type="text" value={name} onChange={(e) => setName(e.target.value)} />

        <FormInput label="Correo" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />

        <FormInput label="Contraseña" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

        <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition">
          Crear cuenta
        </button>

        <p className="mt-4 text-center text-sm">
          ¿Ya tienes cuenta?{" "}
          <a href="/" className="text-blue-600 underline">
            Inicia sesión
          </a>
        </p>
      </form>
    </div>
  );
}
