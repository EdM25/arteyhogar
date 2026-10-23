/* =========================================================
   ILUSTRACIONES DE CERÁMICA (SVG)
   ========================================================= */
const drip = (y, col) => `<path d="M0 0H200V${y}C188 ${y} 184 ${y+26} 172 ${y+26}S158 ${y} 144 ${y}S132 ${y+18} 120 ${y+18}S104 ${y} 88 ${y}S76 ${y+32} 62 ${y+32}S48 ${y} 34 ${y}S20 ${y+14} 0 ${y+10}Z" fill="${col}"/>`;
const handle = (d, w, col) => `<path d="${d}" fill="none" stroke="${col}" stroke-width="${w}" stroke-linecap="round"/>`;

const SHAPES = {
  botella: { vb:'30 18 140 212', hx:62, dripY:80, shadow:56,
    d:'M90 30 L90 60 C90 86 52 100 52 150 C52 190 72 212 100 212 C128 212 148 190 148 150 C148 100 110 86 110 60 L110 30 Z',
    rim:a=>`<ellipse cx="100" cy="30" rx="10" ry="3.2" fill="${a.c2}"/><ellipse cx="100" cy="30.4" rx="7" ry="1.9" fill="#172026" opacity=".5"/>` },
  luna: { vb:'10 36 180 194', hx:48, dripY:0, shadow:70,
    d:'M82 48 L82 58 C40 70 28 112 28 142 C28 186 60 212 100 212 C140 212 172 186 172 142 C172 112 160 70 118 58 L118 48 Z',
    rim:a=>`<ellipse cx="100" cy="48" rx="18" ry="4" fill="${a.c2}"/><ellipse cx="100" cy="48.4" rx="13" ry="2.4" fill="#172026" opacity=".5"/>` },
  taza: { vb:'10 55 180 175', hx:70, dripY:92, shadow:50,
    d:'M60 70 L60 182 Q60 206 84 206 L116 206 Q140 206 140 182 L140 70 Z',
    back:a=>handle('M139 92 C182 88 182 168 137 164', 12, a.c2),
    rim:a=>`<ellipse cx="100" cy="70" rx="40" ry="8" fill="${a.c2}"/><ellipse cx="100" cy="71.5" rx="34" ry="5.5" fill="#172026" opacity=".35"/>` },
  espresso: { vb:'30 110 140 120', hx:78, dripY:140, shadow:58, sy:216,
    d:'M70 124 L70 190 Q70 206 86 206 L114 206 Q130 206 130 190 L130 124 Z',
    back:a=>`<ellipse cx="100" cy="207" rx="56" ry="8" fill="${a.c2}"/>` + handle('M129 138 C160 134 160 184 128 182', 9, a.c2),
    rim:a=>`<ellipse cx="100" cy="124" rx="30" ry="6" fill="${a.c2}"/><ellipse cx="100" cy="125" rx="25" ry="4" fill="#172026" opacity=".4"/>` },
  cuenco: { vb:'10 80 180 150', hx:44, dripY:0, shadow:70,
    d:'M30 100 C30 176 62 206 100 206 C138 206 170 176 170 100 Z',
    back:a=>`<rect x="72" y="202" width="56" height="9" rx="3" fill="${a.c2}"/>`,
    rim:a=>`<ellipse cx="100" cy="100" rx="70" ry="12" fill="${a.c2}"/><ellipse cx="100" cy="102" rx="63" ry="9" fill="${a.c1}" opacity=".85"/>` },
  plato: { vb:'0 125 200 105', nohl:true, shadow:86, sy:205,
    d:'M10 175 a90 28 0 1 0 180 0 a90 28 0 1 0 -180 0Z',
    back:a=>`<ellipse cx="100" cy="183" rx="90" ry="28" fill="${a.c2}"/>`,
    rim:a=>`<ellipse cx="100" cy="177" rx="64" ry="17" fill="${a.c2}" opacity=".85"/><ellipse cx="100" cy="178.5" rx="52" ry="12" fill="${a.c1}"/>` },
  jarra: { vb:'10 40 190 190', hx:58, dripY:88, shadow:56,
    d:'M72 58 L72 68 C46 86 44 132 50 172 C54 198 74 212 100 212 C126 212 146 198 150 172 C156 132 154 86 128 68 L128 58 Z',
    back:a=>handle('M147 98 C190 94 190 174 150 178', 11, a.c2),
    rim:a=>`<ellipse cx="100" cy="58" rx="28" ry="5" fill="${a.c2}"/><ellipse cx="100" cy="59" rx="23" ry="3.4" fill="#172026" opacity=".4"/>` },
  maceta: { vb:'30 14 140 216', hx:66, dripY:0, shadow:50,
    d:'M52 98 L148 98 L136 204 Q135 212 126 212 L74 212 Q65 212 64 204 Z',
    back:a=>`<path d="M100 98 C96 60 70 40 54 44 C58 70 76 92 100 98Z" fill="#4E7A5A"/><path d="M100 98 C104 52 128 30 148 34 C146 64 126 90 100 98Z" fill="#4E7A5A"/><path d="M100 98 C90 70 96 36 100 20 C110 40 112 72 100 98Z" fill="#3F6A4D"/>`,
    rim:a=>`<rect x="46" y="90" width="108" height="14" rx="5" fill="${a.c2}"/>` }
};

let uid = 0;
function ceramic(a, label) {
  const S = SHAPES[a.shape], id = 'c' + (++uid);
  let seed = uid * 7919, dots = '';
  if (a.speck) {
    for (let i = 0; i < 46; i++) {
      seed = (seed * 16807) % 2147483647;
      const x = 30 + (seed % 14000) / 100;
      seed = (seed * 16807) % 2147483647;
      const y = 50 + (seed % 16000) / 100;
      seed = (seed * 16807) % 2147483647;
      const r = 0.6 + (seed % 100) / 100;
      dots += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r.toFixed(2)}" fill="${a.speck}" opacity=".55"/>`;
    }
  }
  return `<svg viewBox="${S.vb}" class="w-full h-full" preserveAspectRatio="xMidYMax meet" role="img" aria-label="${label || ''}">
    <defs>
      <linearGradient id="${id}f" x1="0" x2="1"><stop offset="0" stop-color="${a.c2}"/><stop offset=".35" stop-color="${a.c1}"/><stop offset=".7" stop-color="${a.c1}"/><stop offset="1" stop-color="${a.c2}"/></linearGradient>
      <clipPath id="${id}c"><path d="${S.d}"/></clipPath>
    </defs>
    <ellipse cx="100" cy="${S.sy || 214}" rx="${S.shadow}" ry="5" fill="#172026" opacity=".13"/>
    ${S.back ? S.back(a) : ''}
    <path d="${S.d}" fill="url(#${id}f)"/>
    <g clip-path="url(#${id}c)">
      ${a.drip && S.dripY ? drip(S.dripY, a.drip) : ''}
      ${S.nohl ? '' : `<rect x="${S.hx}" y="20" width="8" height="200" rx="4" fill="#fff" opacity=".26"/>`}
      ${dots}
    </g>
    ${S.rim(a)}
  </svg>`;
}

/* Muestra foto real (si existe p.img) o la ilustración */
const visual = p => p.img
  ? `<img src="${p.img}" alt="${p.nombre}" class="w-full h-full object-cover" loading="lazy">`
  : ceramic(p.art, p.nombre);
const frame = p => p.img
  ? `<div class="absolute inset-0">${visual(p)}</div>`
  : `<div class="absolute inset-x-[12%] top-[16%] bottom-[6%]">${visual(p)}</div>`;
