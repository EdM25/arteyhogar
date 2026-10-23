/* =========================================================
   VISTAS
   ========================================================= */
const card = p => `
<article>
  <a href="#/producto/${p.id}" class="block" aria-label="${p.nombre}, ver producto">
    <div class="arch relative aspect-[4/5] overflow-hidden" style="background:${p.bg}">${frame(p)}</div>
  </a>
  <div class="mt-4 flex items-start justify-between gap-4">
    <div>
      <h3 class="font-bold text-lg leading-tight"><a href="#/producto/${p.id}" class="hover:text-cobalto">${p.nombre}</a></h3>
      <p class="text-sm text-tinta/60 mt-0.5">${p.corto}</p>
    </div>
    <p class="font-bold whitespace-nowrap">${money(p.precio)}</p>
  </div>
  <button data-action="add" data-id="${p.id}" class="mt-3 w-full rounded-full border border-tinta py-2.5 text-sm font-semibold hover:bg-tinta hover:text-porcelana transition-colors">Agregar al carrito</button>
</article>`;

function gridHTML() {
  const list = filter === 'Todo' ? PRODUCTS : PRODUCTS.filter(p => p.cat === filter);
  return list.map(card).join('');
}

function homeView() {
  const hero = [
    ['jarron-marea', '#A8C3B5', '100%', '0s'],
    ['jarron-luna', '#243C8C', '76%', '.12s'],
    ['taza-alba', '#D9A55B', '56%', '.24s']
  ].map(([id, bg, h, delay]) => `
    <div class="arch rise relative overflow-hidden" style="background:${bg};height:${h};animation-delay:${delay}">
      <div class="absolute inset-x-[10%] top-[18%] bottom-[6%]">${ceramic(byId[id].art, byId[id].nombre)}</div>
    </div>`).join('');

  const steps = [
    ['Elaboración', 'Creamos cada pieza de cerámica y cada vela a mano, cuidando cada detalle con amor y dedicación.'],
    ['Dandole Vida', 'Las pintamos y personalizamos a tu gusto para que tengas algo verdaderamente único.'],
    ['Detalles', 'Cada detalle en nuestras piezas es cuidado al milímetro y las esmaltamos. Por eso, ninguna pieza queda idéntica a otra.'],
    ['Nuestras velas', 'Cada una de nuestras velas es vertida a mano una a una, utilizando cera de parafina y fragancias seleccionadas. Diseñadas para iluminar tu espacio y transformar la vibra de tu hogar con luz, aroma y calma.']
  ].map(([t, d]) => `
    <div class="border-t border-porcelana/30 pt-4">
      <h3 class="text-xl font-bold">${t}</h3>
      <p class="mt-2 text-porcelana/75 font-serif text-lg leading-snug">${d}</p>
    </div>`).join('');

  const buy = [
    ['Elige tus piezas', 'Agrega al carrito lo que te guste. Puedes ajustar las cantidades cuando quieras.'],
    ['Completa tu dirección', 'Escribe tus datos de entrega una sola vez. Quedan guardados en tu dispositivo.'],
    ['Envía el pedido por WhatsApp', 'Al presionar comprar se abre un mensaje con tu pedido y tu dirección listos para enviar.']
  ].map(([t, d], i) => `
    <li class="flex gap-5">
      <span class="shrink-0 w-12 h-14 arch bg-cobalto text-white grid place-items-center pt-3 text-xl font-extrabold" aria-hidden="true">${i + 1}</span>
      <div><h3 class="text-xl font-bold">${t}</h3><p class="mt-1 text-tinta/70 font-serif text-lg leading-snug max-w-sm">${d}</p></div>
    </li>`).join('');

  return `
  <section class="mx-auto max-w-7xl px-5 pt-10 pb-16 sm:pt-16 grid lg:grid-cols-12 gap-10 items-center">
    <div class="lg:col-span-6">
      <h1 class="text-5xl sm:text-6xl xl:text-7xl font-extrabold tracking-tight leading-[.98]">Cerámica hecha a mano, esmaltada una pieza a la vez</h1>
      <p class="mt-6 text-xl text-tinta/75 font-serif leading-snug max-w-lg">Jarrones, Piezas de Ceramica, Velas Aromaticas, todo lo hacemos en nuestro taller. Arma tu pedido y envíalo por WhatsApp: coordinamos el pago y el envío contigo.</p>
      <div class="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
        <a href="#/coleccion" class="rounded-full bg-cobalto hover:bg-cobalto-oscuro text-white px-8 py-4 font-bold">Ver la colección</a>
        <a href="#/como-comprar" class="font-semibold underline underline-offset-4 decoration-2 decoration-celadon hover:decoration-cobalto">Cómo comprar</a>
      </div>
    </div>
    <div class="lg:col-span-6">
      <div class="grid grid-cols-3 gap-3 sm:gap-4 items-end h-[380px] sm:h-[500px]" role="img" aria-label="Desde Jarrones, Velas, y más.">${hero}</div>
    </div>
  </section>

  <section id="coleccion" class="scroll-mt-20 mx-auto max-w-7xl px-5 py-16">
    <div class="flex flex-wrap items-end justify-between gap-6">
      <div>
        <h2 class="text-4xl sm:text-5xl font-extrabold tracking-tight">La colección</h2>
        <p class="mt-3 text-lg text-tinta/70 font-serif max-w-md">Cada pieza es única: el tono y la forma pueden variar ligeramente de la fotografía.</p>
      </div>
      <div id="filters" class="flex flex-wrap gap-2" role="group" aria-label="Filtrar por categoría">
        ${CATS.map(c => `<button data-action="filter" data-cat="${c}" aria-pressed="${c === filter}" class="rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${c === filter ? 'bg-tinta text-porcelana border-tinta' : 'border-tinta/30 hover:border-tinta'}">${c}</button>`).join('')}
      </div>
    </div>
    <div id="grid" class="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">${gridHTML()}</div>
  </section>

  <section id="taller" class="scroll-mt-20 bg-cobalto text-porcelana on-dark">
    <div class="mx-auto max-w-7xl px-5 py-20 grid lg:grid-cols-12 gap-12">
      <div class="lg:col-span-4">
        <h2 class="text-4xl sm:text-5xl font-extrabold tracking-tight">El arte en tu mesa </h2>
        <p class="mt-4 text-porcelana/80 font-serif text-xl leading-snug">Todo el proceso ocurre en nuestro taller. Es lento a propósito: cada etapa deja una huella en la pieza.</p>
      </div>
      <div class="lg:col-span-8 grid sm:grid-cols-2 gap-x-10 gap-y-10">${steps}</div>
    </div>
  </section>

  <section id="como-comprar" class="scroll-mt-20 mx-auto max-w-7xl px-5 py-20 grid lg:grid-cols-12 gap-12">
    <div class="lg:col-span-5">
      <h2 class="text-4xl sm:text-5xl font-extrabold tracking-tight">Comprar es simple</h2>
      <p class="mt-4 text-lg text-tinta/70 font-serif max-w-md">No necesitas crear una cuenta. Confirmamos disponibilidad, costo de envío y forma de pago directamente en el chat.</p>
      <a href="#/coleccion" class="mt-8 inline-block rounded-full bg-tinta text-porcelana px-7 py-3.5 font-bold">Empezar mi pedido</a>
    </div>
    <ol class="lg:col-span-7 space-y-8">${buy}</ol>
  </section>`;
}

function productView(p) {
  const rel = PRODUCTS.filter(x => x.id !== p.id)
    .sort((a, b) => (b.cat === p.cat) - (a.cat === p.cat)).slice(0, 4);
  pq = 1;
  return `
  <div class="mx-auto max-w-7xl px-5 pt-6 pb-20">
    <nav aria-label="Ruta de navegación" class="text-sm text-tinta/60 flex flex-wrap gap-2">
      <a href="#/" class="hover:text-tinta underline-offset-2 hover:underline">Inicio</a><span aria-hidden="true">/</span>
      <a href="#/coleccion" class="hover:text-tinta underline-offset-2 hover:underline">Colección</a><span aria-hidden="true">/</span>
      <span class="text-tinta" aria-current="page">${p.nombre}</span>
    </nav>

    <div class="mt-6 grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
      <div class="lg:sticky lg:top-24">
        <div class="arch relative aspect-[4/5] max-h-[78vh] mx-auto overflow-hidden" style="background:${p.bg}">${frame(p)}</div>
      </div>

      <div>
        <p class="text-sm font-semibold text-cobalto">${p.cat}</p>
        <h1 class="mt-1 text-5xl sm:text-6xl font-extrabold tracking-tight leading-none">${p.nombre}</h1>
        <p class="mt-4 text-3xl font-bold">${money(p.precio)}</p>
        <p class="mt-6 text-xl font-serif leading-relaxed text-tinta/85 max-w-xl">${p.desc}</p>

        <div class="mt-8 flex flex-wrap items-center gap-4">
          <div class="inline-flex items-center rounded-full border border-tinta/40" role="group" aria-label="Cantidad">
            <button data-action="pq-dec" class="w-12 h-12 text-xl rounded-full hover:bg-tinta/10" aria-label="Disminuir cantidad">−</button>
            <span id="pq" class="w-8 text-center font-bold" aria-live="polite">1</span>
            <button data-action="pq-inc" class="w-12 h-12 text-xl rounded-full hover:bg-tinta/10" aria-label="Aumentar cantidad">+</button>
          </div>
        <div class="mt-4 flex flex-wrap items-center ">
            <select class="mt-3 w-full sm:w-a rounded-full border border-tinta/40 px-8 py-3.5 font-semibold hover:bg-tinta hover:text-porcelana transition-colors">
              <option>Pieza Cruda</option>
              <option>Pieza Pintada</option>
              <option>Pieza Pintada con Vela</option>
            </select>
        </div>
          <button data-action="add-page" data-id="${p.id}" class="flex-1 min-w-[200px] rounded-full bg-cobalto hover:bg-cobalto-oscuro text-white px-8 py-3.5 font-bold">Agregar al carrito</button>
        </div>
        

        <dl class="mt-10 border-t border-tinta/15">
          ${p.detalles.map(([k, v]) => `<div class="grid grid-cols-3 gap-4 py-3.5 border-b border-tinta/15"><dt class="font-semibold">${k}</dt><dd class="col-span-2 text-tinta/80">${v}</dd></div>`).join('')}
        </dl>
        <p class="mt-5 text-sm text-tinta/60 max-w-md">Hecha a mano: pueden existir pequeñas diferencias de tono y forma entre piezas. Es parte de su carácter.</p>
      </div>
    </div>

    <section class="mt-24" aria-labelledby="rel-title">
      <h2 id="rel-title" class="text-3xl font-extrabold tracking-tight">También te puede gustar</h2>
      <div class="mt-8 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">${rel.map(card).join('')}</div>
    </section>
  </div>`;
}
