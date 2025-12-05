ChatGPT Plus
Plan Match Readme
Plan Match
Aplicación web para explorar lugares turísticos alrededor del mundo.
Descripción Plan Match permite a los usuarios:
Ver galerías de fotos de 60 lugares turísticos.
Consultar información detallada (precio, rating, descripción).
Navegar con un diseño responsivo y accesible.
Tecnologías
React 19.2.0
Vite 7.2.4
Tailwind CSS
JavaScript ES6+
ESLint 9.39.1
Estructura Principal src/ ├── components/ │ ├── placeDetail/ │ │ ├── PlaceDetail.jsx │ │ ├── ImageGallery.jsx │ │ └── InfoSection.jsx │ └── PlacesList.jsx ├── data/lugares.js ├── App.jsx ├── App.css └── main.jsx

Instalación npm install npm run dev

App en: http://localhost:5173

Build y lint: npm run build npm run lint

Vistas

Home / Galería: Grid con tarjetas de lugares.

Detalle de Lugar: Galería de imágenes + información completa.

Lista de Lugares: Renderizado dinámico de todos los lugares.

Componentes

PlaceDetail.jsx – Contenedor principal.

ImageGallery.jsx – Galería interactiva.

InfoSection.jsx – Información estructurada.

PlacesList.jsx – Lista dinámica de lugares.

Datos

Archivo: /src/data/lugares.js

Simula una API local con 60 lugares: { id: 1, nombre: "Machu Picchu", pais: "Perú", descripcion: "...", imagen: "URL", rating: 5, precioCOP: 480000 }

Estado y Eventos const [selectedPlace, setSelectedPlace] = useState(lugares[0]); const [showDetail, setShowDetail] = useState(false);

onClick: Selección de lugar

onSubmit: Navegación entre vistas

Buenas Prácticas

Accesibilidad básica (labels, ARIA, teclado)

Diseño limpio y responsive

Código modular y legible

Optimización de imágenes y listas

Git

Repositorio: https://github.com/felipecarrillo-eng/mi-web

Branch: actividad-1

Autor
