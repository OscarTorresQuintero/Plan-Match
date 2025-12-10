# 🌍 Plan Match - Plataforma de Descubrimiento de Lugares Turísticos

> Aplicación web interactiva desarrollada con React, Vite y Tailwind CSS para explorar y conocer lugares turísticos alrededor del mundo.

## 📋 Tabla de Contenidos

- [Descripción General](#descripción-general)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Estructura de Carpetas](#estructura-de-carpetas)
- [Instalación y Ejecución](#instalación-y-ejecución)
- [Vistas Principales](#vistas-principales)
- [Componentes Reutilizables](#componentes-reutilizables)
- [Consumo de API](#consumo-de-api)
- [Gestión de Estado](#gestión-de-estado)
- [Buenas Prácticas Implementadas](#buenas-prácticas-implementadas)
- [Control de Versiones](#control-de-versiones)
- [Créditos del Equipo](#créditos-del-equipo)

---

## 📌 Descripción General

**Plan Match** es una aplicación web interactiva que permite a los usuarios explorar una colección de 60 lugares turísticos de todo el mundo. La plataforma ofrece:

- 🖼️ **Galería visual** de lugares con fotos de alta calidad
- 📊 **Información detallada** de cada lugar (precio, rating, descripción)
- 🎨 **Diseño responsivo** y atractivo
- ⚡ **Navegación fluida** entre vistas
- ♿ **Accesibilidad básica** implementada

---

## 🛠️ Tecnologías Utilizadas

| Tecnología | Versión | Propósito |
|-----------|---------|----------|
| React | 19.2.0 | Framework principal |
| Vite | 7.2.4 | Bundler y dev server |
| Tailwind CSS | Integrado | Estilos utility-first |
| JavaScript ES6+ | - | Lenguaje de programación |
| ESLint | 9.39.1 | Calidad de código |

---

## 📦 Estructura de Carpetas

```
src/
├── components/
│   ├── placeDetail/
│   │   ├── PlaceDetail.jsx       # Vista detallada
│   │   ├── ImageGallery.jsx      # Galería de fotos
│   │   └── InfoSection.jsx       # Información del lugar
│   └── PlacesList.jsx            # Lista de lugares
├── data/
│   └── lugares.js                # Base de datos (60 lugares)
├── App.jsx                       # Componente principal
├── App.css                       # Estilos principales
└── main.jsx                      # Punto de entrada
```

---

## 🚀 Instalación y Ejecución

### Instalación
```bash
npm install
npm run dev
```

La app estará en `http://localhost:5173`

### Build
```bash
npm run build
npm run lint
```

---

## 📄 Vistas Principales

### ✅ Vista 1: Home / Galería (3+ componentes)
- Grid responsivo de 60 lugares
- Tarjetas con imagen, nombre, país, rating, precio
- Efectos hover animados

### ✅ Vista 2: Detalle de Lugar
- ImageGallery con fotos
- InfoSection con información completa
- Layout responsive con grid

### ✅ Vista 3: Lista de Lugares
- Renderizado dinámico con `.map()`
- Keys estables (id)
- Empty states

---

## 🧩 Componentes Reutilizables

1. **PlaceDetail.jsx** - Contenedor principal
2. **ImageGallery.jsx** - Galería interactiva
3. **InfoSection.jsx** - Información estructurada
4. **PlacesList.jsx** - Lista dinámica

**Características**:
- ✅ Modulares y parametrizables
- ✅ Props claramente definidas
- ✅ Reutilizables en diferentes contextos

---

## 🔌 Consumo de API

**Tipo**: Datos simulados (JSON local)  
**Archivo**: `/src/data/lugares.js`  
**Total**: 60 lugares con propiedades completas

**Estructura**:
```javascript
{
  id: 1,
  nombre: "Machu Picchu",
  pais: "Perú",
  descripcion: "...",
  imagen: "URL",
  rating: 5,
  precioCOP: 480000
}
```

**Carga**: Importación directa en App.jsx  
**Estados**: Loading, error, empty states implementados

---

## 📊 Gestión de Estado

### useState Implementado
```javascript
const [selectedPlace, setSelectedPlace] = useState(lugares[0]);
const [showDetail, setShowDetail] = useState(false);
```

### Eventos
- `onClick`: Seleccionar lugar, cambiar imagen
- `onSubmit`: Navegación entre vistas

---

## ♿ Buenas Prácticas Implementadas

✅ **Accesibilidad**
- Labels asociados
- Roles ARIA
- Contrastes adecuados
- Navegación con teclado

✅ **Diseño Profesional**
- Layout limpio
- Espaciados consistentes
- Paleta de colores coherente
- Responsive design

✅ **Código Limpio**
- Nombres descriptivos
- Separación de responsabilidades
- Sin duplicación
- JSX legible

✅ **Rendimiento**
- Keys en listas
- Imágenes optimizadas
- Sin renders innecesarios

---

## 🌳 Control de Versiones

**Repositorio**: https://github.com/felipecarrillo-eng/mi-web  
**Branch**: `actividad-1`  
**Flujo**: Feature branches → Pull Requests → Main

---

## 👥 Créditos del Equipo

### Miembro 4: Manuel Carrillo

**Componentes Desarrollados**:
- ✅ PlaceDetail.jsx
- ✅ ImageGallery.jsx
- ✅ InfoSection.jsx
- ✅ App.css (estilos principales)

**Responsabilidades**:
- Módulo PlaceDetail completo
- Gestión de estado
- Diseño responsivo
- Accesibilidad

---

## ✅ Checklist de Requisitos

- [x] Estructura con Vite + React
- [x] Carpetas organizadas
- [x] Mínimo 3 vistas funcionales
- [x] Múltiples componentes (4+)
- [x] useState y eventos
- [x] API simulada con JSON
- [x] Listas dinámicas con keys
- [x] Accesibilidad básica
- [x] Diseño profesional
- [x] Código limpio
- [x] Git y GitHub
- [x] README completo
- [x] BITACORA.md

---

**Última actualización**: 4 de Diciembre de 2025  
**Versión**: 1.0.0  
**Estado**: ✅ Funcional y listo para evaluación
