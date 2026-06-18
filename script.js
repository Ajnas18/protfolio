/* ==========================================================================
   PORTFOLIO — script.js (Futuristic Cyberpunk Interactive Mechanics - Neon Green)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Navbar scroll effect ── */
  const navbar = document.getElementById('navbar');
  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 30);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ── Mobile menu toggle ── */
  const mobileBtn  = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  mobileBtn.addEventListener('click', () => {
    const open = mobileMenu.classList.toggle('active');
    // Animate hamburger to X
    const spans = mobileBtn.querySelectorAll('span');
    if (open) {
      spans[0].style.transform = 'rotate(45deg) translate(5px,5px)';
      spans[0].style.background = '#00ff66';
      spans[1].style.opacity   = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(6px,-6px)';
      spans[2].style.background = '#00ff66';
    } else {
      spans.forEach(s => { 
        s.style.transform = ''; 
        s.style.opacity = ''; 
        s.style.background = '';
      });
    }
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('active');
      const spans = mobileBtn.querySelectorAll('span');
      spans.forEach(s => { 
        s.style.transform = ''; 
        s.style.opacity = ''; 
        s.style.background = '';
      });
    });
  });

  /* ── Typewriter effect ── */
  const typewriter = document.getElementById('typewriter');
  const subtext = "AI Developer Intern | Python & AI Enthusiast";
  let charIndex = 0;

  function typeChar() {
    if (charIndex < subtext.length) {
      typewriter.textContent += subtext.charAt(charIndex++);
      setTimeout(typeChar, 50);
    }
  }
  setTimeout(typeChar, 800);

  /* ── Scroll-reveal animations ── */
  const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

  function checkVisible() {
    const vh = window.innerHeight;
    const threshold = 90;

    revealEls.forEach(el => {
      if (el.getBoundingClientRect().top < vh - threshold) {
        el.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', checkVisible, { passive: true });
  checkVisible(); // run once on load

  /* ── 3-D Tilt effect for holographic ID card ── */
  const tiltCard = document.getElementById('tilt-card');
  if (tiltCard) {
    let rafId = null;

    document.addEventListener('mousemove', e => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const cx = window.innerWidth  / 2;
        const cy = window.innerHeight / 2;
        // Limit tilt angle for professional, subtle physical tracking
        const rx = (cy - e.clientY) / 24;
        const ry = (e.clientX - cx) / 24;
        tiltCard.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
      });
    });

    document.addEventListener('mouseleave', () => {
      tiltCard.style.transform = 'rotateX(0deg) rotateY(0deg)';
    });
  }

  /* ── Active nav-link highlight on scroll ── */
  const sections = document.querySelectorAll('section[id], footer[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function highlightNav() {
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 150) current = sec.id;
    });
    navLinks.forEach(link => {
      const active = link.getAttribute('href') === `#${current}`;
      link.style.color = active ? 'var(--accent)' : '';
      if (active) {
        link.style.textShadow = '0 0 8px rgba(0, 255, 102, 0.5)';
      } else {
        link.style.textShadow = '';
      }
    });
  }
  window.addEventListener('scroll', highlightNav, { passive: true });

  /* ── Cyber Contact Form Transmitter & Terminal Logger ── */
  const contactForm = document.getElementById('contact-form');
  const termLog = document.getElementById('form-terminal-log');
  
  if (contactForm && termLog) {
    const formInputs = contactForm.querySelectorAll('.form-input, .form-textarea');
    
    // Log user typing actions to the diagnostic screen
    formInputs.forEach(input => {
      input.addEventListener('focus', () => {
        termLog.innerHTML = `[SYS_LOG] ESTABLISHING TRANSLINK CHANNEL...<br>[SYS_LOG] INPUT_STREAM BUFFER OPENED.`;
      });
      
      input.addEventListener('input', (e) => {
        const fieldName = e.target.id.toUpperCase();
        termLog.innerHTML = `[SYS_LOG] INPUT_STREAM BUFFER OPENED.<br>[SYS_LOG] WRITING DATA PACKAGE [${fieldName}]...`;
      });
    });
    
    window.handleFormSubmit = function(e) {
      e.preventDefault();
      const btn = e.target.querySelector('button[type="submit"]');
      const originalHtml = btn.innerHTML;
      
      const nameEl = document.getElementById('name');
      const emailEl = document.getElementById('email');
      const messageEl = document.getElementById('message');
      
      const nameVal = nameEl ? nameEl.value : '';
      const emailVal = emailEl ? emailEl.value : '';
      const messageVal = messageEl ? messageEl.value : '';
      
      // Cyber Terminal Logs progression sequence
      termLog.innerHTML = `[SYS_LOG] INITIATING ENCRYPT_PACKET PROTOCOL...<br>[SYS_LOG] SECURING TRANSLINK NETWORK...`;
      
      setTimeout(() => {
        termLog.innerHTML = `[SYS_LOG] PACKET ENCRYPTION: COMPLETE.<br>[SYS_LOG] DEPLOYING DATAFORM VIA IP_TRANSROUTE...`;
        
        setTimeout(() => {
          termLog.innerHTML = `[SYS_LOG] MESSAGE DEPLOYED SUCCESSFULLY!<br>[SYS_LOG] OPENING MAIL CLIENT SYSTEM...`;
          
          btn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="filter: drop-shadow(0 0 5px #fff);">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
            TRANSMITTED`;
          btn.style.background = '#22c55e';
          btn.style.borderColor = '#22c55e';
          btn.style.boxShadow = '0 0 15px rgba(34, 197, 94, 0.4)';
          btn.disabled = true;
          
          // Prefilled mailto redirection
          const mailtoUrl = `mailto:mhdajnascp@gmail.com?subject=Transmission%20from%20${encodeURIComponent(nameVal)}&body=Sender%20Identity:%20${encodeURIComponent(nameVal)}%0ASender%20MailRoute:%20${encodeURIComponent(emailVal)}%0A%0AMessage%20Packet:%0A${encodeURIComponent(messageVal)}`;
          window.location.href = mailtoUrl;
          
          setTimeout(() => {
            btn.innerHTML = originalHtml;
            btn.style.background = '';
            btn.style.borderColor = '';
            btn.style.boxShadow = '';
            btn.disabled = false;
            e.target.reset();
            termLog.innerHTML = `[SYS_LOG] TRANSLINK IDLE...<br>[SYS_LOG] AWAITING PACKET ENCRYPT...`;
          }, 3000);
        }, 1200);
      }, 1000);
    };
  }

  /* ── Smooth section scroll for anchor links ── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ── Cyberpunk Custom Neon Green Mouse Cursor Pointer & HUD Reticle ── */
  const initCustomCursor = () => {
    if (!window.matchMedia('(pointer: fine)').matches) return;

    // Build custom cursors DOM
    const pointer = document.createElement('div');
    const hudRing = document.createElement('div');
    const hudRingInner = document.createElement('div');
    
    pointer.className = 'custom-cursor-pointer';
    hudRing.className = 'custom-cursor-outline';
    hudRingInner.className = 'custom-cursor-outline-inner';
    
    // Injected triangular arrow with neon green outlines
    pointer.innerHTML = `
      <svg viewBox="0 0 24 24" style="overflow: visible;">
        <defs>
          <filter id="cyber-green-glow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="2.2" result="blur" />
            <feComponentTransfer in="blur" result="glow">
              <feFuncA type="linear" slope="0.8"/>
            </feComponentTransfer>
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <!-- Sleek sharp vector triangle outline pointer with glow filters -->
        <path d="M1 1 L22 9 L13 13 L9 22 Z" fill="rgba(0, 10, 5, 0.65)" stroke="#00ff66" stroke-width="2" stroke-linejoin="round" filter="url(#cyber-green-glow)" />
      </svg>
    `;
    
    hudRing.appendChild(hudRingInner);
    document.body.appendChild(pointer);
    document.body.appendChild(hudRing);

    let mouseX = -100, mouseY = -100;
    let pointX = -100, pointY = -100;
    let ringX = -100, ringY = -100;
    let isVisible = false;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isVisible) {
        pointer.classList.add('custom-cursor-visible');
        hudRing.classList.add('custom-cursor-visible');
        isVisible = true;
        
        // Initial coordinate snap to avoid entry slide drifts
        pointX = mouseX;
        pointY = mouseY;
        ringX = mouseX;
        ringY = mouseY;
      }
    });

    // Linear Interpolation loop (lerp physics)
    const tick = () => {
      // Snappier tracking speed for the pointer arrow, organic tracking lag for the HUD reticle ring
      pointX += (mouseX - pointX) * 0.38;
      pointY += (mouseY - pointY) * 0.38;
      ringX += (mouseX - ringX) * 0.16;
      ringY += (mouseY - ringY) * 0.16;

      pointer.style.transform = `translate3d(${pointX}px, ${pointY}px, 0)`;
      hudRing.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;

      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);

    // Dynamic visibility responses
    document.addEventListener('mouseleave', () => {
      pointer.classList.add('custom-cursor-hidden');
      hudRing.classList.add('custom-cursor-hidden');
    });
    document.addEventListener('mouseenter', () => {
      pointer.classList.remove('custom-cursor-hidden');
      hudRing.classList.remove('custom-cursor-hidden');
    });

    // Handle clicks
    document.addEventListener('mousedown', () => {
      document.body.classList.add('custom-cursor-clicked');
    });
    document.addEventListener('mouseup', () => {
      document.body.classList.remove('custom-cursor-clicked');
    });

    // Element locks (hover status changes)
    const lockSelectors = 'a, button, .btn, input, textarea, select, [role="button"], .social-link, .nav-link, .mobile-toggle, .mobile-link, .project-btn';
    
    document.addEventListener('mouseover', (e) => {
      if (e.target.closest(lockSelectors)) {
        document.body.classList.add('custom-cursor-hover');
      }
    });
    document.addEventListener('mouseout', (e) => {
      if (e.target.closest(lockSelectors)) {
        document.body.classList.remove('custom-cursor-hover');
      }
    });
  };
  initCustomCursor();

  /* ── Neural Plexus Background Canvas with Green Spitter Spark Trails ── */
  const initNeuralBackground = () => {
    const canvas = document.getElementById('plexus-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let particles = [];
    const getCount = () => window.innerWidth < 768 ? 28 : 65;
    
    let maxParticles = getCount();
    const connectMaxDistance = 110;
    
    let mouseActive = false;
    let mouseX = 0, mouseY = 0;
    
    // Trail spark system
    let sparks = [];
    let prevX = 0, prevY = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      maxParticles = getCount();
      if (particles.length > maxParticles) {
        particles = particles.slice(0, maxParticles);
      }
    };
    window.addEventListener('resize', resize, { passive: true });
    resize();

    // Spits glowing green trail sparks on mouse movements
    document.addEventListener('mousemove', (e) => {
      mouseActive = true;
      const curX = e.clientX;
      const curY = e.clientY;
      
      if (prevX !== 0 && prevY !== 0) {
        const dx = curX - prevX;
        const dy = curY - prevY;
        const velocityDist = Math.sqrt(dx * dx + dy * dy);
        
        if (velocityDist > 3) {
          // progressive emitting intervals
          const spawnInterval = Math.min(Math.floor(velocityDist / 5), 3);
          for (let i = 0; i < spawnInterval; i++) {
            const ratio = i / spawnInterval;
            const sx = prevX + dx * ratio;
            const sy = prevY + dy * ratio;
            
            sparks.push({
              x: sx,
              y: sy,
              vx: -dx * 0.12 + (Math.random() - 0.5) * 0.8,
              vy: -dy * 0.12 + (Math.random() - 0.5) * 0.8,
              radius: Math.random() * 2.2 + 1.2,
              life: 1.0,
              decay: Math.random() * 0.04 + 0.02
            });
          }
        }
      }
      
      mouseX = curX;
      mouseY = curY;
      prevX = mouseX;
      prevY = mouseY;
    });

    document.addEventListener('mouseleave', () => {
      mouseActive = false;
      prevX = 0;
      prevY = 0;
    });

    // Particle blueprints
    class Particle {
      constructor() {
        this.init(true);
      }

      init(firstSpawn = false) {
        this.x = Math.random() * canvas.width;
        this.y = firstSpawn ? Math.random() * canvas.height : -15;
        this.vx = (Math.random() - 0.5) * 0.25;
        this.vy = (Math.random() - 0.5) * 0.25 + 0.1; // slow drift downwards
        this.radius = Math.random() * 1.5 + 1;
        this.alpha = Math.random() * 0.45 + 0.15;
        
        // 18% mathematically styled AI indicators
        this.isSymbol = Math.random() > 0.82;
        const symbolsList = ['0', '1', 'f(x)', 'w*x+b', '∇L', 'ReLU', 'CNN', 'LSTM', 'μ', 'σ'];
        this.symbol = symbolsList[Math.floor(Math.random() * symbolsList.length)];
        this.scale = Math.random() * 0.5 + 0.5;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Wrap around boundaries
        if (this.x < -15 || this.x > canvas.width + 15 || this.y > canvas.height + 15) {
          this.init(false);
        }
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        
        if (this.isSymbol) {
          ctx.font = `${Math.floor(9 * this.scale)}px monospace`;
          ctx.fillStyle = '#00ff66';
          ctx.shadowBlur = 3;
          ctx.shadowColor = '#00ff66';
          ctx.fillText(this.symbol, this.x, this.y);
        } else {
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
          ctx.fillStyle = '#006622';
          ctx.shadowBlur = 2;
          ctx.shadowColor = '#00ff66';
          ctx.fill();
        }
        ctx.restore();
      }
    }

    // Populate particles
    for (let i = 0; i < maxParticles; i++) {
      particles.push(new Particle());
    }

    const drawPlexusRoutes = () => {
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];

        // Track custom mouse connection lines
        if (mouseActive) {
          const dx = p1.x - mouseX;
          const dy = p1.y - mouseY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < connectMaxDistance * 1.3) {
            const alpha = (1 - dist / (connectMaxDistance * 1.3)) * 0.22;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(mouseX, mouseY);
            ctx.strokeStyle = `rgba(0, 255, 102, ${alpha})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }

        // Connect particles with lines
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectMaxDistance) {
            const alpha = (1 - dist / connectMaxDistance) * 0.12;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(0, 255, 102, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
    };

    // Sparks trail generation loops
    const updateSparks = () => {
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        
        s.x += s.vx;
        s.y += s.vy;
        s.life -= s.decay;
        s.radius = Math.max(0.1, s.life * 2.6);
        
        if (s.life <= 0) {
          sparks.splice(i, 1);
          continue;
        }
        
        ctx.save();
        ctx.globalAlpha = s.life * 0.85;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fillStyle = '#00ff66';
        ctx.shadowBlur = 6;
        ctx.shadowColor = '#00ff66';
        ctx.fill();
        ctx.restore();
        
        // Micro connections from custom sparks to neural nodes
        for (let j = 0; j < particles.length; j++) {
          const p = particles[j];
          const dx = s.x - p.x;
          const dy = s.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < 60) {
            const arcAlpha = (1 - dist / 60) * s.life * 0.18;
            ctx.beginPath();
            ctx.moveTo(s.x, s.y);
            ctx.lineTo(p.x, p.y);
            ctx.strokeStyle = `rgba(0, 255, 102, ${arcAlpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        p.update();
        p.draw();
      });

      updateSparks();
      drawPlexusRoutes();

      requestAnimationFrame(render);
    };

    render();
  };
  initNeuralBackground();

  /* ── Interactive Proximity Filter for Hero Portrait ── */
  const initPortraitProximityEffect = () => {
    const heroPortrait = document.querySelector('.hero-portrait');
    if (!heroPortrait) return;

    const currentFilter = {
      grayscale: 100,
      brightness: 0.65,
      contrast: 1.0
    };

    let mouseX = -1000;
    let mouseY = -1000;
    let isMouseOnScreen = false;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      isMouseOnScreen = true;
    });

    document.addEventListener('mouseleave', () => {
      isMouseOnScreen = false;
    });

    const updateProximity = () => {
      let desiredGrayscale = 100;
      let desiredBrightness = 0.65;
      let desiredContrast = 1.0;

      if (isMouseOnScreen) {
        const rect = heroPortrait.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const dx = mouseX - centerX;
        const dy = mouseY - centerY;
        const distance = Math.hypot(dx, dy);

        // Activation threshold radius in pixels
        const maxRadius = 450;

        if (distance < maxRadius) {
          const norm = distance / maxRadius;
          desiredGrayscale = norm * 100;
          desiredBrightness = 1.15 - norm * 0.50; // closer = brighter
          desiredContrast = 1.15 - norm * 0.15;
        }
      }

      // Smooth tracking via Linear Interpolation (lerp physics)
      currentFilter.grayscale += (desiredGrayscale - currentFilter.grayscale) * 0.12;
      currentFilter.brightness += (desiredBrightness - currentFilter.brightness) * 0.12;
      currentFilter.contrast += (desiredContrast - currentFilter.contrast) * 0.12;

      const closeness = 1 - (currentFilter.grayscale / 100);
      const dropShadowPx = 15 + closeness * 10;
      const dropShadowAlpha = 0.1 + closeness * 0.2;

      heroPortrait.style.filter = `grayscale(${currentFilter.grayscale.toFixed(1)}%) brightness(${currentFilter.brightness.toFixed(3)}) contrast(${currentFilter.contrast.toFixed(3)}) drop-shadow(0 0 ${dropShadowPx.toFixed(1)}px rgba(0, 255, 102, ${dropShadowAlpha.toFixed(2)}))`;

      requestAnimationFrame(updateProximity);
    };

    requestAnimationFrame(updateProximity);
  };
  initPortraitProximityEffect();

});

