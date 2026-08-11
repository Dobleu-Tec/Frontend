 Sistema de Gestión de Cursos - Cesde

Prueba Técnica – Gestión de Cursos CESDE

 Descripción

Desarrollar una aplicación web para gestionar los cursos y docentes de CESDE. La aplicación debe permitir a los administradores registrar, consultar, editar y eliminar cursos, así como administrar los docentes asociados.
 Información de los cursos

* Nombre.
* Descripción.
* Duración en semanas.
* Precio.
* Fecha y hora de inicio.
* Docente asignado.

 Información de los docentes

* Nombre.
* Documento.
* Correo electrónico.

Requisitos técnicos

1. Implementar el backend utilizando JSON Server o Firebase.
2. Incorporar mínimo 3 filtros de búsqueda.
3. Publicar el proyecto en un repositorio de GitHub.
4. Incluir un README con la instalación, configuración y ejecución.
5. Implementar validaciones en los formularios.
6. Garantizar un diseño responsive.
7. Aplicar buenas prácticas de UX/UI para facilitar la navegación y uso de la aplicación.
Claro. Puedes agregar esta sección al final del README:

Instalación y ejecución

 1. Clonar el repositorio

```bash
git clone URL_DEL_REPOSITORIO
cd NOMBRE_DEL_PROYECTO
```

 2. Instalar dependencias

```bash
npm install
```

3. Iniciar JSON Server

```bash
npm run server
```

El backend estará disponible en:

```text
http://localhost:3001
```

4. Ejecutar la aplicación

En otra terminal, ejecutar:

```bash
npm run dev
```

La aplicación estará disponible en:

```text
http://localhost:5173
```

 5. Acceso

Abrir la URL indicada en el navegador y comenzar a utilizar la aplicación.

Consideraciones

 Tener instalado Node.js y npm.
 Ejecutar JSON Server antes de utilizar las funcionalidades que requieren acceso a los datos.
 Verificar que los puertos utilizados por el frontend y JSON Server estén disponibles.

