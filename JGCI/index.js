const menu = document.querySelector('.menu');
const nav = document.querySelector('header nav');
const menuIcon = menu.querySelector('.material-symbols-outlined');

menu.addEventListener('click', () => {
    nav.classList.toggle('show');

    const isOpen = nav.classList.contains('show');

    menu.setAttribute('aria-expanded', isOpen);
    menu.setAttribute(
        'aria-label',
        isOpen ? 'Close navigation menu' : 'Open navigation menu'
    );

    menuIcon.textContent = isOpen ? 'close' : 'menu';
});

const navLinks = nav.querySelectorAll('a');

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('show');

        menu.setAttribute('aria-expanded', 'false');
        menu.setAttribute('aria-label', 'Open navigation menu');

        menuIcon.textContent = 'menu';
    });
});

document.addEventListener('click', (event) => {
    if (!nav.contains(event.target) && !menu.contains(event.target)) {
        nav.classList.remove('show');

        menu.setAttribute('aria-expanded', 'false');
        menu.setAttribute('aria-label', 'Open navigation menu');
        
 
        menuIcon.textContent = 'menu';
    }
    });