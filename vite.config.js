//Autor: Angie Maritza Carrillo Fuquene
//Ficha: 3293689
//Fecha actualizacion: 08/12/2025
//Descripcion: Configuracion de Vite para el proyecto React con base path.


import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/Plan-Match/',
  plugins: [react()],
})
