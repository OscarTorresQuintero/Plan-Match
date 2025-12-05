import { useState } from 'react'
import './App.css'


useState
//DOCUMENTAR Y ACTUALIZAR

import { useState, useEffect } from "react";
import Login from "./PROYECTS/Plan-Match-Angie-Carrillo/src/pages/Login";
import Register from "./PROYECTS/Plan-Match-Angie-Carrillo/src/pages/Register";
import Home from "./Pages/Home";

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    window.location.href = "/";
  };

  if (!user) {
    if (window.location.pathname === "/register") {
      return <Register />;
    }
    return <Login onLogin={setUser} />;
  }

  return <Home user={user} onLogout={handleLogout} />;
}
