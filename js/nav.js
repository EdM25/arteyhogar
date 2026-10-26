document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', () => {
            // Alterna la visibilidad del menú
            const isHidden = mobileMenu.classList.toggle('hidden');
            mobileMenu.classList.toggle('flex');

            // Actualiza la accesibilidad
            menuToggle.setAttribute('aria-expanded', !isHidden);
        });

        // Oculta el menú si se hace clic fuera de él
        document.addEventListener('click', (event) => {
            if (!menuToggle.contains(event.target) && !mobileMenu.contains(event.target)) {
                mobileMenu.classList.add('hidden');
                mobileMenu.classList.remove('flex');
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }
});