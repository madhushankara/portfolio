document.addEventListener("DOMContentLoaded", () => {
    // --- 1. Welcome Animation (Terminal) ---
    const welcomeScreen = document.getElementById('welcome-screen');
    const welcomeText = document.getElementById('welcome-text');
    
    if (!sessionStorage.getItem('welcomePlayed')) {
        const lines = [
            "> initializing madhu.exe...",
            "> loading AI_engineer.module \u2713",
            "> compiling projects...done",
            "> Welcome."
        ];
        
        let lineIndex = 0;
        
        function typeLine() {
            if (lineIndex < lines.length) {
                const p = document.createElement('p');
                welcomeText.appendChild(p);
                
                let charIndex = 0;
                const text = lines[lineIndex];
                
                function typeChar() {
                    if (charIndex < text.length) {
                        p.textContent += text.charAt(charIndex);
                        charIndex++;
                        setTimeout(typeChar, 30); // Typing speed
                    } else {
                        lineIndex++;
                        setTimeout(typeLine, 300); // Line delay
                    }
                }
                typeChar();
            } else {
                setTimeout(() => {
                    welcomeScreen.style.opacity = '0';
                    setTimeout(() => {
                        welcomeScreen.style.display = 'none';
                        document.body.style.overflow = 'auto';
                        sessionStorage.setItem('welcomePlayed', 'true');
                    }, 1000);
                }, 500);
            }
        }
        
        document.body.style.overflow = 'hidden'; // Prevent scroll during intro
        setTimeout(typeLine, 500);
    } else {
        welcomeScreen.style.display = 'none';
    }

    // --- 2. Dark/Light Mode Toggle ---
    const themeBtn = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme');
    
    if (currentTheme === 'light') {
        document.body.classList.add('light-mode');
    }
    
    themeBtn.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        const theme = document.body.classList.contains('light-mode') ? 'light' : 'dark';
        localStorage.setItem('theme', theme);
    });

    // --- 3. Scroll Progress Bar & Nav Highlight ---
    const scrollProgress = document.getElementById('scroll-progress');
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        // Progress bar
        const scrollPx = document.documentElement.scrollTop;
        const winHeightPx = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (scrollPx / winHeightPx) * 100;
        scrollProgress.style.width = `${scrolled}%`;

        // Nav active state
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= (sectionTop - 250)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(a => {
            a.classList.remove('active');
            if (a.getAttribute('href').includes(current)) {
                a.classList.add('active');
            }
        });
    });

    // --- 4. Hamburger Menu ---
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-links a');

    hamburger.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
        });
    });

    // --- 5. Hero Typewriter Effect ---
    const heroTypes = ["NLP Engineer", "GenAI Developer", "AI/ML Engineer", "Startup Builder", "Problem Solver"];
    let hWordIdx = 0;
    let hCharIdx = 0;
    let hDeleting = false;
    const heroTypeEl = document.querySelector('.typewriter');

    function heroType() {
        const currentWord = heroTypes[hWordIdx];
        
        if (hDeleting) {
            heroTypeEl.textContent = currentWord.substring(0, hCharIdx - 1);
            hCharIdx--;
        } else {
            heroTypeEl.textContent = currentWord.substring(0, hCharIdx + 1);
            hCharIdx++;
        }

        let speed = hDeleting ? 50 : 100;

        if (!hDeleting && hCharIdx === currentWord.length) {
            speed = 2000;
            hDeleting = true;
        } else if (hDeleting && hCharIdx === 0) {
            hDeleting = false;
            hWordIdx = (hWordIdx + 1) % heroTypes.length;
            speed = 500;
        }
        setTimeout(heroType, speed);
    }
    setTimeout(heroType, (sessionStorage.getItem('welcomePlayed') ? 1000 : 4000));

    // --- 6. Intersection Observer for Scroll Animations ---
    const revealElements = document.querySelectorAll('.reveal');
    
    // Auto-assign staggered delays for items inside .stagger-group
    document.querySelectorAll('.stagger-group').forEach(group => {
        const children = group.querySelectorAll('.reveal');
        children.forEach((child, index) => {
            child.style.transitionDelay = `${index * 100}ms`;
        });
    });

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, { threshold: 0.15, rootMargin: "0px 0px -50px 0px" });

    revealElements.forEach(el => revealObserver.observe(el));

    // --- 7. Mindset Terminal Typeout Trigger ---
    const terminalEl = document.getElementById('mindset-terminal');
    const mindsetConfig = `> loading personality.config...
  curiosity:     ALWAYS_ON
  learning:      CONTINUOUS
  competition:   CHESS + LEETCODE (500d streak)
  environment:   startup > enterprise
  pace:          fast > comfortable
  approach:      build -> break -> learn -> repeat
  energy:        "how does this work?" x100/day
> config loaded. ready to ship.`;

    let terminalTyped = false;
    const mindsetObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !terminalTyped) {
            terminalTyped = true;
            let i = 0;
            function typeTerminal() {
                if (i < mindsetConfig.length) {
                    terminalEl.textContent += mindsetConfig.charAt(i);
                    i++;
                    setTimeout(typeTerminal, 15);
                }
            }
            setTimeout(typeTerminal, 500);
        }
    }, { threshold: 0.5 });
    
    mindsetObserver.observe(document.querySelector('.mindset-right'));

    // --- 8. Pure JS Canvas Particles (Hero Background) ---
    const canvas = document.getElementById('hero-canvas');
    const ctx = canvas.getContext('2d');
    
    let particles = [];
    
    function initCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        particles = [];
        const numParticles = Math.min(Math.floor(window.innerWidth / 15), 80);
        
        for (let i = 0; i < numParticles; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                radius: Math.random() * 2 + 1
            });
        }
    }
    
    function animateCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        const isLightMode = document.body.classList.contains('light-mode');
        ctx.fillStyle = isLightMode ? 'rgba(0, 102, 255, 0.5)' : 'rgba(0, 240, 255, 0.5)';
        ctx.strokeStyle = isLightMode ? 'rgba(0, 102, 255, 0.1)' : 'rgba(0, 240, 255, 0.1)';
        
        for (let i = 0; i < particles.length; i++) {
            let p = particles[i];
            p.x += p.vx;
            p.y += p.vy;
            
            if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
            if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
            
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fill();
            
            // Connect nearby particles
            for (let j = i + 1; j < particles.length; j++) {
                let p2 = particles[j];
                let dist = Math.hypot(p.x - p2.x, p.y - p2.y);
                if (dist < 100) {
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(animateCanvas);
    }
    
    initCanvas();
    animateCanvas();
    window.addEventListener('resize', initCanvas);

    // --- 9. Custom Neon Cursor Trail ---
    if (window.matchMedia("(pointer: fine)").matches) {
        document.addEventListener('mousemove', (e) => {
            const dot = document.createElement('div');
            dot.className = 'cursor-dot';
            dot.style.left = `${e.clientX}px`;
            dot.style.top = `${e.clientY}px`;
            document.body.appendChild(dot);
            
            // Trigger reflow
            void dot.offsetWidth;
            
            // Fade and scale out
            dot.style.transform = 'translate(-50%, -50%) scale(0)';
            dot.style.opacity = '0';
            
            setTimeout(() => {
                dot.remove();
            }, 500);
        });
    }
});
