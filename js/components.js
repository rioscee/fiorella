function loadComponent(id, file, callback) {
    fetch(file)
        .then(response => {
            if (!response.ok) throw new Error(`Failed to load ${file}`);
            return response.text();
        })
        .then(data => {
            document.getElementById(id).innerHTML = data;
            if (callback) callback();
        })
        .catch(error => console.error(error));
}

// Logic to initialize Navbar behavior (Mobile Menu, Scroll Effect)
// We extract this from main.js to run it AFTER the navbar is loaded
function initNavbarLogic() {
    // 1. Mobile Menu Toggle
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            // Check for image inside button first
            const iconImg = menuToggle.querySelector('img');
            // If we still used text/span (legacy compatibility)
            const iconSpan = menuToggle.querySelector('.material-symbols-outlined');

            // Note: Since we switched to SVG implementation, we might not need to swap text 'menu'/'close'
            // But if we want to retain the 'close' functionality, we'd need a close icon.
            // For now, let's keep the existing class toggle behavior. 

            // If there's a legacy span icon:
            if (iconSpan) {
                iconSpan.textContent = navMenu.classList.contains('active') ? 'close' : 'menu';
            }
        });
    }

    // 2. Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        let lastScrollTop = 0;
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

            if (scrollTop > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }

            if (scrollTop > lastScrollTop && scrollTop > 100) {
                navbar.classList.add('navbar-hidden');
            } else {
                navbar.classList.remove('navbar-hidden');
            }
            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
        });
    }

    // 3. Highlight Active Link based on URL
    const currentPath = window.location.pathname.split('/').pop().replace('.html', '');
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        const href = link.getAttribute('href').replace('.html', '');
        if (href === currentPath || (currentPath === '' && href === 'index')) {
            link.classList.add('active');
        } else {
            // Also handle hash links if on same page
            if (href.startsWith('#') || href.includes(currentPath + '#')) {
                // Logic for scroll spy could go here, but simple active state is usually clean enough
            }
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    loadComponent('navbar-placeholder', 'navbar.html', initNavbarLogic);
    loadComponent('footer-placeholder', 'footer.html');
});
