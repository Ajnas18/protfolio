/* ==========================================================================
   PORTFOLIO — PREMIUM INTERACTIVE MECHANICS (VANILLA EDITION)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Navbar Scroll Active State ── */
  const navbar = document.getElementById('navbar');
  const handleNavbarScroll = () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleNavbarScroll, { passive: true });
  handleNavbarScroll();

  /* ── Mobile Dropdown Menu Toggle ── */
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      const isActive = mobileMenu.classList.toggle('active');
      const spans = mobileMenuBtn.querySelectorAll('span');
      if (isActive) {
        spans[0].style.transform = 'translateY(5px) rotate(45deg)';
        spans[1].style.transform = 'translateY(-5px) rotate(-45deg)';
      } else {
        spans[0].style.transform = 'none';
        spans[1].style.transform = 'none';
      }
    });

    // Close menu when hitting mobile links
    mobileMenu.querySelectorAll('.mobile-link').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        const spans = mobileMenuBtn.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.transform = 'none';
      });
    });
  }

  /* ── Mouse Coordinates Tracker ── */
  let mouseX = -100, mouseY = -100;
  let isMouseOnScreen = false;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    isMouseOnScreen = true;
  });

  document.addEventListener('mouseleave', () => {
    isMouseOnScreen = false;
  });

  /* ── 3-D Interactive Card Tilting on Mouse Move ── */
  const tiltCards = document.querySelectorAll('[data-tilt]');
  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      // Calculate rotation offset: max tilt limit 12 degrees
      const rotateX = (centerY - y) / 12;
      const rotateY = (x - centerX) / 12;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    });
  });

  /* ── Magnetic Buttons (Snaps buttons slightly to mouse cursor) ── */
  const magneticElements = document.querySelectorAll('[data-magnetic]');
  magneticElements.forEach(el => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      // Pull element towards mouse (30% offset weight)
      el.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });

    el.style.transition = 'transform 0.1s ease-out';

    el.addEventListener('mouseleave', () => {
      el.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
      el.style.transform = 'translate(0, 0)';
    });
  });

  /* ── Scroll-Triggered Fade & Blur Reveals via IntersectionObserver ── */
  const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        revealObserver.unobserve(entry.target); // Trigger once
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });
  
  revealEls.forEach(el => {
    revealObserver.observe(el);
  });

  /* ── Contact Form Transmission Terminal Logger ── */
  const contactForm = document.getElementById('contact-form');
  const termLog = document.getElementById('form-terminal-log');
  
  if (contactForm && termLog) {
    const formFields = contactForm.querySelectorAll('.form-input, .form-textarea');
    
    // Print typing activities into log block
    formFields.forEach(field => {
      field.addEventListener('focus', () => {
        termLog.innerHTML = `[SYS_LOG] TRANSLINK CHANNELS ACTIVE...<br>[SYS_LOG] BUFFERING INPUT ROUTE [${field.id.toUpperCase()}]...`;
      });
      field.addEventListener('input', () => {
        termLog.innerHTML = `[SYS_LOG] ENCRYPTING INCOMING PACKET STREAM...<br>[SYS_LOG] WRITING DATA BUFFER FOR [${field.id.toUpperCase()}]...`;
      });
    });
    
    window.handleFormSubmit = (e) => {
      e.preventDefault();
      
      const nameVal = document.getElementById('name').value;
      const emailVal = document.getElementById('email').value;
      const messageVal = document.getElementById('message').value;
      
      termLog.innerHTML = `[SYS_LOG] PACKET SEALED AND SECURED.<br>[SYS_LOG] ESTABLISHING ROUTE TO mhdajnascp@gmail.com...`;
      
      setTimeout(() => {
        termLog.innerHTML = `[SYS_LOG] DEPLOYING PACKAGE VIA MAIL ROUTER...<br>[SYS_LOG] CONVERSATION CHANNELS RE-ESTABLISHED.`;
        
        // Open standard system prefilled mail client redirection
        const mailtoUrl = `mailto:mhdajnascp@gmail.com?subject=Portfolio%20Connection%20from%20${encodeURIComponent(nameVal)}&body=Sender%20Name:%20${encodeURIComponent(nameVal)}%0ASender%20Email:%20${encodeURIComponent(emailVal)}%0A%0AMessage:%20${encodeURIComponent(messageVal)}`;
        window.location.href = mailtoUrl;
        
        setTimeout(() => {
          contactForm.reset();
          termLog.innerHTML = `[SYS_LOG] TRANSLINK IDLE...<br>[SYS_LOG] INPUT_STREAM CONTEXT SECURE...`;
        }, 3000);
      }, 1500);
    };
  }

  /* ── Background Code Particles Constellation ── */
  const initCodeBackground = () => {
    const canvas = document.getElementById('code-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let particles = [];
    let cursorParticles = [];
    
    // Coding symbols array
    const symbols = [
      'const', 'let', 'def', 'import', '=>', 'f(x)', '&&', '[]', '||', 'return',
      'py', 'js', 'ml', 'ds', '!=', '==', '++', 'async', 'await', 'class',
      'fn', 'let', '0', '1', '{ }', 'None', 'True', 'False', 'print', 'sys',
      'model', 'train', 'fit', 'predict', 'RAG', 'vector', 'embed', 'data',
      'pandas', 'np', 'import torch', 'from fastapi import'
    ];

    const getParticleCount = () => {
      return window.innerWidth < 768 ? 20 : 50;
    };

    let maxParticles = getParticleCount();

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      maxParticles = getParticleCount();
    };
    window.addEventListener('resize', resizeCanvas, { passive: true });
    resizeCanvas();

    class CodeParticle {
      constructor(isFirstSpawn = false) {
        this.reset(isFirstSpawn);
      }

      reset(isFirstSpawn = false) {
        this.x = Math.random() * canvas.width;
        this.y = isFirstSpawn ? Math.random() * canvas.height : canvas.height + 20;
        this.speedY = -(Math.random() * 0.4 + 0.15); // float upwards slowly
        this.size = Math.floor(Math.random() * 5) + 9; // font size 9px to 14px
        this.text = symbols[Math.floor(Math.random() * symbols.length)];
        this.alpha = Math.random() * 0.28 + 0.08; // very subtle low opacity
        this.baseAlpha = this.alpha;
        this.angle = Math.random() * Math.PI * 2;
        this.angleSpeed = Math.random() * 0.02 - 0.01;
        this.oscillationRange = Math.random() * 0.4 + 0.1;
      }

      update() {
        this.y += this.speedY;
        this.angle += this.angleSpeed;
        this.x += Math.sin(this.angle) * this.oscillationRange;

        // Proximity calculation for mouse cursor
        let dx = mouseX - this.x;
        let dy = mouseY - this.y;
        let dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 150) {
          // Increase opacity when close to cursor glow
          this.alpha = this.baseAlpha * (1 + (1 - dist / 150) * 1.5);
          // Gently shift towards mouse
          this.x += (dx / dist) * 0.25;
          this.y += (dy / dist) * 0.25;
        } else {
          this.alpha = this.baseAlpha;
        }

        // Reset if floats off screen
        if (this.y < -20 || this.x < -40 || this.x > canvas.width + 40) {
          this.reset(false);
        }
      }

      draw() {
        ctx.save();
        ctx.fillStyle = `rgba(1, 75, 170, ${this.alpha})`;
        ctx.font = `${this.size}px 'Fira Code', monospace`;
        ctx.fillText(this.text, this.x, this.y);
        ctx.restore();
      }
    }

    class CursorParticle {
      constructor(x, y, dx, dy) {
        this.x = x;
        this.y = y;
        // Spew opposite to mouse direction with velocity dispersion
        this.vx = -dx * 0.12 + (Math.random() - 0.5) * 0.8;
        this.vy = -dy * 0.12 + (Math.random() - 0.5) * 0.8 - 0.25; // upward tendency
        this.size = Math.floor(Math.random() * 4) + 8; // size 8px to 11px
        this.text = symbols[Math.floor(Math.random() * symbols.length)];
        this.alpha = 1.0;
        this.decay = Math.random() * 0.02 + 0.015; // fade rate
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.alpha -= this.decay;
      }

      draw() {
        ctx.save();
        ctx.fillStyle = `rgba(1, 75, 170, ${this.alpha * 0.65})`; // keep it slightly soft
        ctx.font = `${this.size}px 'Fira Code', monospace`;
        ctx.fillText(this.text, this.x, this.y);
        ctx.restore();
      }
    }

    // Populate static floating particles
    for (let i = 0; i < maxParticles; i++) {
      particles.push(new CodeParticle(true));
    }

    // Capture mouse speed to emit cursor trail particles
    let prevX = 0, prevY = 0;
    document.addEventListener('mousemove', (e) => {
      const curX = e.clientX;
      const curY = e.clientY;
      if (prevX !== 0 && prevY !== 0) {
        const dx = curX - prevX;
        const dy = curY - prevY;
        const speed = Math.sqrt(dx * dx + dy * dy);
        
        // Spawn trail particles if mouse moves and buffer has space
        if (speed > 3.5 && cursorParticles.length < 60) {
          cursorParticles.push(new CursorParticle(curX, curY, dx, dy));
        }
      }
      prevX = curX;
      prevY = curY;
    });

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw background floating particles
      particles.forEach(p => {
        p.update();
        p.draw();
      });

      // Update and draw active cursor trail particles
      for (let i = cursorParticles.length - 1; i >= 0; i--) {
        const cp = cursorParticles[i];
        cp.update();
        if (cp.alpha <= 0) {
          cursorParticles.splice(i, 1);
        } else {
          cp.draw();
        }
      }

      // Draw constellation lines between nearby floating particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            const lineAlpha = (1 - dist / 120) * 0.045 * Math.min(p1.alpha, p2.alpha);
            ctx.beginPath();
            ctx.moveTo(p1.x + 10, p1.y - 4);
            ctx.lineTo(p2.x + 10, p2.y - 4);
            ctx.strokeStyle = `rgba(1, 75, 170, ${lineAlpha})`;
            ctx.lineWidth = 0.65;
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(render);
    };

    requestAnimationFrame(render);
  };

  initCodeBackground();

});
