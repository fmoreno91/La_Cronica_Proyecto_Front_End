/* ================================================================
   La Crónica — Datos de Noticias
   Fuente de verdad: data/noticias.json (renderizado dinámico desde JSON).
   Se cargan una única vez y luego se almacenan y leen desde
   localStorage bajo la clave "lacronica_news".
================================================================ */

const NOTICIAS_JSON_URL = "data/noticias.json";

function showNoticiasLoadError() {
  if (document.getElementById("news-load-error")) return;

  const notice = document.createElement("section");
  notice.id = "news-load-error";
  notice.className = "news-load-error";
  notice.setAttribute("role", "alert");

  const message = document.createElement("p");
  message.textContent =
    "No se pudieron cargar las noticias. Comprueba tu conexión y que el proyecto esté abierto mediante un servidor local.";

  const retryButton = document.createElement("button");
  retryButton.className = "btn btn-outline";
  retryButton.type = "button";
  retryButton.textContent = "Reintentar";
  retryButton.addEventListener("click", async () => {
    retryButton.disabled = true;
    retryButton.textContent = "Cargando...";
    try {
      await initNoticias();
      window.location.reload();
    } catch {
      retryButton.disabled = false;
      retryButton.textContent = "Reintentar";
    }
  });

  notice.append(message, retryButton);
  const main = document.querySelector("main");
  (main || document.body).prepend(notice);
}

/**
 * Carga las noticias iniciales desde data/noticias.json mediante fetch.
 * Debe invocarse (y esperarse) antes de usar getNoticias()/getNoticiaById()
 * en cualquier página. Si ya existen noticias en localStorage no vuelve
 * a solicitar el archivo.
 * @returns {Promise<Array>} noticias disponibles tras la inicialización
 */
async function initNoticias() {
  const stored = localStorage.getItem("lacronica_news");
  if (stored) {
    try { return JSON.parse(stored); }
    catch (err) {
      console.warn("Los datos guardados de noticias están dañados; se volverán a cargar desde el JSON.", err);
      localStorage.removeItem("lacronica_news");
    }
  }

  try {
    const response = await fetch(NOTICIAS_JSON_URL);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const noticias = await response.json();
    if (!Array.isArray(noticias)) {
      throw new Error(`${NOTICIAS_JSON_URL} debe contener un arreglo de noticias.`);
    }
    localStorage.setItem("lacronica_news", JSON.stringify(noticias));
    return noticias;
  } catch (err) {
    showNoticiasLoadError();
    console.error(
      `No se pudo cargar ${NOTICIAS_JSON_URL}. Si abriste el archivo ` +
      `directamente (file://), sirve el proyecto con un servidor local ` +
      `(por ejemplo, la extensión "Live Server") para permitir fetch().`,
      err
    );
    throw err;
  }
}

/* ── Funciones de acceso a datos ─────────────────────────────── */

/**
 * Devuelve el array de noticias desde localStorage.
 * Requiere haber ejecutado antes `await initNoticias()`.
 */
function getNoticias() {
  const stored = localStorage.getItem("lacronica_news");
  if (stored) {
    try { return JSON.parse(stored); }
    catch (e) { /* datos corruptos */ }
  }
  return [];
}

/** Persiste el array de noticias en localStorage. */
function saveNoticias(arr) {
  localStorage.setItem("lacronica_news", JSON.stringify(arr));
}

/** Busca una noticia por id. Devuelve el objeto o null. */
function getNoticiaById(id) {
  return getNoticias().find(n => n.id === id) || null;
}

/**
 * Agrega una nueva noticia.
 * @param {Object} data  — campos sin id
 * @returns {Object}     — noticia creada
 */
function addNoticia(data) {
  const arr = getNoticias();
  const newId = arr.length > 0 ? Math.max(...arr.map(n => n.id)) + 1 : 1;
  const noticia = { ...data, id: newId };
  arr.unshift(noticia);          /* más reciente primero */
  saveNoticias(arr);
  return noticia;
}

/**
 * Elimina la noticia con el id dado.
 * @param {number} id
 */
function deleteNoticia(id) {
  const arr = getNoticias().filter(n => n.id !== id);
  saveNoticias(arr);
  /* también borrar de favoritos */
  const favs = getFavoritos().filter(f => f !== id);
  saveFavoritos(favs);
}

/* ── Favoritos ───────────────────────────────────────────────── */

function getFavoritos() {
  const stored = localStorage.getItem("lacronica_favorites");
  if (stored) { try { return JSON.parse(stored); } catch(e) {} }
  return [];
}

function saveFavoritos(arr) {
  localStorage.setItem("lacronica_favorites", JSON.stringify(arr));
}

function isFavorito(id) {
  return getFavoritos().includes(id);
}

function toggleFavorito(id) {
  const favs = getFavoritos();
  const idx  = favs.indexOf(id);
  if (idx === -1) { favs.push(id); }
  else            { favs.splice(idx, 1); }
  saveFavoritos(favs);
  return idx === -1; /* true = fue añadido */
}

/* ── Noticia actual (para la página de detalle) ──────────────── */

function setNoticiaActual(id) {
  sessionStorage.setItem("lacronica_current", id);
}

function getNoticiaActual() {
  const id = parseInt(sessionStorage.getItem("lacronica_current"));
  return isNaN(id) ? null : getNoticiaById(id);
}
