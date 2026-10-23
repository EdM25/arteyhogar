# Esmalte - Tienda de cerámica

Tienda estática (HTML5 + Tailwind CSS + JavaScript). No necesita servidor ni compilación.

## Estructura
```
index.html              Estructura de la página, carrito y pie de página
css/styles.css          Estilos propios (arcos, animación, foco, formularios)
js/tailwind-config.js   Colores y tipografías de la marca
js/config.js            Número de WhatsApp, moneda, nombre de la tienda
js/products.js          Catálogo de productos
js/ceramics.js          Ilustraciones SVG de las piezas
js/utils.js             Utilidades, localStorage y estado
js/views.js             Inicio y página de producto
js/cart.js              Carrito, dirección guardada y pedido por WhatsApp
js/app.js               Rutas, eventos e inicio
assets/                 Favicon e imágenes (assets/img/productos/)
```

## Configuración rápida
1. `js/config.js`: cambia `whatsapp` (código de país + número, solo dígitos).
2. `js/products.js`: edita productos, precios y descripciones; agrega `img` para usar fotos.
3. Sube la carpeta completa a cualquier hosting estático.

Para probar en local puedes abrir `index.html` directamente o usar `python3 -m http.server`.
