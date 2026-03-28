document.addEventListener("DOMContentLoaded", () => {
    // --- 1. Welcome Animation (Terminal) & Video Play Logic ---
    const welcomeScreen = document.getElementById('welcome-screen');
    const welcomeText = document.getElementById('welcome-text');
    
    // Function to safely play the hero video
    const playHeroVideo = () => {
        const heroVideo = document.getElementById('hero-video');
        if (heroVideo) {
            heroVideo.currentTime = 0;
            heroVideo.play().catch(e => console.log("Autoplay prevented:", e));
        }
    };

    if (welcomeScreen && !sessionStorage.getItem('welcomePlayed')) {
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
                        setTimeout(typeChar, 30); // 30ms char typing speed
                    } else {
                        lineIndex++;
                        setTimeout(typeLine, 150); // 150ms line delay
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
                        // Video starts playing EXACTLY here, after the screen is completely gone
                        playHeroVideo();
                    }, 400); // 400ms fade-out
                }, 500);
            }
        }
        
        document.body.style.overflow = 'hidden';
        setTimeout(typeLine, 500);
    } else if (welcomeScreen) {
        welcomeScreen.style.display = 'none';
        // Video starts playing immediately if animation is skipped
        playHeroVideo();
    }

    // --- 2. Dark/Light Mode Toggle ---
    const themeBtn = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme');
    
    if (currentTheme === 'light') document.body.classList.add('light-mode');
    
    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            document.body.classList.toggle('light-mode');
            localStorage.setItem('theme', document.body.classList.contains('light-mode') ? 'light' : 'dark');
        });
    }

    // --- 3. Nav Highlight on Scroll ---
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            if (pageYOffset >= (section.offsetTop - 250)) {
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

    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', () => mobileMenu.classList.toggle('active'));
        mobileLinks.forEach(link => link.addEventListener('click', () => mobileMenu.classList.remove('active')));
    }

    // --- 5. Hero Typewriter Effect ---
    const heroTypeEl = document.querySelector('.typewriter');
    if (heroTypeEl) {
        const heroTypes = ["NLP Engineer", "GenAI Developer", "AI/ML Engineer", "Startup Builder", "Problem Solver"];
        let hWordIdx = 0, hCharIdx = 0, hDeleting = false;

        function heroType() {
            const currentWord = heroTypes[hWordIdx];
            heroTypeEl.textContent = currentWord.substring(0, hCharIdx + (hDeleting ? -1 : 1));
            hCharIdx += hDeleting ? -1 : 1;

            let speed = hDeleting ? 50 : 100;
            if (!hDeleting && hCharIdx === currentWord.length) { speed = 2000; hDeleting = true; } 
            else if (hDeleting && hCharIdx === 0) { hDeleting = false; hWordIdx = (hWordIdx + 1) % heroTypes.length; speed = 500; }
            setTimeout(heroType, speed);
        }
        setTimeout(heroType, sessionStorage.getItem('welcomePlayed') ? 1000 : 2500);
    }

    // --- 6. Mindset Terminal Typeout ---
    const terminalEl = document.getElementById('mindset-terminal');
    if (terminalEl) {
        const mindsetConfig = `> loading personality.config...\n  curiosity:     ALWAYS_ON\n  learning:      CONTINUOUS\n  competition:   CHESS + LEETCODE (500d streak)\n  environment:   startup > enterprise\n  pace:          fast > comfortable\n  approach:      build -> break -> learn -> repeat\n  energy:        "how does this work?" x100/day\n> config loaded. ready to ship.`;
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
    }

    // --- 7. Pure JS Canvas Particles (Global Background) ---
    const canvas = document.getElementById('bg-canvas');
    if (canvas) {
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
                p.x += p.vx; p.y += p.vy;
                if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
                if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
                
                ctx.beginPath(); ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2); ctx.fill();
                for (let j = i + 1; j < particles.length; j++) {
                    let p2 = particles[j];
                    if (Math.hypot(p.x - p2.x, p.y - p2.y) < 100) {
                        ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(p2.x, p2.y); ctx.stroke();
                    }
                }
            }
            requestAnimationFrame(animateCanvas);
        }
        initCanvas(); animateCanvas();
        window.addEventListener('resize', initCanvas);
    }

    // --- 8. Neon Cursor Trail ---
    if (!('ontouchstart' in window)) {
        const dots = [];
        document.addEventListener('mousemove', (e) => {
            const dot = document.createElement('div');
            dot.style.width = '8px';
            dot.style.height = '8px';
            dot.style.borderRadius = '50%';
            dot.style.background = '#00f0ff';
            dot.style.position = 'fixed';
            dot.style.pointerEvents = 'none';
            dot.style.zIndex = '9999';
            dot.style.opacity = '0.7';
            dot.style.left = `${e.clientX - 4}px`;
            dot.style.top = `${e.clientY - 4}px`;
            dot.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            document.body.appendChild(dot);
            
            dots.push(dot);
            if (dots.length > 15) {
                const oldDot = dots.shift();
                if (oldDot && oldDot.parentNode) oldDot.remove();
            }

            // Trigger reflow & fade
            requestAnimationFrame(() => {
                dot.style.transform = 'scale(0)';
                dot.style.opacity = '0';
            });

            setTimeout(() => {
                if (dot.parentNode) dot.remove();
                const index = dots.indexOf(dot);
                if (index > -1) dots.splice(index, 1);
            }, 500);
        });
    }
});
