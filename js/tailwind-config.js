// Colores y tipografías de la marca para Tailwind
tailwind.config = {
  theme: {
    extend: {
      colors: {
        porcelana: '#F2F4F1',
        caolin: '#E4E8E3',
        tinta: '#172026',
        cobalto: { DEFAULT: '#243C8C', oscuro: '#182A66' },
        celadon: '#A8C3B5'
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"', 'system-ui', 'sans-serif'],
        serif: ['Newsreader', 'Georgia', 'serif']
      }
    }
  }
};
