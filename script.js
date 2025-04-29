document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
            navLinks.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });

    // Add scroll event for navbar background
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = 'rgba(0, 0, 0, 0.95)';
        } else {
            navbar.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        }
    });

    // Ecosystem cards hover effect
    const ecosystemCards = document.querySelectorAll('.ecosystem-card');
    ecosystemCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            ecosystemCards.forEach(c => {
                if (c !== card) {
                    c.style.opacity = '0.6';
                }
            });
        });

        card.addEventListener('mouseleave', () => {
            ecosystemCards.forEach(c => {
                c.style.opacity = '1';
            });
        });
    });

    // Timeline animation
    const timelineItems = document.querySelectorAll('.timeline-item');
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }
        });
    }, { threshold: 0.5 });

    timelineItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = item.querySelector('.timeline-content').style.marginLeft === '0px' 
            ? 'translateX(-50px)' 
            : 'translateX(50px)';
        timelineObserver.observe(item);
    });

    // Newsletter form submission
    const newsletterForm = document.querySelector('.signup-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = newsletterForm.querySelector('input[type="email"]').value;
            
            // Add animation to button
            const submitBtn = newsletterForm.querySelector('button');
            submitBtn.innerHTML = 'Subscribing...';
            submitBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                submitBtn.innerHTML = 'Subscribed!';
                submitBtn.style.backgroundColor = '#27AE60';
                
                // Reset form
                setTimeout(() => {
                    newsletterForm.reset();
                    submitBtn.innerHTML = 'Subscribe';
                    submitBtn.style.backgroundColor = '';
                    submitBtn.disabled = false;
                }, 2000);
            }, 1500);
        });
    }

    // Intersection Observer for section animations
    const sections = document.querySelectorAll('section:not(.status-section)');
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px'
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Make status sections visible by default
    document.querySelectorAll('.status-section').forEach(section => {
        section.style.opacity = '1';
        section.style.transform = 'none';
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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

    // Learn More button animation
    const learnMoreBtn = document.querySelector('.learn-more');
    if (learnMoreBtn) {
        learnMoreBtn.addEventListener('click', () => {
            const aboutSection = document.querySelector('#about');
            if (aboutSection) {
                aboutSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }

    // Parallax effect for sphere and cube
    let lastScrollY = window.scrollY;
    const sphere = document.querySelector('.sphere');
    const cube = document.querySelector('.cube');

    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const delta = scrolled - lastScrollY;
        
        if (sphere && cube) {
            const sphereRotation = parseFloat(getComputedStyle(sphere).getPropertyValue('--rotation') || '0');
            const cubeY = parseFloat(getComputedStyle(cube).getPropertyValue('--translateY') || '0');
            
            sphere.style.setProperty('--rotation', sphereRotation + delta * 0.1 + 'deg');
            cube.style.setProperty('--translateY', Math.min(Math.max(cubeY + delta * 0.05, -20), 20) + 'px');
        }
        
        lastScrollY = scrolled;
    });

    // Add particle effect to hero section
    const createParticle = () => {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(198, 169, 98, 0.2);
            pointer-events: none;
        `;
        
        const startX = Math.random() * window.innerWidth;
        const startY = Math.random() * window.innerHeight;
        
        particle.style.left = startX + 'px';
        particle.style.top = startY + 'px';
        
        document.querySelector('.hero').appendChild(particle);
        
        const animation = particle.animate([
            { transform: 'translate(0, 0)', opacity: 1 },
            { transform: `translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px)`, opacity: 0 }
        ], {
            duration: 3000,
            easing: 'ease-out'
        });
        
        animation.onfinish = () => particle.remove();
    };

    // Create particles periodically
    setInterval(createParticle, 100);
}); 