function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const body = document.body;
    
    function openMenu() {
        hamburger.classList.add('active');
        navMenu.classList.add('active');
        body.classList.add('menu-open');
    }
    
    function closeMenu() {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        body.classList.remove('menu-open');
    }
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                closeMenu();
            } else {
                openMenu();
            }
        });
    }
    
    navLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            closeMenu();
        }
    });
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            if (targetId?.startsWith('#')) {
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    window.addEventListener('scroll', throttle(updateActiveNavLink, 100));
    updateActiveNavLink();
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
            if (navLink) navLink.classList.add('active');
        }
    });
}

function initScrollEffects() {
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', throttle(() => {
        const scrollY = window.scrollY;
        
        if (header) {
            if (scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
    }, 100));
}

function initBackToTop() {
    const backToTopButton = document.querySelector('.back-to-top');
    if (!backToTopButton) return;
    
    window.addEventListener('scroll', throttle(() => {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    }, 100));
    
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

function scrollToElement(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        const headerHeight = document.querySelector('.header')?.offsetHeight || 80;
        const elementPosition = element.offsetTop - headerHeight;
        
        window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
        });
    }
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

if (typeof window !== 'undefined') {
    window.initNavigation = initNavigation;
    window.updateActiveNavLink = updateActiveNavLink;
    window.initScrollEffects = initScrollEffects;
    window.initBackToTop = initBackToTop;
    window.scrollToElement = scrollToElement;
    window.throttle = throttle;
}