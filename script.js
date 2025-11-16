// ===== UTILITIES =====
const $ = (s) => document.querySelector(s);
const $$ = (s) => document.querySelectorAll(s);

// ===== YEAR =====
document.addEventListener('DOMContentLoaded', () => {
  $('#year').textContent = new Date().getFullYear();
  
  // Add js-ready class to enable animations after page is ready
  setTimeout(() => {
    document.body.classList.add('js-ready');
  }, 100);
});

// ===== LOADING SCREEN =====
window.addEventListener('load', () => {
  setTimeout(() => {
    const load = $('#loading');
    if (!load) return;
    load.style.opacity = '0';
    setTimeout(() => {
      load.style.display = 'none';
      // Make sure body is visible
      document.body.style.overflow = 'auto';
      
      // Trigger hero to show immediately
      const hero = $('#hero');
      if (hero) {
        hero.classList.add('show');
      }
    }, 400);
  }, 1500);
});

// ===== CURSOR GLOW EFFECT =====
const cursorGlow = $('.cursor-glow');
let mouseX = 0, mouseY = 0;
let glowX = 0, glowY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  if (cursorGlow) {
    cursorGlow.style.opacity = '1';
  }
});

// Smooth cursor follow with easing
function animateCursor() {
  glowX += (mouseX - glowX) * 0.1;
  glowY += (mouseY - glowY) * 0.1;
  
  if (cursorGlow) {
    cursorGlow.style.left = glowX + 'px';
    cursorGlow.style.top = glowY + 'px';
  }
  
  requestAnimationFrame(animateCursor);
}
animateCursor();

// Hide cursor glow when mouse leaves
document.addEventListener('mouseleave', () => {
  if (cursorGlow) cursorGlow.style.opacity = '0';
});

// ===== FLOATING PARTICLES =====
function createParticles() {
  const container = $('.particles-container');
  if (!container) return;
  
  for (let i = 0; i < 15; i++) {
    const particle = document.createElement('div');
    particle.style.position = 'absolute';
    particle.style.width = (Math.random() * 4 + 2) + 'px';
    particle.style.height = particle.style.width;
    particle.style.borderRadius = '50%';
    particle.style.background = `rgba(167, 139, 250, ${Math.random() * 0.3 + 0.1})`;
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.animation = `floatParticle ${Math.random() * 20 + 10}s linear infinite`;
    particle.style.animationDelay = Math.random() * 5 + 's';
    container.appendChild(particle);
  }
}

// Add particle animation
const style = document.createElement('style');
style.textContent = `
  @keyframes floatParticle {
    0% {
      transform: translate(0, 0);
      opacity: 0;
    }
    10% {
      opacity: 1;
    }
    90% {
      opacity: 1;
    }
    100% {
      transform: translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);
createParticles();

// ===== TYPING EFFECT =====
document.addEventListener('DOMContentLoaded', () => {
  const tagline = $('#tagline');
  if (!tagline) return;
  const text = tagline.textContent.trim();
  tagline.textContent = '';
  tagline.style.borderRight = '2px solid var(--accent-1)';
  
  let i = 0;
  function type() {
    if (i < text.length) {
      tagline.textContent += text.charAt(i++);
      setTimeout(type, 80);
    } else {
      // Blinking cursor effect
      setTimeout(() => {
        tagline.style.borderRight = 'none';
      }, 500);
    }
  }
  
  setTimeout(type, 1000);
});

// ===== PARALLAX EFFECT =====
let ticking = false;
window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      const y = window.scrollY;
      const a = $('.layer-a');
      const b = $('.layer-b');
      
      if (a) a.style.transform = `translateY(${y * 0.06}px)`;
      if (b) b.style.transform = `translateY(${y * 0.03}px)`;
      
      // Parallax for blobs
      const blobs = $$('.blob');
      blobs.forEach((blob, i) => {
        const speed = (i + 1) * 0.02;
        blob.style.transform = `translateY(${y * speed}px)`;
      });
      
      ticking = false;
    });
    ticking = true;
  }
});

// ===== CAROUSEL =====
let currentSlide = 0;
let autoplayInterval;

function moveCarousel(dir) {
  const slides = $$('.project-card');
  if (!slides.length) return;
  
  currentSlide = (currentSlide + dir + slides.length) % slides.length;
  const inner = $('.carousel-inner');
  inner.style.transform = `translateX(-${currentSlide * 100}%)`;
  
  // Reset autoplay
  resetAutoplay();
}

function autoplayCarousel() {
  autoplayInterval = setInterval(() => {
    moveCarousel(1);
  }, 5000);
}

function resetAutoplay() {
  clearInterval(autoplayInterval);
  autoplayCarousel();
}

// Start autoplay
autoplayCarousel();

// Pause autoplay on hover
const carousel = $('.carousel');
if (carousel) {
  carousel.addEventListener('mouseenter', () => {
    clearInterval(autoplayInterval);
  });
  
  carousel.addEventListener('mouseleave', () => {
    autoplayCarousel();
  });
}

window.moveCarousel = moveCarousel;

// ===== FUN FACTS CYCLING =====
const funFacts = [
  "I was inspired to start coding because of Big Hero 6! ✨",
  "I learn fast by building things... and breaking them too 🔧",
  "I have dreamed of coding and creating programs since 4th Grade.. and that never left me🎯",
  "I enjoy logic, puzzles and solving problems but math... ☕",
  "I've always been curious, I love understanding the hows and the whys of things and how can I think of something better 💡",
  "Music is what keeps me focused... 🎯"
];

let factIndex = 0;

function cycleFacts() {
  const el = $('#fun-fact');
  if (!el) return;
  
  // Fade out
  el.style.opacity = '0';
  el.style.transform = 'translateY(10px)';
  
  setTimeout(() => {
    el.textContent = funFacts[factIndex];
    factIndex = (factIndex + 1) % funFacts.length;
    
    // Fade in
    el.style.opacity = '1';
    el.style.transform = 'translateY(0)';
  }, 300);
}

// Initial fact
setTimeout(() => {
  const el = $('#fun-fact');
  if (el) {
    el.textContent = funFacts[0];
    factIndex = 1;
  }
}, 500);

// Cycle facts
setInterval(cycleFacts, 4200);

// ===== CONFETTI EASTER EGG =====
window.triggerEasterEgg = function() {
  // More particles and better physics
  for (let i = 0; i < 60; i++) {
    const particle = document.createElement('div');
    particle.style.position = 'fixed';
    particle.style.left = (Math.random() * 100) + 'vw';
    particle.style.top = '-20px';
    
    const size = Math.random() * 12 + 6;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    particle.style.borderRadius = (Math.random() * 50) + '%';
    
    const colors = ['#a78bfa', '#34d399', '#60a5fa', '#f472b6', '#fbbf24'];
    particle.style.background = colors[Math.floor(Math.random() * colors.length)];
    particle.style.zIndex = '9999';
    particle.style.opacity = '0.9';
    particle.style.pointerEvents = 'none';
    particle.style.boxShadow = '0 0 10px rgba(255,255,255,0.5)';
    
    const duration = Math.random() * 1 + 2;
    const drift = (Math.random() - 0.5) * 200;
    particle.style.transition = `transform ${duration}s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity ${duration}s ease`;
    
    document.body.appendChild(particle);
    
    requestAnimationFrame(() => {
      particle.style.transform = `translateY(120vh) translateX(${drift}px) rotate(${Math.random() * 720}deg)`;
      particle.style.opacity = '0';
    });
    
    setTimeout(() => particle.remove(), duration * 1000 + 100);
  }
  
  // Sound effect simulation (visual feedback)
  document.body.style.animation = 'shake 0.5s';
  setTimeout(() => {
    document.body.style.animation = '';
  }, 500);
};

// Add shake animation
const shakeStyle = document.createElement('style');
shakeStyle.textContent = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    75% { transform: translateX(5px); }
  }
`;
document.head.appendChild(shakeStyle);

// ===== INTERSECTION OBSERVER WITH FADE OUT =====
const reveals = $$('.reveal');
const skills = $$('.skill');
const certCards = $$('.cert-card');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const el = entry.target;
    
    if (entry.isIntersecting) {
      // Element is in view - fade in
      el.classList.add('show');
      el.classList.remove('hide');
      
      // Stagger animations for children
      const order = Number(el.dataset.order || 0);
      if (order) {
        const children = el.querySelectorAll('.skill, .project-card, .cert-card, p, h2, .skills-grid > *, .contact-card');
        children.forEach((child, i) => {
          child.style.transitionDelay = (i * 100) + 'ms';
        });
      }
      
      // Animate skill bars when visible
      if (el.id === 'skills') {
        skills.forEach((skill, i) => {
          setTimeout(() => {
            skill.classList.add('show');
          }, i * 150);
        });
      }
    } else {
      // Element is out of view - fade out
      el.classList.remove('show');
      el.classList.add('hide');
    }
  });
}, { 
  threshold: 0.15,
  rootMargin: '0px 0px -50px 0px'
});

reveals.forEach(r => observer.observe(r));

// ===== PORTRAIT ERROR HANDLING =====
document.addEventListener('DOMContentLoaded', () => {
  const img = $('#portrait');
  if (!img) return;
  
  img.onerror = () => {
    img.src = 'https://via.placeholder.com/720x720/2d1b4e/a78bfa?text=Your+Portrait';
  };
});

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href !== '#' && href !== '') {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  });
});

// ===== SCROLL PROGRESS INDICATOR =====
function updateScrollProgress() {
  const scrollProgress = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
  
  // Update scroll to top button
  const scrollTop = $('.scroll-top');
  if (scrollTop) {
    if (scrollProgress > 20) {
      scrollTop.style.opacity = '1';
      scrollTop.style.pointerEvents = 'auto';
    } else {
      scrollTop.style.opacity = '0';
      scrollTop.style.pointerEvents = 'none';
    }
  }
}

window.addEventListener('scroll', updateScrollProgress);

// ===== INTERACTIVE CARD TILT EFFECT =====
const cards = $$('.skill, .contact-card, .project-card, .cert-card');

cards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// ===== DYNAMIC GREETING =====
document.addEventListener('DOMContentLoaded', () => {
  const hour = new Date().getHours();
  const greetingBadge = $('.greeting-badge');
  
  if (greetingBadge) {
    let greeting = '👋 Welcome';
    
    if (hour >= 5 && hour < 12) {
      greeting = '🌅 Good Morning';
    } else if (hour >= 12 && hour < 18) {
      greeting = '☀️ Good Afternoon';
    } else if (hour >= 18 && hour < 22) {
      greeting = '🌆 Good Evening';
    } else {
      greeting = '🌙 Good Night';
    }
    
    greetingBadge.innerHTML = greeting;
  }
});

// ===== KEYBOARD NAVIGATION =====
document.addEventListener('keydown', (e) => {
  // Arrow keys for carousel
  if (e.key === 'ArrowLeft') {
    moveCarousel(-1);
  } else if (e.key === 'ArrowRight') {
    moveCarousel(1);
  }
  
  // Easter egg shortcut
  if (e.ctrlKey && e.key === ' ') {
    e.preventDefault();
    triggerEasterEgg();
  }
});

// ===== PERFORMANCE: REDUCE MOTION FOR USERS WHO PREFER IT =====
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  // Disable heavy animations
  const style = document.createElement('style');
  style.textContent = `
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  `;
  document.head.appendChild(style);
}

console.log('%c✨ Portfolio Loaded! ✨', 'color: #a78bfa; font-size: 20px; font-weight: bold;');
console.log('%cPress Ctrl + Space for a surprise! 🎉', 'color: #34d399; font-size: 14px;');