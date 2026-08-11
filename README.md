# Sistema de Gestión de Cursos - Cesde

Aplicación web para gestionar la información de los cursos y docentes de Cesde. Desarrollada con React, Vite y JSON-Server para el backend simulado.

## Características Implementadas

- **Gestión de Docentes:** CRUD completo (Crear, Leer, Actualizar, Eliminar).
- **Gestión de Cursos:** CRUD completo.
- **Filtros de Búsqueda:**
  - Búsqueda por nombre de curso.
  - Filtrado por docente asignado.
  - Filtrado por precio máximo.
- **Validación de Formularios:** Validaciones en los campos obligatorios, formato de correo, y validación de números positivos.
- **Diseño UI/UX:** Interfaz gráfica premium utilizando CSS puro (variables CSS, flexbox, grid, glassmorphism, sombras). Diseño 100% responsivo para móviles, tablets y escritorio.

## Tecnologías Utilizadas

- **Frontend:** React 19, Vite.
- **Enrutamiento:** React Router DOM.
- **Íconos:** Lucide React.
- **Estilos:** Vanilla CSS.
- **Backend:** JSON-Server v1 (Simulación de API RESTful).

## Requisitos Previos

- Node.js (v18 o superior recomendado)
- npm o yarn

## Instrucciones de Instalación y Ejecución

1. **Instalar dependencias:**
   ```bash
   npm install
   ```

2. **Iniciar la aplicación (Frontend y Backend):**
   Para esta aplicación, se requiere tener ambos servidores corriendo simultáneamente. Abre dos terminales en la carpeta raíz del proyecto y ejecuta los siguientes comandos:

   **Terminal 1 (Backend - JSON Server):**
   Levanta la base de datos simulada en el puerto 3001.
   ```bash
   npm run server
   ```

   **Terminal 2 (Frontend - React/Vite):**
   Inicia la aplicación de React.
   ```bash
   npm run dev
   ```

3. **Acceder a la aplicación:**
   Abre tu navegador y dirígete a `http://localhost:5173` (o el puerto que te indique Vite en la consola).

## Estructura del Proyecto

- `db.json`: Base de datos simulada.
- `src/index.css`: Sistema de diseño y estilos globales.
- `src/App.jsx`: Configuración de rutas y layout principal (Sidebar).
- `src/pages/Cursos.jsx`: Componente principal para listar, filtrar y gestionar cursos.
- `src/pages/Docentes.jsx`: Componente principal para gestionar docentes.
- `src/services/api.js`: Lógica de peticiones HTTP con Fetch API.
