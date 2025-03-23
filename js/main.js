// DOM Elements
const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;
const mobileMenuBtn = document.querySelector('.mobile-menu');
const nav = document.querySelector('nav ul');
const navLinks = document.querySelectorAll('nav ul li a');
const contactForm = document.getElementById('contactForm');
const header = document.querySelector('header');

// Initialize theme from localStorage or default to light
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-theme');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
    
    // Add active class to navigation based on scroll position
    updateActiveNavLink();
});

// Theme toggle functionality
themeToggle.addEventListener('click', () => {
    if (body.classList.contains('dark-theme')) {
        body.classList.remove('dark-theme');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        localStorage.setItem('theme', 'light');
    } else {
        body.classList.add('dark-theme');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        localStorage.setItem('theme', 'dark');
    }
});

// Mobile menu toggle
mobileMenuBtn.addEventListener('click', () => {
    nav.classList.toggle('show');
    if (nav.classList.contains('show')) {
        nav.style.display = 'flex';
        nav.style.flexDirection = 'column';
        nav.style.position = 'absolute';
        nav.style.top = '100%';
        nav.style.left = '0';
        nav.style.right = '0';
        nav.style.backgroundColor = 'var(--bg-color)';
        nav.style.padding = '20px';
        nav.style.boxShadow = '0 10px 15px var(--shadow-color)';
        nav.style.zIndex = '1000';
    } else {
        nav.style.display = '';
    }
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (nav.classList.contains('show') && 
        !nav.contains(e.target) && 
        !mobileMenuBtn.contains(e.target)) {
        nav.classList.remove('show');
        nav.style.display = '';
    }
});

// Smooth scrolling for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Close mobile menu if open
        if (nav.classList.contains('show')) {
            nav.classList.remove('show');
            nav.style.display = '';
        }
        
        // Get the target section
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        // Scroll to the target section with offset for the header
        const headerHeight = header.offsetHeight;
        const targetPosition = targetSection.offsetTop - headerHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    });
});

// Function to update active nav link based on scroll position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const headerHeight = header.offsetHeight;
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 100; // Added offset for better UX
            const sectionHeight = section.offsetHeight;
            if (pageYOffset >= sectionTop) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Contact form submission
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // In a real scenario, you would send this data to a server
        // For now, we'll just show an alert and clear the form
        alert('Thank you for your message! I will get back to you soon.');
        contactForm.reset();
    });
}

// Scroll-triggered animations using Intersection Observer
const observerOptions = {
    threshold: 0.25
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
        }
    });
}, observerOptions);

// Add animation classes to elements
document.addEventListener('DOMContentLoaded', () => {
    // Add fade-in animations to sections
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('fade-in');
        observer.observe(section);
    });
    
    // Add slide-in animations to project cards
    document.querySelectorAll('.project-card').forEach(card => {
        card.classList.add('slide-in');
        observer.observe(card);
    });
    
    // Add slide-in animations to timeline items
    document.querySelectorAll('.timeline-item').forEach(item => {
        item.classList.add('slide-in-left');
        observer.observe(item);
    });
});

// Add animation classes to the CSS in JS because they weren't included in the CSS file
const style = document.createElement('style');
style.textContent = `
    .fade-in {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .slide-in {
        opacity: 0;
        transform: translateX(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .slide-in-left {
        opacity: 0;
        transform: translateX(-30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .in-view {
        opacity: 1;
        transform: translateY(0) translateX(0);
    }
`;
document.head.appendChild(style);

// Add subtle parallax effect to hero section
const heroSection = document.querySelector('.hero');
window.addEventListener('scroll', () => {
    const scrollPosition = window.pageYOffset;
    if (heroSection && scrollPosition < heroSection.offsetHeight) {
        const parallaxOffset = scrollPosition * 0.4;
        heroSection.style.backgroundPositionY = `-${parallaxOffset}px`;
    }
});

// Typing animation for hero section
document.addEventListener('DOMContentLoaded', () => {
    const heroText = document.querySelector('.hero-text h2');
    if (heroText) {
        const text = heroText.textContent;
        heroText.textContent = '';
        
        let i = 0;
        const typingInterval = setInterval(() => {
            if (i < text.length) {
                heroText.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(typingInterval);
            }
        }, 100);
    }
});
