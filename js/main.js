/* =========================================
   HOLA AMIGOS — GSAP Animations & Interactions
   ========================================= */

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// ===== DOM READY =====
document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initHeroAnimations();
    initScrollReveals();
    initCounterAnimations();
    initParallax();
    initTestimonials();
    initContactForm();
    initSmoothScroll();
    initMobileMenu();
    initActiveNavLink();
});

// ===== NAVBAR SCROLL EFFECT =====
function initNavbar() {
    const navbar = document.getElementById('navbar');

    ScrollTrigger.create({
        start: 'top -80',
        end: 99999,
        toggleClass: { className: 'scrolled', targets: navbar },
    });
}

// ===== HERO ANIMATIONS =====
function initHeroAnimations() {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // Hero background slow zoom
    gsap.to('.hero-bg-img', {
        scale: 1,
        duration: 2,
        ease: 'power2.out',
    });

    // Stagger hero content in
    tl.to('.hero-badge', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.3,
    })
    .to('.hero-title-line:first-child', {
        opacity: 1,
        y: 0,
        duration: 0.8,
    }, '-=0.4')
    .to('.hero-title-accent', {
        opacity: 1,
        y: 0,
        duration: 0.8,
    }, '-=0.5')
    .to('.hero-subtitle', {
        opacity: 1,
        y: 0,
        duration: 0.7,
    }, '-=0.4')
    .to('.hero-ctas', {
        opacity: 1,
        y: 0,
        duration: 0.7,
    }, '-=0.3')
    .to('.hero-stat', {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.1,
    }, '-=0.3');

    // Hero parallax on scroll
    gsap.to('.hero-bg-img', {
        yPercent: 20,
        ease: 'none',
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: true,
        },
    });
}

// ===== SCROLL REVEAL ANIMATIONS =====
function initScrollReveals() {
    // Reveal all .reveal elements in each section
    const sections = document.querySelectorAll('section, .cta-section');

    sections.forEach(section => {
        const reveals = section.querySelectorAll('.reveal');
        if (reveals.length === 0) return;

        gsap.to(reveals, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                once: true,
            },
        });
    });

    // Service cards — special stagger
    gsap.to('.service-card', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '.services-grid',
            start: 'top 80%',
            once: true,
        },
    });

    // Trek cards — stagger from different directions
    gsap.to('.trek-card', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: {
            amount: 0.6,
            from: 'start',
        },
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '.treks-grid',
            start: 'top 80%',
            once: true,
        },
    });

    // Trek tags — stagger in
    gsap.to('.trek-tag', {
        opacity: 1,
        y: 0,
        duration: 0.4,
        stagger: 0.03,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '.treks-tags',
            start: 'top 85%',
            once: true,
        },
    });

    // Timeline items — alternate slide
    document.querySelectorAll('.timeline-item').forEach((item, i) => {
        const fromX = item.classList.contains('timeline-left') ? -60 : 60;
        gsap.fromTo(item.querySelector('.timeline-content'), {
            opacity: 0,
            x: fromX,
        }, {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: item,
                start: 'top 80%',
                once: true,
            },
        });
    });

    // Athletic cards stagger
    gsap.to('.athletic-card', {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.12,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '.athletic-grid',
            start: 'top 80%',
            once: true,
        },
    });

    // Skills tags pop-in
    gsap.to('.skills-tags span', {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.3,
        stagger: 0.04,
        ease: 'back.out(1.7)',
        scrollTrigger: {
            trigger: '.skills-tags',
            start: 'top 85%',
            once: true,
        },
    });

    // Set initial states for elements not covered by .reveal
    gsap.set('.skills-tags span', { opacity: 0, y: 15, scale: 0.8 });
    gsap.set('.trek-tag', { opacity: 0, y: 15 });
}

// ===== COUNTER ANIMATIONS =====
function initCounterAnimations() {
    // Hero stats
    animateCounters('.hero-stat-number');

    // Stats parallax section
    animateCounters('.stat-number');
}

function animateCounters(selector) {
    const counters = document.querySelectorAll(selector);

    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        if (!target) return;

        gsap.to(counter, {
            innerText: target,
            duration: 2,
            ease: 'power2.out',
            snap: { innerText: 1 },
            scrollTrigger: {
                trigger: counter.closest('section') || counter.closest('.hero'),
                start: 'top 75%',
                once: true,
            },
        });
    });
}

// ===== PARALLAX EFFECTS =====
function initParallax() {
    // Stats section parallax background
    const parallaxBg = document.querySelector('.parallax-bg img');
    if (parallaxBg) {
        gsap.to(parallaxBg, {
            yPercent: -15,
            ease: 'none',
            scrollTrigger: {
                trigger: '.stats-parallax',
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
            },
        });
    }

    // About image subtle float
    gsap.to('.about-image-wrapper', {
        y: -15,
        ease: 'none',
        scrollTrigger: {
            trigger: '.about',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
        },
    });
}

// ===== TESTIMONIALS CAROUSEL =====
function initTestimonials() {
    const slider = document.getElementById('testimonialSlider');
    const dotsContainer = document.getElementById('testimonialDots');
    const cards = slider.querySelectorAll('.testimonial-card');

    // Create dots
    cards.forEach((_, i) => {
        const dot = document.createElement('div');
        dot.className = 'dot' + (i === 0 ? ' active' : '');
        dot.addEventListener('click', () => scrollToCard(i));
        dotsContainer.appendChild(dot);
    });

    const dots = dotsContainer.querySelectorAll('.dot');

    // Update dots on scroll
    slider.addEventListener('scroll', () => {
        const scrollLeft = slider.scrollLeft;
        const cardWidth = cards[0].offsetWidth + 24; // gap
        const active = Math.round(scrollLeft / cardWidth);

        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === active);
        });
    });

    function scrollToCard(index) {
        const cardWidth = cards[0].offsetWidth + 24;
        slider.scrollTo({
            left: cardWidth * index,
            behavior: 'smooth',
        });
    }

    // Auto-scroll
    let autoScrollInterval;
    let currentIndex = 0;

    function startAutoScroll() {
        autoScrollInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % cards.length;
            scrollToCard(currentIndex);
        }, 4000);
    }

    function stopAutoScroll() {
        clearInterval(autoScrollInterval);
    }

    startAutoScroll();

    slider.addEventListener('mouseenter', stopAutoScroll);
    slider.addEventListener('mouseleave', () => {
        const scrollLeft = slider.scrollLeft;
        const cardWidth = cards[0].offsetWidth + 24;
        currentIndex = Math.round(scrollLeft / cardWidth);
        startAutoScroll();
    });

    slider.addEventListener('touchstart', stopAutoScroll, { passive: true });
    slider.addEventListener('touchend', () => {
        setTimeout(() => {
            const scrollLeft = slider.scrollLeft;
            const cardWidth = cards[0].offsetWidth + 24;
            currentIndex = Math.round(scrollLeft / cardWidth);
            startAutoScroll();
        }, 100);
    });
}

// ===== CONTACT FORM =====
function initContactForm() {
    const form = document.getElementById('contactForm');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('formName').value;
        const phone = document.getElementById('formPhone').value;
        const email = document.getElementById('formEmail').value;
        const interest = document.getElementById('formInterest').value;
        const message = document.getElementById('formMessage').value;

        // Build WhatsApp message
        let waMessage = `Hi Snehal! I'm interested in your services.\n\n`;
        waMessage += `*Name:* ${name}\n`;
        waMessage += `*Phone:* ${phone}\n`;
        if (email) waMessage += `*Email:* ${email}\n`;
        waMessage += `*Interest:* ${interest}\n`;
        if (message) waMessage += `*Message:* ${message}\n`;

        const encodedMessage = encodeURIComponent(waMessage);
        const waUrl = `https://wa.me/917208987136?text=${encodedMessage}`;

        // Animate button
        const btn = document.getElementById('formSubmit');
        btn.innerHTML = '<i class="fas fa-check"></i> Redirecting to WhatsApp...';
        btn.style.background = '#25D366';

        setTimeout(() => {
            window.open(waUrl, '_blank');

            // Reset form
            setTimeout(() => {
                form.reset();
                btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
                btn.style.background = '';
            }, 1000);
        }, 500);
    });
}

// ===== SMOOTH SCROLL =====
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 80; // Navbar height
                const y = target.getBoundingClientRect().top + window.pageYOffset - offset;

                window.scrollTo({ top: y, behavior: 'smooth' });

                // Close mobile menu if open
                document.getElementById('navLinks').classList.remove('active');
                document.getElementById('hamburger').classList.remove('active');
            }
        });
    });
}

// ===== MOBILE MENU =====
function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });
}

// ===== ACTIVE NAV LINK ON SCROLL =====
function initActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
}
