/* =========================================================
   PRODUCTOS
   Para usar fotos reales agrega  img: 'assets/img/productos/mi-foto.jpg'  a cada producto.
   Si no hay img, se muestra la ilustración en SVG.
   ========================================================= */
const PRODUCTS = [
  {
    id: 'taza-alba', nombre: 'Luna en relieve', cat: 'Adornos', precio: 2500, bg: '#DDE8E1',
    corto: 'Luna en Relieve Estilo Nebula',
    desc: 'Luna en relieve estilo retro Nebula, apto para hacer manualidades de decoración de escritorio en el hogar como joyeros, moldes para velas, macetas para suculentas',
    detalles: [['Medidas', '7.7 cm de alto × 7.7 cm de diámetro'], ['Capacidad', '300 ml'], ['Acabado', 'Eleccion del Cliente'], ['Uso', 'Velas, Joyeria, Llaves, etc']],
    img: 'assets/img/productos/Luna/Luna-1.png',
    art: { shape: 'botella', c1: '#2B4BA6', c2: '#182A66', drip: '#DDE6F5' }
  },
  {
    id: 'jarron-marea', nombre: 'Adorno Santa Claus', cat: 'Sección Navideña', precio: 22000, bg: '#DCE3F3',
    corto: 'Pieza Navideña de Santa Claus para Adornar el Hogar',
    desc: 'Añade un toque elegante y acogedor a tu decoración navideña con esta hermosa figura artesanal de Santa Claus. Con un diseño clásico estilo nórdico, destaca por su túnica azul petróleo con destellos brillantes y acabados tipo piel en tono crema.',
    detalles: [['Medidas', '28 cm de alto × 14 cm de diámetro'], ['Uso', 'Flores secas o frescas (tiene sellado interior)'], ['Acabado', 'Cobalto con esmalte blanco'], ['Cuidado', 'Lavar a mano con agua tibia']],
    img: 'assets/img/productos/Navidad/img-navid-1.jpg',
    art: { shape: 'botella', c1: '#2B4BA6', c2: '#182A66', drip: '#DDE6F5' }
  },
  {
    id: 'cuenco-ceniza', nombre: 'Cuenco Ceniza', cat: 'Sección Navideña', precio: 34, bg: '#E4E5E1',
    corto: 'Cuenco gris con motas oscuras',
    desc: 'Un cuenco honesto y versátil, con un esmalte gris moteado que recuerda a la piedra. Sirve para sopa, cereal, ensaladas o para dejar llaves en la entrada.',
    detalles: [['Medidas', '8 cm de alto × 15 cm de diámetro'], ['Capacidad', '600 ml'], ['Acabado', 'Esmalte mate moteado'], ['Cuidado', 'Apto para lavavajillas']],
    art: { shape: 'cuenco', c1: '#C9CCC6', c2: '#9EA39B', speck: '#3A3F3C' }
  },
  {
    id: 'plato-brasa', nombre: 'Plato Brasa', cat: 'Sección Navideña', precio: 38, bg: '#F0DCCB',
    corto: 'Plato llano en esmalte óxido',
    desc: 'Un plato llano de borde suave, esmaltado en un tono óxido que resalta los colores de la comida. Se apila bien y soporta el uso diario.',
    detalles: [['Medidas', '3 cm de alto × 24 cm de diámetro'], ['Acabado', 'Esmalte satinado óxido'], ['Cuidado', 'Apto para lavavajillas y horno']],
    art: { shape: 'plato', c1: '#B8602E', c2: '#7E3F1B' }
  },
  {
    id: 'jarra-pradera', nombre: 'Jarra Pradera', cat: 'Sección Navideña', precio: 58, bg: '#DCE5DB',
    corto: 'Jarra verde con gotas de esmalte crema',
    desc: 'Una jarra generosa para agua, limonada o flores del jardín. El verde profundo se mezcla con gotas de esmalte crema que cambian en cada pieza.',
    detalles: [['Medidas', '20 cm de alto × 15 cm de diámetro'], ['Capacidad', '1,2 litros'], ['Acabado', 'Esmalte verde brillante'], ['Cuidado', 'Lavar a mano recomendado']],
    art: { shape: 'jarra', c1: '#5C7F63', c2: '#3A5642', drip: '#E8E3CF' }
  },
  {
    id: 'maceta-duna', nombre: 'Maceta Duna', cat: 'Sección Navideña', precio: 42, bg: '#EFE7D6',
    corto: 'Maceta arena con drenaje',
    desc: 'Una maceta de líneas rectas y esmalte arena mate. Incluye orificio de drenaje y un plato a juego para proteger la superficie donde la apoyes.',
    detalles: [['Medidas', '16 cm de alto × 16 cm de diámetro'], ['Incluye', 'Plato a juego'], ['Acabado', 'Esmalte mate arena'], ['Cuidado', 'Apta para interior y exterior cubierto']],
    art: { shape: 'maceta', c1: '#D9C7A5', c2: '#B8A47D', speck: '#6B5B3A' }
  },
  {
    id: 'set-noche', nombre: 'Set Noche', cat: 'Tazas', precio: 44, bg: '#D8DCE3',
    corto: 'Dos tazas de espresso con plato',
    desc: 'Dos tazas de espresso con su plato, esmaltadas en negro azulado con gotas de esmalte blanco en el borde. Retienen bien el calor.',
    detalles: [['Incluye', '2 tazas y 2 platos'], ['Medidas', '6 cm de alto × 6 cm de diámetro'], ['Capacidad', '90 ml cada una'], ['Cuidado', 'Aptas para lavavajillas']],
    art: { shape: 'espresso', c1: '#1D2530', c2: '#0E131A', drip: '#F2F4F1' }
  },
  {
    id: 'jarron-luna', nombre: 'Jarrón Luna', cat: 'Sección Navideña', precio: 92, bg: '#E3E8E5',
    corto: 'Jarrón esférico en blanco hueso',
    desc: 'Inspirado en los jarrones lunares coreanos. Su forma redonda y su esmalte blanco hueso con motas finas lo hacen protagonista de cualquier repisa.',
    detalles: [['Medidas', '26 cm de alto × 24 cm de diámetro'], ['Uso', 'Decorativo o con ramas y flores secas'], ['Acabado', 'Esmalte hueso moteado'], ['Cuidado', 'Limpiar con paño húmedo']],
    art: { shape: 'luna', c1: '#ECE8DC', c2: '#C9C3B0', speck: '#8A8470' }
  }
];
const byId = Object.fromEntries(PRODUCTS.map(p => [p.id, p]));
const CATS = ['Todo', 'Sección Navideña', 'Jarrones', 'Velas', 'Adornos'];
