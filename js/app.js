/* =========================================================
   ROUTER (hash): #/  ·  #/producto/ID  ·  #/coleccion  ·  #/taller  ·  #/como-comprar
   ========================================================= */
function route() {
  const [name, id] = location.hash.replace(/^#\/?/, '').split('/');
  const app = $('#app');
  if (name === 'producto' && byId[id]) {
    const p = byId[id];
    app.innerHTML = productView(p);
    document.title = `${p.nombre} | ${CONFIG.brand}`;
    window.scrollTo(0, 0);
    return;
  }
  app.innerHTML = homeView();
  document.title = `${CONFIG.brand} | Piezas de Cerámica`;
  if (['coleccion', 'taller', 'como-comprar'].includes(name)) {
    requestAnimationFrame(() => document.getElementById(name).scrollIntoView());
  } else {
    window.scrollTo(0, 0);
  }
}

/* =========================================================
   EVENTOS
   ========================================================= */
document.addEventListener('click', e => {
  const el = e.target.closest('[data-action]');
  if (!el) return;
  const { action, id, cat } = el.dataset;
  const item = cart.find(i => i.id === id);

  switch (action) {
    case 'open-cart': openCart(); break;
    case 'close-cart': closeCart(); break;
    case 'add': addToCart(id); toast(`${byId[id].nombre} se agregó al carrito`); break;
    case 'add-page': addToCart(id, pq); toast(`${byId[id].nombre} se agregó al carrito`); break;
    case 'buy-now': addToCart(id, pq); openCart(); break;
    case 'pq-inc': pq = Math.min(MAX_QTY, pq + 1); $('#pq').textContent = pq; break;
    case 'pq-dec': pq = Math.max(1, pq - 1); $('#pq').textContent = pq; break;
    case 'inc': if (item) { item.qty = Math.min(MAX_QTY, item.qty + 1); saveCart(); renderCart(); } break;
    case 'dec': if (item) { item.qty--; if (item.qty < 1) cart = cart.filter(i => i.id !== id); saveCart(); renderCart(); } break;
    case 'remove': cart = cart.filter(i => i.id !== id); saveCart(); renderCart(); break;
    case 'clear': cart = []; saveCart(); renderCart(); break;
    case 'filter':
      filter = cat;
      $('#grid').innerHTML = gridHTML();
      document.querySelectorAll('#filters button').forEach(b => {
        const on = b.dataset.cat === filter;
        b.setAttribute('aria-pressed', on);
        b.className = 'rounded-full border px-4 py-2 text-sm font-semibold transition-colors ' + (on ? 'bg-tinta text-porcelana border-tinta' : 'border-tinta/30 hover:border-tinta');
      });
      break;
  }
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && !$('#drawer').inert) closeCart();
});
window.addEventListener('hashchange', route);

/* =========================================================
   INICIO
   ========================================================= */
$('#year').textContent = new Date().getFullYear();
$('#footer-wa').href = `https://wa.me/${CONFIG.whatsapp}`;
$('#footer-ig').href = CONFIG.instagram;
loadAddress();
renderCart();
route();
