// ===============================
// Smooth Scroll
// ===============================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===============================
// Menu Overlay Toggle
// ===============================
const navToggle = document.getElementById('navToggle');
const menuOverlay = document.getElementById('menuOverlay');
const menuLinks = document.querySelectorAll('.menu-link');

if (navToggle && menuOverlay) {
    // Toggle menu overlay
    navToggle.addEventListener('click', () => {
        menuOverlay.classList.toggle('active');
        document.body.style.overflow = menuOverlay.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu when clicking on a link
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close menu when clicking outside
    menuOverlay.addEventListener('click', (e) => {
        if (e.target === menuOverlay) {
            menuOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Close menu with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && menuOverlay.classList.contains('active')) {
            menuOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// ===============================
// Navbar Scroll Effect
// ===============================
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 50) {
        navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.5)';
    } else {
        navbar.style.boxShadow = 'none';
    }

    lastScroll = currentScroll;
});

// ===============================
// Tabs Functionality (Blogs & Resources)
// ===============================
const tabButtons = document.querySelectorAll('.tab-btn');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        tabButtons.forEach(btn => btn.classList.remove('active'));

        // Add active class to clicked button
        button.classList.add('active');

        // Get the tab name
        const tabName = button.getAttribute('data-tab');

        // Here you would typically show/hide content based on the tab
        // For now, we'll just log it
        console.log('Tab clicked:', tabName);
    });
});

// ===============================
// Scroll Animations
// ===============================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe cards for animation
const animatedElements = document.querySelectorAll(`
    .stat-card,
    .journey-logo,
    .activity-card,
    .course-card,
    .case-study-card,
    .blog-card,
    .contact-info-card
`);

animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ===============================
// Calendar Items Hover Effect
// ===============================
const calendarItems = document.querySelectorAll('.calendar-item');

calendarItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        // Remove active class from all items
        calendarItems.forEach(i => i.classList.remove('active'));
        // Add active to hovered item
        item.classList.add('active');
    });
});

// ===============================
// Portfolio/Activity Card Click
// ===============================
const activityCards = document.querySelectorAll('.activity-card');
const courseCards = document.querySelectorAll('.course-card');
const blogCards = document.querySelectorAll('.blog-card');

[...activityCards, ...courseCards, ...blogCards].forEach(card => {
    card.addEventListener('click', () => {
        // Add a subtle scale animation on click
        card.style.transform = 'scale(0.98)';
        setTimeout(() => {
            card.style.transform = '';
        }, 100);
    });
});

// ===============================
// Dynamic Year in Footer
// ===============================
const footerCopyright = document.querySelector('.footer-copyright');
if (footerCopyright) {
    const currentYear = new Date().getFullYear();
    footerCopyright.textContent = `© ${currentYear} Ayman Taher`;
}

// ===============================
// Podcast Player Controls
// ===============================
const playBtn = document.querySelector('.play-btn');
if (playBtn) {
    playBtn.addEventListener('click', () => {
        const icon = playBtn.querySelector('i');

        if (icon.classList.contains('fa-pause')) {
            icon.classList.remove('fa-pause');
            icon.classList.add('fa-play');
        } else {
            icon.classList.remove('fa-play');
            icon.classList.add('fa-pause');
        }
    });
}

// ===============================
// Loading Animation
// ===============================
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ===============================
// Parallax Effect on Hero
// ===============================
const heroSection = document.querySelector('.hero');
if (heroSection) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallax = scrolled * 0.5;
        heroSection.style.transform = `translateY(${parallax}px)`;
    });
}

// ===============================
// Stats Counter Animation
// ===============================
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + 'k';
        }
    }, 16);
}

// Trigger counter animation when stats come into view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statValue = entry.target.querySelector('h4');
            if (statValue && !statValue.classList.contains('animated')) {
                statValue.classList.add('animated');
                // Extract number from "+10k" format
                const value = statValue.textContent.match(/\d+/)[0];
                animateCounter(statValue, parseInt(value));
            }
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-card').forEach(card => {
    statsObserver.observe(card);
});

// ===============================
// Console Signature
// ===============================
console.log('%c🎨 Ayman Taher Portfolio', 'color: #10b981; font-size: 24px; font-weight: bold;');
console.log('%cProduct Design Lead & Education Consultant', 'color: #9ca3af; font-size: 14px;');
console.log('%cBuilt with HTML, CSS & JavaScript', 'color: #6b7280; font-size: 12px;');
