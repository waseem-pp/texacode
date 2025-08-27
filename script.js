// Smooth scrolling function
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
        }
    });
}, observerOptions);

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add scroll indicator bounce animation
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            scrollToSection('services');
        });
    }

    // Observe elements for animations
    const animatedElements = document.querySelectorAll('.service-card, .portfolio-card, .contact-card, .section-header');
    animatedElements.forEach(el => observer.observe(el));

    // Add hover effects to portfolio cards
    const portfolioCards = document.querySelectorAll('.portfolio-card');
    portfolioCards.forEach(card => {
        const image = card.querySelector('.portfolio-image img');
        const overlay = card.querySelector('.portfolio-overlay');
        const actions = card.querySelector('.portfolio-actions');

        card.addEventListener('mouseenter', () => {
            if (image) image.style.transform = 'scale(1.1)';
            if (overlay) overlay.style.opacity = '1';
            if (actions) actions.style.transform = 'translateY(0)';
        });

        card.addEventListener('mouseleave', () => {
            if (image) image.style.transform = 'scale(1)';
            if (overlay) overlay.style.opacity = '0';
            if (actions) actions.style.transform = 'translateY(1rem)';
        });
    });

    // Add click handlers for portfolio buttons
    const portfolioButtons = document.querySelectorAll('.portfolio-actions .btn');
    portfolioButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            // Add your portfolio item click logic here
            console.log('Portfolio item clicked:', button.textContent.trim());
        });
    });

    // Add parallax effect to hero background
    const heroBackground = document.querySelector('.hero-background');
    if (heroBackground) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            heroBackground.style.transform = `translateY(${rate}px)`;
        });
    }

    // Add navbar scroll effect (if you want to add a navbar later)
    let lastScrollTop = 0;
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Update scroll indicator visibility
        if (scrollIndicator) {
            if (scrollTop > 100) {
                scrollIndicator.style.opacity = '0';
                scrollIndicator.style.pointerEvents = 'none';
            } else {
                scrollIndicator.style.opacity = '1';
                scrollIndicator.style.pointerEvents = 'auto';
            }
        }
        
        lastScrollTop = scrollTop;
    });

    // Add form validation for contact emails (basic)
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    emailLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // You can add analytics tracking here
            console.log('Email contact initiated');
        });
    });

    // Add Instagram link tracking
    const instagramLinks = document.querySelectorAll('a[href*="instagram.com"]');
    instagramLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // You can add analytics tracking here
            console.log('Instagram contact initiated');
        });
    });

    // Add typing effect to hero title (optional enhancement)
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle && window.innerWidth > 768) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        let index = 0;
        
        const typeWriter = () => {
            if (index < text.length) {
                heroTitle.textContent += text.charAt(index);
                index++;
                setTimeout(typeWriter, 100);
            }
        };
        
        // Start typing effect after a short delay
        setTimeout(typeWriter, 500);
    }

    // Add loading states for buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            // Add loading effect
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });

    // Add keyboard navigation support
    document.addEventListener('keydown', (e) => {
        // Add keyboard shortcuts for navigation
        if (e.ctrlKey || e.metaKey) {
            switch(e.key) {
                case '1':
                    e.preventDefault();
                    scrollToSection('hero');
                    break;
                case '2':
                    e.preventDefault();
                    scrollToSection('services');
                    break;
                case '3':
                    e.preventDefault();
                    scrollToSection('portfolio');
                    break;
                case '4':
                    e.preventDefault();
                    scrollToSection('contact');
                    break;
            }
        }
    });

    // Add escape key to close any open modals/overlays
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            // Handle escape key
            console.log('Escape pressed');
        }
    });

    // Performance optimization: Throttle scroll events
    let ticking = false;
    function updateScrollEffects() {
        // Update any scroll-based effects here
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    });

    // Add preloader effect (optional)
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
        // Remove any loading indicators
        const loader = document.querySelector('.loader');
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(() => loader.remove(), 300);
        }
    });

    console.log('Portfolio website initialized successfully!');
});

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
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

// Export functions for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        scrollToSection,
        debounce,
        throttle
    };
}