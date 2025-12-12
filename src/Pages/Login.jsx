//Autor: Angie Maritza Carrillo Fuquene
//Ficha: 3293689
//Fecha actualizacion: 08/12/2025
//Descripcion: Pagina de inicio de sesion con formulario, opciones de login social
// y carrusel de imagenes con testimonios rotativos.

// Dependencias necesarias para la pagina de inicio de sesion
//UseState para manejar el estado de los campos y el carrusel de imagenes
//UseEffect para el efecto del carrusel
//UseNavigate para redirigir al usuario despues del login
//FormInput para los campos del formulario reutilizables
//Imagenes para el carrusel
import React, { useState, useEffect } from "react";
import FormInput from "../components/FormInput.jsx";
import { getUsers } from "../service/api.js";
import { useNavigate } from "react-router-dom";
import logo from "../assets/imagen.jpg";
import avion from "../assets/avion.avif";
import hawai from "../assets/hawai.jpg";
import new2 from "../assets/new2.jpg";
import playa from "../assets/playa.avif";
import agua from "../assets/agua.jpg";
import atardecer from "../assets/atardecer.jpg";
import volando from "../assets/volando.jpg";

// Componente principal de la pagina de inicio de sesion
const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [avion, hawai, new2, playa, agua, atardecer, volando];
  
  // Testimonios para el carrusel
  const testimonials = [
    { text: "Encontré personas increíbles para explorar nuevos destinos", author: "María G.", rating: 5 },
    { text: "La mejor forma de planear viajes con gente que comparte tus intereses", author: "Carlos R.", rating: 5 },
    { text: "He hecho amigos de todo el mundo y vivido experiencias inolvidables", author: "Ana L.", rating: 4 },
    { text: "Perfecta para conectar con viajeros y crear aventuras juntos", author: "Jorge M.", rating: 5 },
    { text: "Una comunidad auténtica donde cada viaje es una nueva historia", author: "Laura S.", rating: 5 },
    { text: "Cada aventura es única y llena de momentos especiales", author: "Pedro M.", rating: 5 },
    { text: "Descubrí lugares mágicos con compañías increíbles", author: "Sofía T.", rating: 5 },
    { text: "Una plataforma que realmente conecta personas con las mismas pasiones", author: "David R.", rating: 4 }
  ];

  // Efecto para cambiar la imagen del carrusel cada 4 segundos
  //Useeffect para el carrusel de imagenes , sirve para cambiar la imagen cada cierto tiempo
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Manejar el envio del formulario de inicio de sesion
  const handleSubmit = async (e) => {
    e.preventDefault();

    const users = await getUsers();
    const found = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!found) {
      setError("Correo o contraseña incorrectos");
      return;
    }

    // Guardar el usuario en el almacenamiento local y redirigir a la pagina principal
    localStorage.setItem("user", JSON.stringify(found));
    localStorage.setItem("authToken", found.id || 'session');
    navigate("/app", { replace: true });
  };

  const handleGoogleLogin = () => {
    // Implementar login con Google
    console.log("Login con Google");
  };

  const handleFacebookLogin = () => {
    // Implementar login con Facebook
    console.log("Login con Facebook");
  };

  // Renderizar la interfaz de usuario
  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Columna Izquierda - Carrusel */}
      <div className="flex w-full lg:w-1/2 relative overflow-hidden">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentImageIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          </div>
        ))}
        
        {/* Contenido sobre el carrusel */}
        <div className="absolute bottom-0 left-0 right-0 p-12 text-white z-10">
          <div className="bg-black/25 backdrop-blur-sm rounded-lg p-6 inline-block">
            <h1 className="text-xl font-semibold mb-2" style={{fontFamily: "'Georgia', 'Garamond', serif", fontWeight: "600", letterSpacing: "0.05em"}}>Descubre experiencias únicas</h1>
            <p className="text-xs opacity-95 mb-0" style={{fontFamily: "'Georgia', 'Garamond', serif", fontWeight: "400", letterSpacing: "0.02em"}}>Conecta con personas que comparten tus intereses y planea aventuras inolvidables</p>
          </div>
          
          {/* Testimonios rotativos */}
          <div className="mt-6 bg-white/10 backdrop-blur-sm rounded-lg p-2 border border-white/20">
            <div className="relative h-14 overflow-hidden">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-1000 ${
                    index === currentImageIndex ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <p className="text-sm italic mb-2">"{testimonial.text}"</p>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold">— {testimonial.author}</span>
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={`text-xs ${i < testimonial.rating ? "text-yellow-300" : "text-gray-400"}`}>
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Indicadores */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
          {images.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all ${
                index === currentImageIndex ? "w-8 bg-white" : "w-2 bg-white/50"
              }`}
            ></div>
          ))}
        </div>
      </div>

      {/* Columna Derecha - Formulario */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg relative">
          {/* LOGO */}
          <div className="flex justify-center mb-6">
            <img src={logo} alt="Logo" className="w-20 h-20 rounded-full object-cover" />
          </div>
          
          <h2 className="text-2xl font-bold text-center mb-6">Iniciar sesión</h2>

          <form onSubmit={handleSubmit}>
          <FormInput
            id="email"
            label="Correo"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="correo@ejemplo.com"
          />

          <FormInput
            id="password"
            label="Contraseña"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="******"
          />

            {error && <p className="text-red-500 mb-2">{error}</p>}

            <button className="w-full bg-blue-600 text-white py-3 rounded-lg mt-4 font-medium hover:bg-blue-700 transition-colors">
              Entrar
            </button>
          </form>

          {/* Divisor */}
          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="px-3 text-gray-500 text-sm">o continúa con</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          {/* Botones de redes sociales */}
          <div className="space-y-3">
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full bg-white border-2 border-gray-200 text-gray-700 py-3 px-4 rounded-lg flex items-center justify-center gap-3 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 shadow-sm font-medium"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continuar con Google
            </button>

            <button
              type="button"
              onClick={handleFacebookLogin}
              className="w-full bg-blue-100 border-2 border-blue-200 text-blue-700 py-3 px-4 rounded-lg flex items-center justify-center gap-3 hover:bg-blue-200 hover:border-blue-300 transition-all duration-200 shadow-sm font-medium"
            >
              <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Continuar con Facebook
            </button>
          </div>

          <p className="mt-6 text-center text-sm">
            ¿No tienes cuenta?{" "}
            <span
              onClick={() => navigate("/register")}
              className="text-blue-700 cursor-pointer font-semibold hover:underline"
            >
              Regístrate
            </span>
          </p>

          <p className="mt-3 text-center text-sm">
            ¿Olvidaste tu contraseña?{" "}
            <span
              onClick={() => navigate("/forgot-password")}
              className="text-blue-700 cursor-pointer font-semibold hover:underline"
            >
              Recuperar
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
