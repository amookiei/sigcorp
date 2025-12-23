/**
 * Interactive Effects & Animations
 * SIG Corporation - 재미있고 반응형인 인터랙티브 요소들
 */

// ==========================================
// Scroll Animations
// ==========================================

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // 애니메이션 대상 요소들
    const animateElements = document.querySelectorAll(`
        .feature-card,
        .portfolio-item,
        .value-item,
        .team-card,
        .stat-item,
        .section-title,
        .section-subtitle
    `);

    animateElements.forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
}

// ==========================================
// Parallax Scroll Effect
// ==========================================

function initParallax() {
    const parallaxElements = document.querySelectorAll('.parallax');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// ==========================================
// Smooth Scroll
// ==========================================

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ==========================================
// Cursor Effect (Desktop only)
// ==========================================

function initCustomCursor() {
    if (window.innerWidth < 768) return; // 모바일에서는 제외
    
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);
    
    const cursorFollower = document.createElement('div');
    cursorFollower.className = 'custom-cursor-follower';
    document.body.appendChild(cursorFollower);
    
    let mouseX = 0;
    let mouseY = 0;
    let followerX = 0;
    let followerY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
    });
    
    function animateFollower() {
        const dx = mouseX - followerX;
        const dy = mouseY - followerY;
        
        followerX += dx * 0.1;
        followerY += dy * 0.1;
        
        cursorFollower.style.left = followerX + 'px';
        cursorFollower.style.top = followerY + 'px';
        
        requestAnimationFrame(animateFollower);
    }
    animateFollower();
    
    // 호버 효과
    document.querySelectorAll('a, button, .portfolio-item, .feature-card, .blog-card, .blog-hero-card, .blog-create-btn').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('cursor-hover');
            cursorFollower.classList.add('cursor-hover');
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('cursor-hover');
            cursorFollower.classList.remove('cursor-hover');
        });
    });
}

// ==========================================
// Card Tilt Effect (3D)
// ==========================================

function initCardTilt() {
    const cards = document.querySelectorAll('.feature-card, .portfolio-item, .team-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });
}

// ==========================================
// Scroll Progress Indicator
// ==========================================

function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.pageYOffset / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// ==========================================
// Button Ripple Effect
// ==========================================

function initRippleEffect() {
    const buttons = document.querySelectorAll('.hero-btn, .cta-button, .form-submit, .admin-btn, .auth-button, .blog-create-btn, .editor-btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// ==========================================
// Text Reveal Animation
// ==========================================

function initTextReveal() {
    const textElements = document.querySelectorAll('.hero-section h1, .section-title');
    
    textElements.forEach(el => {
        const text = el.textContent;
        const words = text.split(' ');
        
        el.innerHTML = words.map((word, i) => 
            `<span class="word" style="animation-delay: ${i * 0.1}s">${word}</span>`
        ).join(' ');
    });
}

// ==========================================
// Magnetic Button Effect
// ==========================================

function initMagneticButtons() {
    const magneticButtons = document.querySelectorAll('.hero-btn, .cta-button, .blog-create-btn');
    
    magneticButtons.forEach(button => {
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            button.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translate(0, 0)';
        });
    });
}

// ==========================================
// Timeline Hover Center & Fade
// ==========================================

function initTimelineShowcase() {
    const track = document.querySelector('.timeline-track');
    if (!track) return;

    const items = Array.from(track.querySelectorAll('.timeline-item'));
    if (!items.length) return;

    const maxDistance = 4;
    let activeIndex = Math.floor(items.length / 2);

    const updateDistances = (targetIndex) => {
        items.forEach((item, index) => {
            const distance = Math.min(Math.abs(index - targetIndex), maxDistance);
            item.style.setProperty('--distance', distance);
            item.classList.toggle('is-active', index === targetIndex);
        });
    };

    const centerItem = (item) => {
        const containerRect = track.getBoundingClientRect();
        const itemRect = item.getBoundingClientRect();
        const currentScroll = track.scrollLeft;
        const offset = itemRect.left - (containerRect.left + (containerRect.width / 2) - (itemRect.width / 2));
        track.scrollTo({
            left: currentScroll + offset,
            behavior: 'smooth'
        });
    };

    const activate = (index) => {
        if (index < 0 || index >= items.length) return;
        activeIndex = index;
        updateDistances(activeIndex);
        centerItem(items[activeIndex]);
    };

    items.forEach((item, index) => {
        item.addEventListener('pointerenter', () => activate(index));
        item.addEventListener('focus', () => activate(index));
        item.addEventListener('click', () => activate(index));
    });

    // 초기 상태 세팅
    updateDistances(activeIndex);
    requestAnimationFrame(() => {
        centerItem(items[activeIndex]);
    });

    // 휠 스크롤로도 부드럽게 이동
    track.addEventListener('wheel', (event) => {
        if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;
        event.preventDefault();
        track.scrollBy({
            left: event.deltaY,
            behavior: 'smooth'
        });
    }, { passive: false });
}

// ==========================================
// Mobile Navigation
// ==========================================

function initMobileNavigation() {
    const toggle = document.querySelector('.nav-toggle');
    const collapsible = document.querySelector('.nav-collapsible');
    const navMenu = document.querySelector('.nav-menu');
    const navActions = document.querySelector('.nav-actions');

    if (!toggle || !collapsible || !navMenu) {
        return;
    }

    const closeNav = () => {
        document.body.classList.remove('nav-open');
        toggle.setAttribute('aria-expanded', 'false');
    };

    toggle.addEventListener('click', (event) => {
        event.stopPropagation();
        const willOpen = !document.body.classList.contains('nav-open');
        document.body.classList.toggle('nav-open', willOpen);
        toggle.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
        if (willOpen) {
            collapsible.focus?.();
        }
    });

    const interactiveElements = [
        ...navMenu.querySelectorAll('a'),
        ...(navActions ? navActions.querySelectorAll('a, button') : [])
    ];

    interactiveElements.forEach((element) => {
        element.addEventListener('click', () => {
            closeNav();
        });
    });

    document.addEventListener('click', (event) => {
        if (!document.body.classList.contains('nav-open')) return;
        const withinNav = collapsible.contains(event.target) || toggle.contains(event.target);
        if (!withinNav) {
            closeNav();
        }
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            closeNav();
        }
    });
}

// ==========================================
// Initialize All
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    initScrollAnimations();
    initParallax();
    initSmoothScroll();
    // initCustomCursor(); // 커스텀 커서 비활성화
    initCardTilt();
    initScrollProgress();
    initRippleEffect();
    initMagneticButtons();
    initTimelineShowcase();
    initMobileNavigation();
    
    // 모바일 감지
    if (window.innerWidth < 768) {
        document.body.classList.add('mobile-device');
    }
});

