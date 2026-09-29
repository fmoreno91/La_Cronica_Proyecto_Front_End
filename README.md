# La Crónica — Plataforma Web de Noticias

[Español](#español) | [English](#english)

---

## Español

### Descripción

La Crónica es una aplicación web tipo periódico que permite explorar noticias y experiencias de los sectores educativo, tecnológico, turístico y comercial. Los usuarios pueden consultar la información detallada de cada publicación, guardarla en favoritos y ponerse en contacto mediante un formulario.

El proyecto busca ofrecer una experiencia moderna e intuitiva y demostrar el uso de tecnologías de desarrollo web front-end.

### Funcionalidades

- **Inicio:** navegación principal, bienvenida, noticias destacadas, llamados a la acción e información general.
- **Catálogo de noticias:** publicaciones presentadas en tarjetas con imagen, título, descripción breve y acceso al detalle.
- **Detalle de noticia:** vista con información ampliada de cada publicación.
- **Favoritos:** posibilidad de guardar y consultar noticias favoritas mediante almacenamiento local del navegador.
- **Contacto:** formulario con validaciones básicas y mensaje de confirmación.
- **Administración básica:** creación y eliminación de noticias.

### Tecnologías

- HTML5
- CSS3
- JavaScript
- `localStorage` y `sessionStorage` para almacenar información en el navegador
- JSON local (`data/noticias.json`) cargado dinámicamente con `fetch()` para poblar las noticias iniciales

> **Nota:** como `fetch()` solicita un archivo local, el sitio debe servirse mediante un servidor
> local (por ejemplo, la extensión "Live Server" de VS Code o `npx serve`) en lugar de abrirse
> directamente con `file://`, ya que los navegadores bloquean esas peticiones por seguridad (CORS).
> Si no se puede cargar el JSON, la aplicación muestra un aviso con opción para reintentar y no
> guarda una lista vacía como si la carga hubiera sido exitosa.

**Angular:** forma parte de los objetivos académicos del proyecto. La versión actual de la aplicación está construida con HTML, CSS y JavaScript; Angular no está implementado todavía.

### Estructura del proyecto

```text
.
├── index.html
├── noticias.html
├── detalle.html
├── favoritos.html
├── contacto.html
├── admin.html
├── css/
│   └── styles.css
├── data/
│   └── noticias.json
└── js/
    ├── app.js
    └── data.js
```

### Almacenamiento y alcance

Los datos guardados mediante `localStorage` o `sessionStorage` permanecen en el navegador utilizado. No se sincronizan con otros dispositivos ni se almacenan en un servidor. El formulario de contacto valida los campos y muestra un mensaje de confirmación; es una funcionalidad de demostración y no envía mensajes a un servicio externo.

---

## English

### Description

La Crónica is a newspaper-style web application for exploring news and experiences in education, technology, tourism, and commerce. Users can view detailed information about each article, save articles to their favorites, and contact the publication through a form.

The project aims to provide a modern, intuitive experience while demonstrating front-end web development technologies.

### Features

- **Home page:** main navigation, welcome section, featured articles, calls to action, and general information.
- **News catalog:** articles displayed as cards with an image, title, short description, and a link to the full article.
- **Article details:** a page with expanded information about each article.
- **Favorites:** save and view favorite articles using the browser's local storage.
- **Contact:** a form with basic validation and a confirmation message.
- **Basic administration:** create and delete articles.

### Technologies

- HTML5
- CSS3
- JavaScript
- `localStorage` and `sessionStorage` for browser-based storage
- Local JSON data (`data/noticias.json`), loaded dynamically via `fetch()` to seed the initial articles

> **Note:** since `fetch()` requests a local file, the site must be served through a local server
> (e.g. VS Code's "Live Server" extension or `npx serve`) instead of being opened directly via
> `file://`, because browsers block those requests for security reasons (CORS).
> If the JSON cannot be loaded, the application displays an error with a retry option and does not
> store an empty list as though loading had succeeded.

**Angular:** Angular is part of the project's academic goals. The current application is built with HTML, CSS, and JavaScript; Angular has not been implemented yet.

### Project structure

```text
.
├── index.html
├── noticias.html
├── detalle.html
├── favoritos.html
├── contacto.html
├── admin.html
├── css/
│   └── styles.css
├── data/
│   └── noticias.json
└── js/
    ├── app.js
    └── data.js
```

### Storage and scope

Data saved with `localStorage` or `sessionStorage` stays in the browser where it was created. It is not synchronized across devices or stored on a server. The contact form validates its fields and displays a confirmation message; it is a demo feature and does not send messages to an external service.