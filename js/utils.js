/* =========================================================
   UTILIDADES Y ESTADO
   ========================================================= */
const $ = (s, r = document) => r.querySelector(s);
const money = n => CONFIG.symbol + n.toFixed(2);
const store = {
  get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch { return d; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} },
  del(k) { try { localStorage.removeItem(k); } catch {} }
};
const KEYS = { cart: 'esmalte.carrito', addr: 'esmalte.direccion' };

let cart = store.get(KEYS.cart, []).filter(i => byId[i.id] && i.qty > 0);
let filter = 'Todo';
let pq = 1;
let lastFocus = null;
const MAX_QTY = 10;
const saveCart = () => store.set(KEYS.cart, cart);
