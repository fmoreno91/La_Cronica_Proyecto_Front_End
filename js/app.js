/* ================================================================
   La Crónica — Utilidades compartidas
   Funciones reutilizables en todas las páginas.
================================================================ */

/* ── Navegación activa ───────────────────────────────────────── */

/**
 * Marca el enlace de navegación correspondiente a la página actual.
 * @param {string} pageId  — coincide con data-page en los .nav-link
 */
function setActiveNav(pageId) {
  document.querySelectorAll(".nav-link[data-page]").forEach(link => {
    link.classList.toggle("active", link.dataset.page === pageId);
  });
}

/* ── Badge de favoritos en el nav ─────────────────────────────── */

function updateFavBadge() {
  const count = getFavoritos().length;
  document.querySelectorAll(".fav-badge").forEach(el => {
    el.textContent = count;
    el.style.display = count > 0 ? "flex" : "none";
  });
}

/* ── Menú hamburguesa ────────────────────────────────────────── */

function initHamburger() {
  const btn = document.getElementById("hamburger");
  const nav = document.getElementById("mobileNav");
  if (!btn || !nav) return;
  btn.addEventListener("click", () => {
    btn.classList.toggle("open");
    nav.classList.toggle("open");
  });
}

/* ── Plantilla HTML de una news-card ─────────────────────────── */

/**
 * Genera el HTML de una tarjeta de noticia.
 * @param {Object}  noticia
 * @param {boolean} fav      — estado inicial del favorito
 * @returns {string}  HTML string
 */
function renderCard(noticia, fav) {
  const favClass  = fav ? "active" : "";
  const favFill   = fav ? "currentColor" : "none";
  return `
    <article class="news-card">
      <div class="card-img-wrap">
        <img src="${noticia.image}" alt="${noticia.title}" loading="lazy">
        <span class="card-badge-wrap">
          <span class="badge badge-${noticia.category}">${noticia.category}</span>
        </span>
        <button
          class="card-fav-btn ${favClass}"
          data-id="${noticia.id}"
          aria-label="${fav ? "Quitar de favoritos" : "Agregar a favoritos"}"
        >
          <svg fill="${favFill}" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
          </svg>
        </button>
      </div>
      <div class="card-body">
        <p class="card-meta">${noticia.date} &middot; ${noticia.author}</p>
        <h3 class="card-title">${noticia.title}</h3>
        <p class="card-summary">${noticia.summary}</p>
        <div class="card-footer">
          <button class="btn-link btn-read-more" data-id="${noticia.id}">
            Leer más &rarr;
          </button>
        </div>
      </div>
    </article>`;
}

/* ── Navegación a detalle ────────────────────────────────────── */

function goToDetail(id) {
  setNoticiaActual(id);
  window.location.href = "detalle.html";
}

/* ── Binding de eventos comunes en cards ─────────────────────── */

/**
 * Agrega listeners de favoritos y "leer más" al contenedor dado.
 * @param {HTMLElement} container
 */
function bindCardEvents(container) {
  /* Favoritos */
  container.addEventListener("click", e => {
    const favBtn = e.target.closest(".card-fav-btn");
    if (favBtn) {
      const id    = parseInt(favBtn.dataset.id);
      const added = toggleFavorito(id);
      favBtn.classList.toggle("active", added);
      favBtn.setAttribute("aria-label", added ? "Quitar de favoritos" : "Agregar a favoritos");
      const svg  = favBtn.querySelector("svg");
      svg.setAttribute("fill", added ? "currentColor" : "none");
      updateFavBadge();
    }
    /* Leer más */
    const readBtn = e.target.closest(".btn-read-more");
    if (readBtn) {
      goToDetail(parseInt(readBtn.dataset.id));
    }
  });
}

/* ── Inicialización general ──────────────────────────────────── */

document.addEventListener("DOMContentLoaded", () => {
  initHamburger();
  updateFavBadge();
});
