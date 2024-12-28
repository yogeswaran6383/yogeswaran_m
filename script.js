// Typewriter effect
function typeWriter(text, element, speed = 100) {
    let i = 0;
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollTop = 0;
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Form submission handling
document.getElementById('contactForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value,
        timestamp: new Date().toISOString()
    };

    try {
        const response = await google.script.run.withSuccessHandler(onSuccess)
            .withFailureHandler(onFailure)
            .submitForm(formData);
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again later.');
    }
});

function onSuccess() {
    alert('Message sent successfully!');
    document.getElementById('contactForm').reset();
}

function onFailure(error) {
    console.error('Error:', error);
    alert('Failed to send message. Please try again.');
}

// Intersection Observer for animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, {
    threshold: 0.1
});

document.querySelectorAll('.skill-card, .cert-card').forEach((el) => observer.observe(el));

// Handle image loading
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('load', function() {
        this.classList.add('loaded');
    });
});

// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;

    // Create overlay element
    const overlay = document.createElement('div');
    overlay.className = 'menu-overlay';
    body.appendChild(overlay);

    // Toggle menu
    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
        overlay.classList.toggle('active');
        body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu when clicking overlay
    overlay.addEventListener('click', function() {
        navLinks.classList.remove('active');
        menuToggle.classList.remove('active');
        overlay.classList.remove('active');
        body.style.overflow = '';
    });

    // Close menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
            overlay.classList.remove('active');
            body.style.overflow = '';
        });
    });

    // Close menu on window resize if open
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
            overlay.classList.remove('active');
            body.style.overflow = '';
        }
    });
});

// Optimize scroll performance
let ticking = false;
window.addEventListener('scroll', function() {
    if (!ticking) {
        window.requestAnimationFrame(function() {
            // Your scroll handling code
            ticking = false;
        });
        ticking = true;
    }
});

// Optimize resize performance
let resizeTimeout;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function() {
        // Your resize handling code
    }, 250);
});
