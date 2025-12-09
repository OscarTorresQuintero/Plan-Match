//Autor: Angie Maritza Carrillo Fuquene
//Ficha: 3293689
//Fecha actualizacion: 08/12/2025
//Descripcion: Pagina para recuperar la contraseña de usuario, incluyendo
// envio de codigo de verificacion y restablecimiento de la contraseña.

// Dependencias necesarias para la pagina de recuperar contraseña
//UseState para manejar el estado de los campos y la navegacion para redirigir al login
//useNavigate para redirigir al usuario despues de cambiar la contraseña
//logo para mostrar el logo en la pagina
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/imagen.jpg";

// Componente principal de la pagina de recuperar contraseña
const ForgotPassword = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [step, setStep] = useState(1); // 1: email, 2: code, 3: password
    const [code, setCode] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    // Manejar el envio del email para recuperar la contraseña
    const handleSendEmail = (e) => {
        e.preventDefault();
        if (!email) {
            setError("Por favor ingresa tu correo");
            return;
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
            setError("Correo no válido");
            return;
        }
        // Simular envío de email con código
        setSuccess("Código de verificación enviado a tu correo");
        setError("");
        setStep(2);
    };

    // Manejar la verificación del código recibido por email
    const handleVerifyCode = (e) => {
        e.preventDefault();
        if (!code) {
            setError("Por favor ingresa el código");
            return;
        }
        // Simular verificación de código (cualquier código funciona para demo)
        setSuccess("Código verificado correctamente");
        setError("");
        setStep(3);
    };

    // Manejar el restablecimiento de la contraseña
    const handleResetPassword = (e) => {
        e.preventDefault();
        if (!newPassword) {
            setError("Por favor ingresa la nueva contraseña");
            return;
        }
        if (newPassword.length < 6) {
            setError("Debe tener mínimo 6 caracteres");
            return;
        }
        if (newPassword !== confirmPassword) {
            setError("Las contraseñas no coinciden");
            return;
        }
        // Simular cambio de contraseña
        setSuccess("Contraseña actualizada correctamente");
        setError("");
        setTimeout(() => {
            navigate("/login");
        }, 1500);
    };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-8">
        <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg">
            {/* LOGO */}
            <div className="flex justify-center mb-6">
                <img src={logo} alt="Logo" className="w-20 h-20 rounded-full object-cover" />
            </div>

            <h2 className="text-2xl font-bold text-center mb-2">Recuperar contraseña</h2>
            <p className="text-center text-gray-600 text-sm mb-6">
                {step === 1 && "Ingresa tu correo para recibir un código"}
                {step === 2 && "Ingresa el código que recibiste"}
                {step === 3 && "Crea tu nueva contraseña"}
            </p>

            {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}
            {success && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">{success}</div>}

            {/* Paso 1: Email */}
            {step === 1 && (
                <form onSubmit={handleSendEmail}>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2">Correo electrónico</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="tu@correo.com"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                        Enviar código
                    </button>
                </form>
            )}

            {/* Paso 2: Código */}
            {step === 2 && (
                <form onSubmit={handleVerifyCode}>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2">Código de verificación</label>
                        <p className="text-xs text-gray-500 mb-2">Revisa tu correo y copia el código</p>
                        <input
                            type="text"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            placeholder="000000"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-center text-2xl tracking-widest"
                        />
                    </div>
                    <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                        Verificar código
                    </button>
                </form>
            )}

            {/* Paso 3: Nueva contraseña */}
            {step === 3 && (
                <form onSubmit={handleResetPassword}>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2">Nueva contraseña</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                placeholder="••••••"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 pr-10"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                            >
                                {showPassword ? "👁️" : "👁️‍🗨️"}
                            </button>
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2">Confirmar contraseña</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="••••••"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                        />
                    </div>

                    <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                        Actualizar contraseña
                    </button>
                </form>
            )}

            <p className="mt-6 text-center text-sm">
                ¿Recordaste tu contraseña?{" "}
                <span
                    onClick={() => navigate("/login")}
                    className="text-blue-700 cursor-pointer font-semibold hover:underline"
                >
                    Volver a iniciar sesión
                </span>
            </p>
        </div>
    </div>
  );
};


export default ForgotPassword;
