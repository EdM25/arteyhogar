/* =========================================================
   CARRITO
   ========================================================= */
function addToCart(id, qty = 1) {
  const item = cart.find(i => i.id === id);
  if (item) item.qty = Math.min(MAX_QTY, item.qty + qty);
  else cart.push({ id, qty: Math.min(MAX_QTY, qty) });
  saveCart(); renderCart();
}
const cartCount = () => cart.reduce((s, i) => s + i.qty, 0);
const cartTotal = () => cart.reduce((s, i) => s + i.qty * byId[i.id].precio, 0);

function renderCart() {
  $('#cart-count').textContent = cartCount();
  const empty = cart.length === 0;
  $('#cart-empty').classList.toggle('hidden', !empty);
  $('#cart-filled').classList.toggle('hidden', empty);
  $('#cart-footer').classList.toggle('hidden', empty);
  $('#cart-subtotal').textContent = money(cartTotal());
  $('#cart-items').innerHTML = cart.map(i => {
    const p = byId[i.id];
    return `
    <li class="flex gap-4 py-4 border-b border-tinta/10">
      <a href="#/producto/${p.id}" data-action="close-cart" class="arch relative shrink-0 w-16 h-20 overflow-hidden" style="background:${p.bg}" aria-label="Ver ${p.nombre}">
        ${p.img ? visual(p) : `<div class="absolute inset-x-[8%] top-[14%] bottom-[4%]">${visual(p)}</div>`}
      </a>
      <div class="flex-1 min-w-0">
        <div class="flex justify-between gap-3">
          <p class="font-semibold leading-tight">${p.nombre}</p>
          <p class="font-semibold whitespace-nowrap">${money(p.precio * i.qty)}</p>
        </div>
        <p class="text-sm text-tinta/60">${money(p.precio)} c/u</p>
        <div class="mt-2 flex items-center justify-between">
          <div class="inline-flex items-center rounded-full border border-tinta/30" role="group" aria-label="Cantidad de ${p.nombre}">
            <button data-action="dec" data-id="${p.id}" class="w-9 h-9 rounded-full hover:bg-tinta/10" aria-label="Disminuir">−</button>
            <span class="w-7 text-center text-sm font-bold">${i.qty}</span>
            <button data-action="inc" data-id="${p.id}" class="w-9 h-9 rounded-full hover:bg-tinta/10" aria-label="Aumentar">+</button>
          </div>
          <button data-action="remove" data-id="${p.id}" class="text-sm underline text-tinta/60 hover:text-tinta">Quitar</button>
        </div>
      </div>
    </li>`;
  }).join('');
}

function openCart() {
  lastFocus = document.activeElement;
  const d = $('#drawer');
  d.inert = false;
  d.classList.remove('translate-x-full');
  $('#overlay').classList.remove('opacity-0', 'pointer-events-none');
  document.querySelectorAll('[data-page]').forEach(el => el.inert = true);
  document.body.style.overflow = 'hidden';
  hideToast();
  setTimeout(() => $('#drawer-close').focus(), 50);
}
function closeCart() {
  const d = $('#drawer');
  d.classList.add('translate-x-full');
  d.inert = true;
  $('#overlay').classList.add('opacity-0', 'pointer-events-none');
  document.querySelectorAll('[data-page]').forEach(el => el.inert = false);
  document.body.style.overflow = '';
  if (lastFocus && document.contains(lastFocus)) lastFocus.focus();
}

/* Aviso */
let toastTimer;
function toast(msg, withCart = true) {
  $('#toast-text').textContent = msg;
  $('#toast button').classList.toggle('hidden', !withCart);
  const t = $('#toast');
  t.classList.remove('translate-y-24', 'opacity-0');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(hideToast, 3500);
}
function hideToast() { $('#toast').classList.add('translate-y-24', 'opacity-0'); }

/* =========================================================
   DIRECCIÓN: se guarda en el navegador (localStorage)
   ========================================================= */
const FIELDS = { nombre: '#f-nombre', tel: '#f-tel', dir: '#f-dir', ciudad: '#f-ciudad', ref: '#f-ref', zip: '#f-zip', provincia: '#f-provincia', distrito: '#f-distrito' };

function readForm() {
  const o = {};
  for (const k in FIELDS) o[k] = $(FIELDS[k]).value.trim();
  return o;
}
function loadAddress() {
  const a = store.get(KEYS.addr, null);
  if (!a) return;
  for (const k in FIELDS) $(FIELDS[k]).value = a[k] || '';
}
function persistAddress() {
  if ($('#f-guardar').checked) store.set(KEYS.addr, readForm());
  else store.del(KEYS.addr);
}

function validate(d) {
  const errs = {};
  if (d.nombre.length < 2) errs.nombre = true;
  if (d.tel.replace(/\D/g, '').length < 7) errs.tel = true;
  if (d.dir.length < 5) errs.dir = true;
  if (d.ciudad.length < 2) errs.ciudad = true;
  for (const k in FIELDS) {
    const bad = !!errs[k];
    $(FIELDS[k]).setAttribute('aria-invalid', bad);
    const m = $(`[data-err="${k}"]`);
    if (m) m.classList.toggle('hidden', !bad);
  }
  return errs;
}

/* =========================================================
   PEDIDO POR WHATSAPP
   ========================================================= */
function buildMessage(d) {
  const lines = cart.map(i => {
    const p = byId[i.id];
    return `• ${i.qty} x ${p.nombre} - ${money(p.precio * i.qty)}`;
  });
  return [
    `*Nuevo pedido - ${CONFIG.brand}*`,
    '',
    '*Productos*',
    ...lines,
    '',
    `*Total productos:* ${money(cartTotal())}`,
    '',
    '*Datos de entrega*',
    `Nombre: ${d.nombre}`,
    `Teléfono: ${d.tel}`,
    `Cantón: ${d.ciudad}`,
    `Provincia: ${d.provincia}`,
    `Codigo Postal: ${d.zip}`,
    `Dirección: ${d.dir}`,
    d.ref ? `Referencias: ${d.ref}` : null,
    '',
    'Quedo atento/a para confirmar el costo de envío y la forma de pago. ¡Gracias!'
  ].filter(l => l !== null).join('\n');
}

function openWhatsApp(text) {
  const url = `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(text)}`;
  const a = document.createElement('a');
  a.href = url; a.target = '_blank'; a.rel = 'noopener';
  document.body.appendChild(a); a.click(); a.remove();
}

$('#checkout-form').addEventListener('submit', e => {
  console.log('Presione el boton')
  e.preventDefault();
  if (!cart.length) return;
  const data = readForm();
  const errs = validate(data);
  const first = Object.keys(errs)[0];
  if (first) { $(FIELDS[first]).focus(); return; }
  persistAddress();
  openWhatsApp(buildMessage(data));
  toast('Se abrió WhatsApp con tu pedido. Envía el mensaje para finalizar.', false);
});

['input', 'change'].forEach(ev =>
  $('#checkout-form').addEventListener(ev, e => {
    if (e.target.matches('.field')) e.target.setAttribute('aria-invalid', 'false');
    persistAddress();
  })
);
