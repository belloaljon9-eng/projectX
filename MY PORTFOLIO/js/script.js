// ===================================================
// Animated Geometric Particles for Hero Section
// ===================================================
class Particle {
    constructor(canvas) {
        this.canvas = canvas;
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
        this.opacity = Math.random() * 0.5 + 0.2;
        this.color = Math.random() > 0.5 ? '#06b6d4' : '#7c3aed';
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.opacity -= 0.003;

        if (this.x > this.canvas.width) this.x = 0;
        if (this.x < 0) this.x = this.canvas.width;
        if (this.y > this.canvas.height) this.y = 0;
        if (this.y < 0) this.y = this.canvas.height;
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.opacity;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
    }
}

class ParticleSystem {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;

        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.particleCount = 50;

        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());

        // Create initial particles
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push(new Particle(this.canvas));
        }

        this.animate();
    }

    resizeCanvas() {
        const heroSection = document.querySelector('.hero');
        if (heroSection) {
            this.canvas.width = heroSection.offsetWidth;
            this.canvas.height = heroSection.offsetHeight;
        }
    }

    animate() {
        // Clear with subtle fade
        this.ctx.fillStyle = 'rgba(10, 10, 20, 0.1)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Update and draw particles
        this.particles.forEach((particle, index) => {
            particle.update();
            particle.draw(this.ctx);

            // Remove dead particles and create new ones
            if (particle.opacity <= 0) {
                this.particles.splice(index, 1);
                this.particles.push(new Particle(this.canvas));
            }
        });

        requestAnimationFrame(() => this.animate());
    }
}

// Initialize particle system
new ParticleSystem('binaryRain');

// ===================================================
// Enhanced Typing Animation with Glitch Effect
// ===================================================
class TypingEffect {
    constructor() {
        this.typingText = document.querySelector('.typing-text');
        this.typingCursor = document.querySelector('.typing-cursor');
        this.fullText = "Creative Developer & Designer";
        this.index = 0;
        this.isTyping = true;
        this.glitchChance = 0.05;

        if (this.typingText) {
            window.addEventListener('load', () => this.startTyping());
            if (this.typingText.parentElement) {
                this.typingText.parentElement.addEventListener('mouseenter', () => this.resetTyping());
            }
        }
    }

    startTyping() {
        if (this.index < this.fullText.length) {
            const char = this.fullText[this.index];
            
            // Random glitch effect
            if (Math.random() < this.glitchChance) {
                this.typingText.textContent += this.getRandomChar();
                setTimeout(() => {
                    this.typingText.textContent = this.typingText.textContent.slice(0, -1);
                    this.typingText.textContent += char;
                    this.index++;
                    setTimeout(() => this.startTyping(), 80);
                }, 50);
            } else {
                this.typingText.textContent += char;
                this.index++;
                setTimeout(() => this.startTyping(), 80);
            }
        } else {
            this.isTyping = false;
            this.addCursorBlink();
        }
    }

    getRandomChar() {
        const chars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
        return chars[Math.floor(Math.random() * chars.length)];
    }

    resetTyping() {
        if (!this.isTyping) {
            this.typingText.textContent = '';
            this.index = 0;
            this.isTyping = true;
            this.startTyping();
        }
    }

    addCursorBlink() {
        if (this.typingCursor) {
            this.typingCursor.style.animation = 'blink 0.7s infinite';
        }
    }
}

new TypingEffect();

// ===================================================
// Smooth Scrolling with Active Link Detection
// ===================================================
class SmoothScroll {
    constructor() {
        this.setupSmoothScroll();
        this.setupActiveNavLink();
    }

    setupSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const href = anchor.getAttribute('href');
                if (href !== '#') {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    if (target) {
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                        
                        // Add glow effect to active link
                        this.updateActiveLink(href);
                    }
                }
            });
        });
    }

    setupActiveNavLink() {
        window.addEventListener('scroll', () => {
            let current = '';
            const sections = document.querySelectorAll('section');
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                if (window.scrollY >= sectionTop - 200) {
                    current = section.getAttribute('id');
                }
            });
            
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').slice(1) === current) {
                    link.classList.add('active');
                }
            });
        });
    }

    updateActiveLink(href) {
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === href) {
                link.classList.add('active');
            }
        });
    }
}

new SmoothScroll();

// ===================================================
// Intersection Observer for Scroll Animations
// ===================================================
class ScrollAnimations {
    constructor() {
        this.setupObserver();
    }

    setupObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    
                    // Add glow effect
                    entry.target.style.boxShadow = '0 0 30px rgba(6, 182, 212, 0.3)';
                    entry.target.style.animation = 'pulse-in 0.6s ease';
                }
            });
        }, observerOptions);

        // Observe project cards
        document.querySelectorAll('.project-card').forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(card);
        });

        // Observe about content
        const aboutContent = document.querySelector('.about-content');
        if (aboutContent) {
            aboutContent.style.opacity = '0';
            aboutContent.style.transform = 'translateX(-20px)';
            aboutContent.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(aboutContent);
        }

        // Add pulse-in animation
        this.addPulseAnimation();
    }

    addPulseAnimation() {
        if (!document.querySelector('style[data-pulse-animation]')) {
            const style = document.createElement('style');
            style.setAttribute('data-pulse-animation', 'true');
            style.textContent = `
                @keyframes pulse-in {
                    0% {
                        box-shadow: 0 0 0 rgba(6, 182, 212, 0.4);
                    }
                    50% {
                        box-shadow: 0 0 30px rgba(6, 182, 212, 0.3);
                    }
                    100% {
                        box-shadow: 0 0 0 rgba(6, 182, 212, 0);
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }
}

new ScrollAnimations();

// ===================================================
// Interactive Button Effects
// ===================================================
class ButtonEffects {
    constructor() {
        this.setupButtonHoverEffects();
    }

    setupButtonHoverEffects() {
        document.querySelectorAll('.btn').forEach(btn => {
            btn.addEventListener('mouseenter', (e) => {
                this.createRipple(e, btn);
            });

            btn.addEventListener('click', (e) => {
                btn.style.animation = 'none';
                setTimeout(() => {
                    btn.style.animation = '';
                }, 10);
            });
        });
    }

    createRipple(event, button) {
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');

        // Add ripple styles
        if (!document.querySelector('style[data-ripple-effect]')) {
            const style = document.createElement('style');
            style.setAttribute('data-ripple-effect', 'true');
            style.textContent = `
                .btn {
                    position: relative;
                    overflow: hidden;
                }
                .ripple {
                    position: absolute;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.6);
                    transform: scale(0);
                    animation: ripple-effect 0.6s ease-out;
                    pointer-events: none;
                }
                @keyframes ripple-effect {
                    to {
                        transform: scale(4);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }

        button.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    }
}

new ButtonEffects();

// ===================================================
// Contact Form Validation & Effects
// ===================================================
class ContactFormHandler {
    constructor() {
        this.contactForm = document.querySelector('.contact-form');
        if (this.contactForm) {
            this.setupFormValidation();
            this.setupFormEffects();
        }
    }

    setupFormValidation() {
        const inputs = this.contactForm.querySelectorAll('input, textarea');
        
        inputs.forEach(input => {
            input.addEventListener('focus', (e) => {
                e.target.style.borderColor = '#06b6d4';
                e.target.style.boxShadow = '0 0 20px rgba(6, 182, 212, 0.4)';
            });

            input.addEventListener('blur', (e) => {
                if (!e.target.value) {
                    e.target.style.borderColor = 'rgba(124, 58, 237, 0.3)';
                    e.target.style.boxShadow = 'none';
                }
            });

            input.addEventListener('input', (e) => {
                if (e.target.value) {
                    e.target.style.borderColor = '#7c3aed';
                }
            });
        });

        this.contactForm.addEventListener('submit', (e) => {
            this.handleSubmit(e);
        });
    }

    setupFormEffects() {
        const inputs = this.contactForm.querySelectorAll('input, textarea');
        inputs.forEach((input, index) => {
            input.addEventListener('focus', () => {
                this.addFloatingLabel(input);
            });
        });
    }

    addFloatingLabel(input) {
        if (!input.style.backgroundColor.includes('1a1a2e')) {
            input.style.transition = 'all 0.3s ease';
        }
    }

    handleSubmit(e) {
        const button = this.contactForm.querySelector('button');
        if (button) {
            button.style.animation = 'none';
            button.textContent = 'Sending...';
            button.disabled = true;

            setTimeout(() => {
                button.textContent = 'Message Sent! ✓';
                button.style.background = 'linear-gradient(135deg, #06b6d4, #00ff88)';
                
                setTimeout(() => {
                    button.textContent = 'Send Message';
                    button.disabled = false;
                    button.style.background = '';
                }, 3000);
            }, 1000);
        }
    }
}

new ContactFormHandler();

// ===================================================
// Navbar Effects & Animations
// ===================================================
class NavbarEffects {
    constructor() {
        this.navbar = document.querySelector('.navbar');
        this.setupScrollEffect();
        this.setupLogoGlitch();
    }

    setupScrollEffect() {
        let lastScrollTop = 0;
        window.addEventListener('scroll', () => {
            let scrollTop = window.scrollY;
            
            if (scrollTop > 50) {
                this.navbar.style.backdropFilter = 'blur(20px)';
                this.navbar.style.boxShadow = '0 0 30px rgba(124, 58, 237, 0.2)';
            } else {
                this.navbar.style.backdropFilter = 'blur(10px)';
                this.navbar.style.boxShadow = '0 0 20px rgba(124, 58, 237, 0.3)';
            }

            lastScrollTop = scrollTop;
        });
    }

    setupLogoGlitch() {
        const logo = document.querySelector('.logo');
        if (logo) {
            logo.addEventListener('mouseenter', () => {
                this.applyGlitchEffect(logo);
            });
        }
    }

    applyGlitchEffect(element) {
        const originalText = element.textContent;
        let glitchCount = 0;

        const glitchInterval = setInterval(() => {
            if (glitchCount > 5) {
                element.textContent = originalText;
                clearInterval(glitchInterval);
                return;
            }

            let glitchedText = '';
            for (let i = 0; i < originalText.length; i++) {
                glitchedText += Math.random() > 0.7 ? String.fromCharCode(33 + Math.random() * 94) : originalText[i];
            }
            element.textContent = glitchedText;
            glitchCount++;
        }, 50);
    }
}

new NavbarEffects();

// ===================================================
// Skill Progress Animation
// ===================================================
class SkillProgressAnimation {
    constructor() {
        this.setupSkillAnimation();
    }

    setupSkillAnimation() {
        const skillBars = document.querySelectorAll('.skill-progress');
        const observerOptions = {
            threshold: 0.5
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                    const width = entry.target.style.width;
                    entry.target.style.width = '0%';
                    
                    setTimeout(() => {
                        entry.target.style.transition = 'width 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                        entry.target.style.width = width;
                        entry.target.classList.add('animated');
                    }, 100);
                }
            });
        }, observerOptions);

        skillBars.forEach(bar => observer.observe(bar));
    }
}

new SkillProgressAnimation();

// ===================================================
// Mouse Trail Effect (Optional Premium Effect)
// ===================================================
class MouseTrail {
    constructor() {
        this.trails = [];
        this.setupMouseTrail();
    }

    setupMouseTrail() {
        document.addEventListener('mousemove', (e) => {
            if (Math.random() > 0.8) {
                this.createTrail(e.clientX, e.clientY);
            }
        });

        setInterval(() => {
            this.trails.forEach((trail, index) => {
                trail.opacity -= 0.05;
                trail.element.style.opacity = trail.opacity;

                if (trail.opacity <= 0) {
                    trail.element.remove();
                    this.trails.splice(index, 1);
                }
            });
        }, 30);
    }

    createTrail(x, y) {
        const trail = document.createElement('div');
        trail.style.position = 'fixed';
        trail.style.left = x + 'px';
        trail.style.top = y + 'px';
        trail.style.width = '8px';
        trail.style.height = '8px';
        trail.style.borderRadius = '50%';
        trail.style.background = Math.random() > 0.5 ? '#06b6d4' : '#7c3aed';
        trail.style.pointerEvents = 'none';
        trail.style.zIndex = '999';
        trail.style.boxShadow = '0 0 10px currentColor';

        document.body.appendChild(trail);
        this.trails.push({
            element: trail,
            opacity: 1
        });
    }
}

// Uncomment to enable mouse trail
// new MouseTrail();

// ===================================================
// Performance Monitoring (Optional)
// ===================================================
console.log('%c🎮 Portfolio Loaded Successfully!', 'color: #06b6d4; font-size: 14px; font-weight: bold; text-shadow: 0 0 10px #7c3aed;');
console.log('%cTech/Gaming Aesthetic Active', 'color: #7c3aed; font-size: 12px; font-weight: bold;');