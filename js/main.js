document.addEventListener("DOMContentLoaded", () => {
    // --- 1. Welcome Animation (Terminal & Pixel Dissolve) ---
    const welcomeScreen = document.getElementById('welcome-screen');
    const welcomeText = document.getElementById('welcome-text');
    
    const playHeroVideo = () => {
        const heroVideo = document.getElementById('hero-video');
        if (heroVideo) {
            heroVideo.currentTime = 0;
            heroVideo.play().catch(e => console.log("Autoplay prevented:", e));
        }
    };

    function pixelDissolve(element, callback) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        canvas.style.cssText = `
            position: fixed;
            top: 0; left: 0;
            width: 100%; height: 100%;
            z-index: 9998;
            pointer-events: none;
        `;
        document.body.appendChild(canvas);

        const tileSize = window.innerWidth < 768 ? 8 : 12;
        const cols = Math.ceil(canvas.width / tileSize);
        const rows = Math.ceil(canvas.height / tileSize);
        const tiles = [];
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                tiles.push({ x: c * tileSize, y: r * tileSize, alive: true });
            }
        }
        tiles.sort(() => Math.random() - 0.5);

        let dissolved = 0;
        const total = tiles.length;
        const batchSize = Math.ceil(total / 30);

        ctx.fillStyle = '#0a0a0f';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        element.style.display = 'none';

        const dissolveInterval = setInterval(() => {
            for (let i = 0; i < batchSize; i++) {
                if (dissolved >= total) break;
                const tile = tiles[dissolved];
                ctx.clearRect(tile.x, tile.y, tileSize, tileSize);
                dissolved++;
            }
            if (dissolved >= total) {
                clearInterval(dissolveInterval);
                canvas.remove();
                if (callback) callback();
            }
        }, 16);
    }

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
                        setTimeout(typeChar, 30); // 30ms char typing
                    } else {
                        lineIndex++;
                        setTimeout(typeLine, 150); // 150ms line delay
                    }
                }
                typeChar();
            } else {
                setTimeout(() => {
                    pixelDissolve(welcomeScreen, () => {
                        document.body.style.overflow = 'auto'; // ensure scroll is restored after fade
                        sessionStorage.setItem('welcomePlayed', 'true');
                        playHeroVideo();
                    });
                }, 500);
            }
        }
        
        document.body.style.overflow = 'hidden';
        setTimeout(typeLine, 500);
    } else if (welcomeScreen) {
        welcomeScreen.style.display = 'none';
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

    // --- 6. JS Intersection Observer for Scroll Animations ---
    const thresholdValue = window.innerWidth < 768 ? 0.08 : 0.1;
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, entry.target.dataset.delay || 0);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: thresholdValue });

    document.querySelectorAll('.scroll-animate, .slide-left, .slide-right, .pop-in').forEach((el, i) => {
        el.dataset.delay = i % 6 * 80;
        observer.observe(el);
    });

    // --- 7. Mindset Terminal Typeout ---
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

    // --- 8. Pure JS Canvas Particles (Global Background) ---
    const canvas = document.getElementById('bg-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        
        function initCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            particles = [];
            const isMobile = window.innerWidth < 768;
            const particleCount = isMobile ? 40 : 80;
            for (let i = 0; i < particleCount; i++) {
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

    // --- 9. Neon Cursor Trail ---
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

// --- 10. Horizontal Scroll Block Layers ---
window.addEventListener('wheel', (e) => {
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        e.preventDefault();
    }
}, { passive: false });

window.addEventListener('touchmove', (e) => {
    if (e.touches.length === 1) {
        const touch = e.touches[0];
        if (Math.abs(touch.clientX) > Math.abs(touch.clientY)) {
            e.preventDefault();
        }
    }
}, { passive: false });
