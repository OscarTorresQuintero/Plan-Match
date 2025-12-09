# Actualizado el 09/12/2025

# Aporte individual:


-Este documento describe mi aporte individual al proyecto integrador del módulo de React.
Mi responsabilidad principal dentro del equipo es desarrollar el sistema de Autenticación, incluyendo:

-Página de Login
-Página de Registro
-Gestión de inicio y cierre de sesión
-Validaciones básicas
-Conexión con MockAPI para almacenar y consultar usuarios
-Componentes reutilizables para formularios
-Manejo de estado y eventos en React
-Estilos con tailwind o css bien estructurado

# Mi responsabilidad del módulo asignado

Mi módulo corresponde a:

# Miembro 1 — Autenticación (Login y Registro)

Este módulo permite que el usuario:

-Cree una cuenta
-Inicie sesión con correo y contraseña
-Guarde datos en MockAPI
-Acceda a una pantalla privada después del login
-Cierre sesión

# Estructura del proyecto

PLAN-MATCH-CLONE/
│
├── public/
│   └── vite.svg
│
├── src/
│   ├── assets/
│   │   ├── react.svg
│   │   ├── IMAGENES         
│   │   
│   │
│   ├── components/
│   │   └── FormInput          <--- componentes reutilizables
│   │
│   ├── pages/
│   │   ├── ForgotPassword.jsx
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   └── Register.jsx
|   |
|   |
│   |── services/
|   |   └──Api.js
|   |
|   |
|   |
│   ├── App.jsx
│   ├── index.jsx
│   └── main.css
│
├── package-lock.json
├── tailwind.config.js
├── postcss.config.js
├── package.json
└── README.md
└── vite.config.js

# Paginas incluidas

-Login – Inicio de sesión
-Register – Crear cuenta
-ForgotPassword – Recuperación de contraseña
-Home – Página principal


# Para q sirven el componente

 FormInput.jsx (reutilizable)

-Componente que simplifica inputs repetidos en formularios.
-Recibe props: label, type, value, onChange, placeholder.
-Mantiene el código limpio en Login, Registro y ForgotPassword.

# Para q sirven las pages

- # Login.jsx

Página para que el usuario acceda. Usa FormInput y muestra el logo.

- # Register.jsx

Página para registrar una nueva cuenta.

- # ForgotPassword.jsx

Formulario para recuperar la contraseña.

- # Home.jsx

Pantalla principal básica.
