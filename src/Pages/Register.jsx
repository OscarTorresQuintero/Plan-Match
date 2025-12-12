//Autor: Angie Maritza Carrillo Fuquene
//Ficha: 3293689
//Fecha actualizacion: 08/12/2025
//Descripcion: Pagina de registro de usuario con formulario,
// validacion de campos, registro con Google y Facebook,
// y carrusel de imagenes con testimonios.

// Dependencias necesarias para la pagina de registro
//UseState para manejar el estado de los campos y la navegacion para redirigir al login
//useEffect para el carrusel de imagenes
//logo para mostrar el logo en la pagina
//registerUser para llamar a la API de registro
//useNavigate para redirigir al usuario despues de registrarse
import React, { useState, useEffect } from "react";
import FormInput from "../components/FormInput.jsx";
import { registerUser } from "../service/api.js";
import { useNavigate } from "react-router-dom";
import logo from "../assets/imagen.jpg";
import avion from "../assets/avion.avif";
import hawai from "../assets/hawai.jpg";
import new2 from "../assets/new2.jpg";
import playa from "../assets/playa.avif";
import agua from "../assets/agua.jpg";
import atardecer from "../assets/atardecer.jpg";
import volando from "../assets/volando.jpg";

// Componente principal de la pagina de registro
const Register = () => {
  const navigate = useNavigate();
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
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);
  
  // Estado del formulario
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });

  // Estado de errores y exito
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  // Manejar cambios en los campos del formulario
  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const validate = () => {
    let newErrors = {};

    // Validaciones de los campos
    if (!form.name) newErrors.name = "Nombre requerido";
    if (!form.email) newErrors.email = "Correo requerido";
    if (!/\S+@\S+\.\S+/.test(form.email))
      newErrors.email = "Correo no válido";

    if (!form.password) newErrors.password = "Contraseña requerida";
    if (form.password.length < 6)
      newErrors.password = "Debe tener mínimo 6 caracteres";

    if (form.confirm !== form.password)
      newErrors.confirm = "Las contraseñas no coinciden";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // Manejar el envio del formulario de registro
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    await registerUser({
      name: form.name,
      email: form.email,
      password: form.password,
    });

    // Mostrar mensaje de exito
    setSuccess("Usuario registrado correctamente");
    setForm({ name: "", email: "", password: "", confirm: "" });
    
    // Redirigir a login después de 1.5 segundos
    setTimeout(() => {
      navigate("/login");
    }, 1500);
  };

  // Manejar el registro con Google
  const handleGoogleSignup = () => {
    // Implementar registro con Google
    console.log("Registro con Google");
  };

  const handleFacebookSignup = () => {
    // Implementar registro con Facebook
    console.log("Registro con Facebook");
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
            <h1 className="text-xl font-semibold mb-2" style={{fontFamily: "'Georgia', 'Garamond', serif", fontWeight: "600", letterSpacing: "0.05em"}}>Comienza tu aventura</h1>
            <p className="text-xs opacity-95 mb-0" style={{fontFamily: "'Georgia', 'Garamond', serif", fontWeight: "400", letterSpacing: "0.02em"}}>Únete a nuestra comunidad y descubre un mundo de posibilidades</p>
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
          {/* Botón de volver */}
          <button
            onClick={() => navigate("/login")}
            className="absolute top-4 left-4 text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="Volver"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* LOGO */}
          <div className="flex justify-center mb-6">
            <img src={logo} alt="Logo" className="w-20 h-20 rounded-full object-cover" />
          </div>
          
          <h2 className="text-2xl font-bold mb-6 text-center">Crear cuenta</h2>

          <form onSubmit={handleSubmit}>
            <FormInput
              id="name"
              label="Nombre"
              type="text"
              value={form.name}
              onChange={handleChange}
              placeholder="Tu nombre"
              error={errors.name}
            />

            <FormInput
              id="email"
              label="Correo"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="correo@ejemplo.com"
              error={errors.email}
            />

            <FormInput
              id="password"
              label="Contraseña"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="******"
              error={errors.password}
            />

            <FormInput
              id="confirm"
              label="Confirmar contraseña"
              type="password"
              value={form.confirm}
              onChange={handleChange}
              placeholder="******"
              error={errors.confirm}
            />

            {/* Política de privacidad */}
            <div className="mt-4 mb-4">
              <label className="flex items-start text-xs text-gray-600">
                <input type="checkbox" required className="mt-0.5 mr-2" />
                <span>
                  Al registrarme, acepto los{" "}
                  <a href="#" className="text-blue-600 hover:underline">Términos y Condiciones</a>
                  {" "}y la{" "}
                  <a href="#" className="text-blue-600 hover:underline">Política de Privacidad</a>
                </span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Registrarse
            </button>

            {success && (
              <p className="text-green-600 mt-3 text-center font-medium">{success}</p>
            )}
          </form>

          {/* Divisor */}
          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="px-3 text-gray-500 text-sm">o regístrate con</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          {/* Botones de redes sociales */}
          <div className="space-y-3">
            <button
              type="button"
              onClick={handleGoogleSignup}
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
              onClick={handleFacebookSignup}
              className="w-full bg-blue-100 border-2 border-blue-200 text-blue-700 py-3 px-4 rounded-lg flex items-center justify-center gap-3 hover:bg-blue-200 hover:border-blue-300 transition-all duration-200 shadow-sm font-medium"
            >
              <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Continuar con Facebook
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
