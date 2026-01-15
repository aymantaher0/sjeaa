/**
 * PORTFOLIO WEBSITE - ANIMATION CONTROLLER
 * Awwwards-inspired smooth animations using GSAP
 * Focus: Subtle, intentional, premium feel
 */

// ========================================
// GSAP SETUP & CONFIGURATION
// ========================================
gsap.registerPlugin(ScrollTrigger);

// Smooth scrolling configuration
const lenis = {
    smooth: true,
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
};

// ========================================
// NAVIGATION STATE
// ========================================
function initNavigation() {
    const nav = document.getElementById('nav');

    // Add scrolled class on scroll
    ScrollTrigger.create({
        start: 'top -80',
        end: 99999,
        toggleClass: {
            targets: nav,
            className: 'scrolled'
        }
    });

    // Smooth anchor scrolling
    const navLinks = document.querySelectorAll('.nav__link');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const offsetTop = target.offsetTop - 100;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// ========================================
// HERO ENTRANCE ANIMATION
// ========================================
function initHeroAnimation() {
    const heroTimeline = gsap.timeline({
        defaults: {
            ease: 'power3.out'
        }
    });

    // Animate title lines
    heroTimeline.to('.hero__title-line', {
        y: 0,
        opacity: 1,
        duration: 1.2,
        stagger: 0.15,
        ease: 'power4.out'
    });

    // Animate subtitle
    heroTimeline.to('.hero__subtitle', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out'
    }, '-=0.6');

    // Animate scroll indicator
    heroTimeline.to('.hero__scroll-indicator', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out'
    }, '-=0.4');

    // Animate scroll line
    gsap.to('.hero__scroll-line', {
        scaleX: 0.7,
        transformOrigin: 'left',
        duration: 1.5,
        ease: 'power2.inOut',
        repeat: -1,
        yoyo: true,
        delay: 2
    });
}

// ========================================
// SCROLL-BASED REVEAL ANIMATIONS
// ========================================
function initScrollAnimations() {
    // About section
    gsap.from('.about__label', {
        scrollTrigger: {
            trigger: '.about',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
    });

    gsap.from('.about__paragraph', {
        scrollTrigger: {
            trigger: '.about__text',
            start: 'top 75%',
            toggleActions: 'play none none reverse'
        },
        y: 40,
        opacity: 0,
        duration: 0.9,
        stagger: 0.15,
        ease: 'power3.out'
    });

    gsap.from('.about__detail-item', {
        scrollTrigger: {
            trigger: '.about__details',
            start: 'top 75%',
            toggleActions: 'play none none reverse'
        },
        y: 40,
        opacity: 0,
        duration: 0.9,
        stagger: 0.2,
        ease: 'power3.out'
    });

    // Work section header
    gsap.from('.work__header', {
        scrollTrigger: {
            trigger: '.work',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
    });

    // Project cards - staggered entrance
    gsap.from('.project-card', {
        scrollTrigger: {
            trigger: '.work__grid',
            start: 'top 75%',
            toggleActions: 'play none none reverse'
        },
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out'
    });

    // Process section
    gsap.from('.process__header', {
        scrollTrigger: {
            trigger: '.process',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
    });

    gsap.from('.process__intro', {
        scrollTrigger: {
            trigger: '.process__intro',
            start: 'top 75%',
            toggleActions: 'play none none reverse'
        },
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out'
    });

    // Process steps - reveal on scroll
    gsap.from('.process__step', {
        scrollTrigger: {
            trigger: '.process__steps',
            start: 'top 70%',
            toggleActions: 'play none none reverse'
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out'
    });

    // Leadership section
    gsap.from('.leadership__text', {
        scrollTrigger: {
            trigger: '.leadership',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
    });

    gsap.from('.leadership__area', {
        scrollTrigger: {
            trigger: '.leadership__areas',
            start: 'top 75%',
            toggleActions: 'play none none reverse'
        },
        y: 50,
        opacity: 0,
        duration: 0.9,
        stagger: 0.15,
        ease: 'power3.out'
    });

    // Contact section
    gsap.from('.contact__content > *', {
        scrollTrigger: {
            trigger: '.contact',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out'
    });
}

// ========================================
// PROJECT CARD INTERACTIONS
// ========================================
function initProjectCardInteractions() {
    const cards = document.querySelectorAll('.project-card');

    cards.forEach(card => {
        const image = card.querySelector('.project-card__image');

        // Magnetic effect on hover
        card.addEventListener('mouseenter', (e) => {
            gsap.to(image, {
                scale: 1.05,
                duration: 0.6,
                ease: 'power2.out'
            });
        });

        card.addEventListener('mouseleave', (e) => {
            gsap.to(image, {
                scale: 1,
                duration: 0.6,
                ease: 'power2.out'
            });
        });

        // Subtle parallax on mouse move
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const deltaX = (x - centerX) / centerX;
            const deltaY = (y - centerY) / centerY;

            gsap.to(image, {
                x: deltaX * 10,
                y: deltaY * 10,
                duration: 0.5,
                ease: 'power2.out'
            });
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(image, {
                x: 0,
                y: 0,
                duration: 0.5,
                ease: 'power2.out'
            });
        });
    });
}

// ========================================
// BUTTON HOVER EFFECTS
// ========================================
function initButtonInteractions() {
    const buttons = document.querySelectorAll('.btn--primary');

    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            gsap.to(button, {
                scale: 1.02,
                duration: 0.3,
                ease: 'power2.out'
            });
        });

        button.addEventListener('mouseleave', () => {
            gsap.to(button, {
                scale: 1,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });
}

// ========================================
// SUBTLE PARALLAX FOR SECTIONS
// ========================================
function initParallaxEffects() {
    // Subtle parallax on sections
    const sections = document.querySelectorAll('.about, .work, .process, .leadership, .contact');

    sections.forEach(section => {
        gsap.to(section, {
            scrollTrigger: {
                trigger: section,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1
            },
            y: (i, target) => -50,
            ease: 'none'
        });
    });

    // Process step numbers parallax
    gsap.utils.toArray('.process__step-number').forEach(number => {
        gsap.to(number, {
            scrollTrigger: {
                trigger: number,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1
            },
            y: -30,
            ease: 'none'
        });
    });
}

// ========================================
// SMOOTH SCROLL POLYFILL
// ========================================
function initSmoothScroll() {
    // Simple smooth scroll for better performance
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const offsetTop = target.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// ========================================
// CURSOR ANIMATION (OPTIONAL)
// ========================================
function initCustomCursor() {
    // Optional: Add custom cursor for premium feel
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        border: 2px solid #6366F1;
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    document.body.appendChild(cursor);

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.opacity = '0.5';
    });

    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
    });

    function animateCursor() {
        const speed = 0.15;
        cursorX += (mouseX - cursorX) * speed;
        cursorY += (mouseY - cursorY) * speed;

        cursor.style.transform = `translate(${cursorX - 10}px, ${cursorY - 10}px)`;
        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Scale cursor on hover
    const hoverElements = document.querySelectorAll('a, button, .project-card');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            gsap.to(cursor, {
                scale: 1.5,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        el.addEventListener('mouseleave', () => {
            gsap.to(cursor, {
                scale: 1,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });
}

// ========================================
// PAGE LOAD ANIMATIONS
// ========================================
function initPageLoad() {
    // Prevent flash of unstyled content
    gsap.set('body', { opacity: 1 });

    // Initial setup for hero elements
    gsap.set('.hero__title-line', { y: '100%', opacity: 0 });
    gsap.set('.hero__subtitle', { y: 20, opacity: 0 });
    gsap.set('.hero__scroll-indicator', { y: 20, opacity: 0 });
}

// ========================================
// LOADING SCREEN (OPTIONAL)
// ========================================
function initLoadingScreen() {
    // Create minimal loading screen
    const loadingScreen = document.createElement('div');
    loadingScreen.style.cssText = `
        position: fixed;
        inset: 0;
        background: #FAFAF9;
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
        pointer-events: none;
    `;

    const loader = document.createElement('div');
    loader.style.cssText = `
        width: 40px;
        height: 40px;
        border: 2px solid #E5E5E5;
        border-top-color: #0A0A0A;
        border-radius: 50%;
        animation: spin 0.8s linear infinite;
    `;

    loadingScreen.appendChild(loader);
    document.body.appendChild(loadingScreen);

    // Add spinner animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes spin {
            to { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);

    // Remove loading screen after page load
    window.addEventListener('load', () => {
        gsap.to(loadingScreen, {
            opacity: 0,
            duration: 0.6,
            ease: 'power2.inOut',
            onComplete: () => {
                loadingScreen.remove();
            }
        });
    });
}

// ========================================
// INTERSECTION OBSERVER FOR PERFORMANCE
// ========================================
function initIntersectionObserver() {
    // Lazy load animations for better performance
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    }, observerOptions);

    // Observe fade-in elements
    document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right').forEach(el => {
        observer.observe(el);
    });
}

// ========================================
// INITIALIZE ALL ANIMATIONS
// ========================================
function init() {
    // Set initial page state
    initPageLoad();

    // Initialize loading screen (optional)
    initLoadingScreen();

    // Core animations
    initNavigation();
    initHeroAnimation();
    initScrollAnimations();

    // Interactions
    initProjectCardInteractions();
    initButtonInteractions();

    // Enhanced effects
    initParallaxEffects();
    initSmoothScroll();

    // Performance optimizations
    initIntersectionObserver();

    // Optional custom cursor (comment out if not needed)
    // Uncomment the line below for custom cursor
    // initCustomCursor();

    console.log('🎨 Portfolio animations initialized');
}

// ========================================
// WINDOW LOAD & RESIZE HANDLERS
// ========================================
window.addEventListener('load', () => {
    init();
});

// Refresh ScrollTrigger on resize
window.addEventListener('resize', () => {
    ScrollTrigger.refresh();
});

// ========================================
// PERFORMANCE MONITORING (DEV ONLY)
// ========================================
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    console.log(`
    🎨 Portfolio Website
    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    Framework: Vanilla JS + GSAP
    Design: Awwwards-inspired
    Animation: Smooth & Subtle
    Performance: Optimized
    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    `);
}

// Export for module usage (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { init };
}
