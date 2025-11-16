// ===== UTILITIES =====
const $ = (s) => document.querySelector(s);
const $$ = (s) => document.querySelectorAll(s);

// Debounce function for performance
const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
  $('#year').textContent = new Date().getFullYear();
  
  setTimeout(() => {
    document.body.classList.add('js-ready');
  }, 100);
  
  // Dynamic greeting
  updateGreeting();
  
  // Initialize lazy loading for images
  initLazyLoading();
});

// ===== LOADING SCREEN =====
window.addEventListener('load', () => {
  setTimeout(() => {
    const load = $('#loading');
    if (!load) return;
    load.style.opacity = '0';
    setTimeout(() => {
      load.style.display = 'none';
      document.body.style.overflow = 'auto';
      
      const hero = $('#hero');
      if (hero) {
        hero.classList.add('show');
      }
    }, 400);
  }, 1500);
});

// ===== CURSOR GLOW EFFECT (OPTIMIZED) =====
const cursorGlow = $('.cursor-glow');
let mouseX = 0, mouseY = 0;
let glowX = 0, glowY = 0;
let isMouseMoving = false;
let mouseTimeout;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  
  if (cursorGlow) {
    cursorGlow.style.opacity = '1';
  }
  
  isMouseMoving = true;
  clearTimeout(mouseTimeout);
  
  mouseTimeout = setTimeout(() => {
    isMouseMoving = false;
  }, 100);
});

function animateCursor() {
  if (isMouseMoving) {
    glowX += (mouseX - glowX) * 0.1;
    glowY += (mouseY - glowY) * 0.1;
    
    if (cursorGlow) {
      cursorGlow.style.left = glowX + 'px';
      cursorGlow.style.top = glowY + 'px';
    }
  }
  
  requestAnimationFrame(animateCursor);
}
animateCursor();

document.addEventListener('mouseleave', () => {
  if (cursorGlow) cursorGlow.style.opacity = '0';
  isMouseMoving = false;
});

// ===== FLOATING PARTICLES (OPTIMIZED) =====
function createParticles() {
  const container = $('.particles-container');
  if (!container) return;
  
  // Reduced from 15 to 8 for better performance
  for (let i = 0; i < 8; i++) {
    const particle = document.createElement('div');
    particle.style.cssText = `
      position: absolute;
      width: ${Math.random() * 4 + 2}px;
      height: ${Math.random() * 4 + 2}px;
      border-radius: 50%;
      background: rgba(167, 139, 250, ${Math.random() * 0.3 + 0.1});
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      animation: floatParticle ${Math.random() * 20 + 10}s linear infinite;
      animation-delay: ${Math.random() * 5}s;
      will-change: transform;
    `;
    container.appendChild(particle);
  }
}

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
      setTimeout(() => {
        tagline.style.borderRight = 'none';
      }, 500);
    }
  }
  
  setTimeout(type, 1000);
});

// ===== PARALLAX EFFECT (OPTIMIZED WITH RAF) =====
let ticking = false;
let lastScrollY = 0;

const handleParallax = () => {
  const y = window.scrollY;
  
  // Only update if scroll position changed significantly
  if (Math.abs(y - lastScrollY) < 2) {
    ticking = false;
    return;
  }
  
  lastScrollY = y;
  
  const a = $('.layer-a');
  const b = $('.layer-b');
  
  if (a) a.style.transform = `translateY(${y * 0.06}px)`;
  if (b) b.style.transform = `translateY(${y * 0.03}px)`;
  
  const blobs = $$('.blob');
  blobs.forEach((blob, i) => {
    const speed = (i + 1) * 0.02;
    blob.style.transform = `translateY(${y * speed}px)`;
  });
  
  ticking = false;
};

window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(handleParallax);
    ticking = true;
  }
}, { passive: true });

// ===== CAROUSEL =====
let currentSlide = 0;
let autoplayInterval;

function moveCarousel(dir) {
  const slides = $$('.project-card');
  if (!slides.length) return;
  
  currentSlide = (currentSlide + dir + slides.length) % slides.length;
  const inner = $('.carousel-inner');
  inner.style.transform = `translateX(-${currentSlide * 100}%)`;
  
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

autoplayCarousel();

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
  "I have dreamed of coding and creating programs since 4th Grade... and that never left me 🎯",
  "I enjoy logic, puzzles and solving problems but math... ☕",
  "I've always been curious, I love understanding the hows and the whys of things 💡",
  "Music is what keeps me focused... 🎯"
];

let factIndex = 0;

function cycleFacts() {
  const el = $('#fun-fact');
  if (!el) return;
  
  el.style.opacity = '0';
  el.style.transform = 'translateY(10px)';
  
  setTimeout(() => {
    el.textContent = funFacts[factIndex];
    factIndex = (factIndex + 1) % funFacts.length;
    
    el.style.opacity = '1';
    el.style.transform = 'translateY(0)';
  }, 300);
}

setTimeout(() => {
  const el = $('#fun-fact');
  if (el) {
    el.textContent = funFacts[0];
    factIndex = 1;
  }
}, 500);

setInterval(cycleFacts, 4200);

// ===== CONFETTI EASTER EGG (OPTIMIZED) =====
window.triggerEasterEgg = function() {
  const colors = ['#a78bfa', '#34d399', '#60a5fa', '#f472b6', '#fbbf24'];
  
  // Reduced from 60 to 40 particles for better performance
  for (let i = 0; i < 40; i++) {
    const particle = document.createElement('div');
    const size = Math.random() * 12 + 6;
    const duration = Math.random() * 1 + 2;
    const drift = (Math.random() - 0.5) * 200;
    
    particle.style.cssText = `
      position: fixed;
      left: ${Math.random() * 100}vw;
      top: -20px;
      width: ${size}px;
      height: ${size}px;
      border-radius: ${Math.random() * 50}%;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      z-index: 9999;
      opacity: 0.9;
      pointer-events: none;
      box-shadow: 0 0 10px rgba(255,255,255,0.5);
      transition: transform ${duration}s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity ${duration}s ease;
    `;
    
    document.body.appendChild(particle);
    
    requestAnimationFrame(() => {
      particle.style.transform = `translateY(120vh) translateX(${drift}px) rotate(${Math.random() * 720}deg)`;
      particle.style.opacity = '0';
    });
    
    setTimeout(() => particle.remove(), duration * 1000 + 100);
  }
  
  document.body.style.animation = 'shake 0.5s';
  setTimeout(() => {
    document.body.style.animation = '';
  }, 500);
};

const shakeStyle = document.createElement('style');
shakeStyle.textContent = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    75% { transform: translateX(5px); }
  }
`;
document.head.appendChild(shakeStyle);

// ===== INTERSECTION OBSERVER (OPTIMIZED) =====
const reveals = $$('.reveal');
const skills = $$('.skill');

const observerOptions = {
  threshold: 0.15,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const el = entry.target;
    
    if (entry.isIntersecting) {
      el.classList.add('show');
      el.classList.remove('hide');
      
      const order = Number(el.dataset.order || 0);
      if (order) {
        const children = el.querySelectorAll('.skill, .project-card, .cert-card, p, h2, .contact-card');
        children.forEach((child, i) => {
          child.style.transitionDelay = (i * 100) + 'ms';
        });
      }
      
      if (el.id === 'skills') {
        skills.forEach((skill, i) => {
          setTimeout(() => {
            skill.classList.add('show');
          }, i * 150);
        });
      }
    } else {
      el.classList.remove('show');
      el.classList.add('hide');
    }
  });
}, observerOptions);

reveals.forEach(r => observer.observe(r));

// ===== IMAGE ERROR HANDLING =====
document.addEventListener('DOMContentLoaded', () => {
  const portrait = $('#portrait');
  if (portrait) {
    portrait.onerror = () => {
      portrait.src = 'https://via.placeholder.com/720x720/2d1b4e/a78bfa?text=Your+Portrait';
    };
  }
  
  // Handle project images
  const projectImages = $$('.flip-front img');
  projectImages.forEach(img => {
    img.onerror = () => {
      img.src = 'https://via.placeholder.com/600x400/2d1b4e/a78bfa?text=Project+Image';
    };
  });
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

// ===== SCROLL PROGRESS INDICATOR (DEBOUNCED) =====
const scrollProgressBar = $('.scroll-progress-bar');

const updateScrollProgress = debounce(() => {
  const scrollProgress = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
  
  // Update progress bar
  if (scrollProgressBar) {
    scrollProgressBar.style.width = scrollProgress + '%';
  }
  
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
}, 50);

window.addEventListener('scroll', updateScrollProgress, { passive: true });

// ===== INTERACTIVE CARD TILT EFFECT (OPTIMIZED) =====
const cards = $$('.card-hover');

cards.forEach(card => {
  let isHovering = false;
  
  card.addEventListener('mouseenter', () => {
    isHovering = true;
  });
  
  card.addEventListener('mouseleave', () => {
    isHovering = false;
    card.style.transform = '';
  });
  
  card.addEventListener('mousemove', (e) => {
    if (!isHovering) return;
    
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    requestAnimationFrame(() => {
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
    });
  });
});

// ===== DYNAMIC GREETING =====
function updateGreeting() {
  const hour = new Date().getHours();
  const greetingText = $('#greeting-text');
  const wave = $('.wave');
  
  if (!greetingText || !wave) return;
  
  let greeting = 'Welcome';
  let emoji = '👋';
  
  if (hour >= 5 && hour < 12) {
    greeting = 'Good Morning';
    emoji = '🌅';
  } else if (hour >= 12 && hour < 18) {
    greeting = 'Good Afternoon';
    emoji = '☀️';
  } else if (hour >= 18 && hour < 22) {
    greeting = 'Good Evening';
    emoji = '🌆';
  } else {
    greeting = 'Good Night';
    emoji = '🌙';
  }
  
  wave.textContent = emoji;
  greetingText.textContent = greeting;
}

// ===== KEYBOARD NAVIGATION =====
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') {
    moveCarousel(-1);
  } else if (e.key === 'ArrowRight') {
    moveCarousel(1);
  }
  
  if (e.ctrlKey && e.key === ' ') {
    e.preventDefault();
    triggerEasterEgg();
  }
});

// ===== LAZY LOADING FOR IMAGES =====
function initLazyLoading() {
  if ('loading' in HTMLImageElement.prototype) {
    // Browser supports native lazy loading
    const images = $$('img[loading="lazy"]');
    images.forEach(img => {
      if (img.dataset.src) {
        img.src = img.dataset.src;
      }
    });
  } else {
    // Fallback for browsers that don't support lazy loading
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
          }
          imageObserver.unobserve(img);
        }
      });
    });
    
    $$('img[loading="lazy"]').forEach(img => imageObserver.observe(img));
  }
}

// ===== PERFORMANCE MONITORING (DEV MODE) =====
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
  console.log('%c✨ Portfolio Loaded! ✨', 'color: #a78bfa; font-size: 20px; font-weight: bold;');
  console.log('%cPress Ctrl + Space for a surprise! 🎉', 'color: #34d399; font-size: 14px;');
  
  // Log performance metrics
  window.addEventListener('load', () => {
    setTimeout(() => {
      if (window.performance && window.performance.timing) {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`%cPage load time: ${pageLoadTime}ms`, 'color: #60a5fa; font-size: 12px;');
      }
    }, 0);
  });
}

// ===== CLEANUP ON PAGE UNLOAD =====
window.addEventListener('beforeunload', () => {
  clearInterval(autoplayInterval);
  clearTimeout(mouseTimeout);
});