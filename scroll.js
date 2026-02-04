// ========================================
// NAVIGATION MODERNE - Gestion avancée
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    // Éléments du DOM
    const navbar = document.getElementById('navbar');
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navMenu = document.getElementById('navLinks');
    const navLinks = document.querySelectorAll('.nav-link');
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');

    // ========================================
    // 1. EFFET DE SCROLL SUR LA NAVBAR
    // ========================================
    let lastScroll = 0;
    const scrollThreshold = 100;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        // Ajout de la classe 'scrolled' après un certain scroll
        if (currentScroll > scrollThreshold) {
            navbar?.classList.add('scrolled');
        } else {
            navbar?.classList.remove('scrolled');
        }

        // Gestion du bouton scroll to top
        if (scrollToTopBtn) {
            if (currentScroll > 200) {
                scrollToTopBtn.style.display = 'block';
            } else {
                scrollToTopBtn.style.display = 'none';
            }
        }

        lastScroll = currentScroll;
    });

    // ========================================
    // 2. MENU MOBILE - Toggle et fermeture
    // ========================================
    if (mobileMenuToggle && navMenu) {
        // Toggle du menu mobile
        mobileMenuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            mobileMenuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            mobileMenuToggle.setAttribute(
                'aria-expanded',
                navMenu.classList.contains('active')
            );

            // Empêcher le scroll du body quand le menu est ouvert
            if (navMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });

        // Fermeture au clic sur un lien
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            });
        });

        // Fermeture au clic en dehors du menu
        document.addEventListener('click', (e) => {
            if (navMenu.classList.contains('active') && 
                !navMenu.contains(e.target) && 
                !mobileMenuToggle.contains(e.target)) {
                navMenu.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }
        });

        // Fermeture avec la touche Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }
        });
    }

    // ========================================
    // 3. ACTIVE LINK - Mise en évidence de la section active
    // ========================================
    const sections = document.querySelectorAll('section[id]');

    function highlightActiveLink() {
        const scrollPosition = window.scrollY + 200;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Retirer la classe active de tous les liens
                navLinks.forEach(link => link.classList.remove('active'));

                // Ajouter la classe active au lien correspondant
                const activeLink = document.querySelector(`.nav-link[data-section="${sectionId}"]`);
                activeLink?.classList.add('active');
            }
        });
    }

    // Écouter le scroll pour mettre à jour le lien actif
    window.addEventListener('scroll', highlightActiveLink);
    // Exécuter au chargement de la page
    highlightActiveLink();

    // ========================================
    // 4. SCROLL SMOOTH vers les sections
    // ========================================
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            // Si c'est un lien interne (commence par #)
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetSection = document.getElementById(targetId);

                if (targetSection) {
                    const navbarHeight = navbar?.offsetHeight || 80;
                    const targetPosition = targetSection.offsetTop - navbarHeight - 20;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // ========================================
    // 5. BOUTON SCROLL TO TOP
    // ========================================
    if (scrollToTopBtn) {
        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({ 
                top: 0, 
                behavior: 'smooth' 
            });
        });
    }

    // ========================================
    // 6. PRÉCHARGEMENT DES PAGES (Optimisation)
    // ========================================
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            const href = link.getAttribute('href');
            if (href && !href.startsWith('#') && href.endsWith('.html')) {
                // Précharger la page au survol
                const linkElement = document.createElement('link');
                linkElement.rel = 'prefetch';
                linkElement.href = href;
                document.head.appendChild(linkElement);
            }
        });
    });

    // ========================================
    // 7. ANIMATION D'ENTRÉE DE LA NAVBAR
    // ========================================
    setTimeout(() => {
        navbar?.classList.add('nav-loaded');
    }, 100);
});

// ========================================
// UTILITAIRES COMPLÉMENTAIRES
// ========================================

// Détection de la direction du scroll
let lastScrollTop = 0;
window.addEventListener('scroll', () => {
    const st = window.pageYOffset || document.documentElement.scrollTop;
    const navbar = document.getElementById('navbar');
    
    if (st > lastScrollTop && st > 300) {
        // Scroll vers le bas - on peut cacher la navbar si souhaité
        // navbar?.classList.add('nav-hidden');
    } else {
        // Scroll vers le haut
        navbar?.classList.remove('nav-hidden');
    }
    
    lastScrollTop = st <= 0 ? 0 : st;
}, false);