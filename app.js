/* ═════════════════════════════════════════════════════════
   BÙI THỊ QUỲNH TRANG — PORTFOLIO INTERACTIVE APP LOGIC
   Theme Toggle · SPA Navigation · Interactive Animations
   ═════════════════════════════════════════════════════════ */

// ── 1. LIGHT / DARK THEME SYSTEM ─────────────────────────
function initTheme() {
  const themeToggleBtn = document.getElementById('themeToggle');
  const themeLabel = document.getElementById('themeLabel');
  
  // Check local storage or system color scheme preference
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  let currentTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
  applyTheme(currentTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const newTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
    });
  }
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);

  const themeLabel = document.getElementById('themeLabel');
  if (themeLabel) {
    themeLabel.textContent = theme === 'dark' ? 'Tối' : 'Sáng';
  }
}

// ── 2. SPA PAGE NAVIGATION ────────────────────────────────
function navigateTo(pageId) {
  // Hide all pages
  const pages = document.querySelectorAll('.page');
  pages.forEach(p => p.classList.remove('active'));

  // Show selected page
  const targetPage = document.getElementById(pageId);
  if (targetPage) {
    targetPage.classList.add('active');
    
    // Reset and trigger CSS fade animation
    targetPage.style.animation = 'none';
    targetPage.offsetHeight; // force reflow
    targetPage.style.animation = '';

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Update navbar active state
  document.querySelectorAll('.nav-link').forEach(link => {
    const isCurrent = link.dataset.page === pageId;
    link.classList.toggle('active', isCurrent);
  });

  // Close mobile hamburger menu
  const navLinks = document.getElementById('navLinks');
  const hamburger = document.getElementById('hamburger');
  if (navLinks) navLinks.classList.remove('open');
  if (hamburger) hamburger.classList.remove('open');

  // Trigger skill animations if visiting skills page
  if (pageId === 'skills') {
    setTimeout(animateSkillBars, 150);
  }
}

// ── 3. NAV LINK CLICK HANDLERS ────────────────────────────
function initNavLinks() {
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const page = link.dataset.page;
      if (page) navigateTo(page);
    });
  });

  // Mobile Hamburger Toggle
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      hamburger.classList.toggle('open');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('open');
      }
    });
  }
}

// ── 4. NAVBAR SCROLL & SCROLL TO TOP ──────────────────────
function initScrollEffects() {
  const navbar = document.getElementById('navbar');
  const scrollTopBtn = document.getElementById('scrollTop');

  window.addEventListener('scroll', () => {
    if (navbar) {
      navbar.classList.toggle('scrolled', window.scrollY > 20);
    }
    if (scrollTopBtn) {
      scrollTopBtn.classList.toggle('visible', window.scrollY > 300);
    }
  });
}

// ── 5. SKILL BARS & RINGS ANIMATION ───────────────────────
function animateSkillBars() {
  // Linear progress bars
  document.querySelectorAll('.skill-fill').forEach(bar => {
    const width = bar.dataset.width + '%';
    bar.style.width = '0%';
    setTimeout(() => {
      bar.style.width = width;
    }, 50);
  });
}

// ── 6. PROJECT FILTERING ──────────────────────────────────
function initProjectFilters() {
  const filterTabs = document.querySelectorAll('.filter-tab');
  const projectCards = document.querySelectorAll('.project-card');

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Remove active from all tabs
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filterValue = tab.dataset.filter;

      projectCards.forEach(card => {
        const category = card.dataset.category;
        if (filterValue === 'all' || category === filterValue || category === 'all') {
          card.style.display = 'flex';
          card.style.animation = 'fadeInPage 0.4s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

// ── 7. CONTACT FORM SUBMISSION ───────────────────────────
function handleSubmit(e) {
  e.preventDefault();

  const submitBtn = document.getElementById('submitBtn');
  const formSuccess = document.getElementById('formSuccess');

  if (!submitBtn) return;

  const originalContent = submitBtn.innerHTML;
  submitBtn.disabled = true;
  submitBtn.innerHTML = '<span>⏳ Đang gửi tin nhắn...</span>';
  submitBtn.style.opacity = '0.75';

  // Simulate network request
  setTimeout(() => {
    submitBtn.innerHTML = '<span>✅ Đã gửi xong!</span>';
    submitBtn.style.opacity = '1';

    if (formSuccess) {
      formSuccess.classList.add('show');
    }

    document.getElementById('contactForm').reset();

    // Reset button & toast after 4 seconds
    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalContent;
      if (formSuccess) formSuccess.classList.remove('show');
    }, 4000);
  }, 1200);
}

// ── 8. HERO STAT COUNTERS ─────────────────────────────────
function initStatCounters() {
  const statElements = document.querySelectorAll('.stat-num');
  
  statElements.forEach(el => {
    const rawTarget = el.dataset.target || el.textContent;
    const num = parseFloat(rawTarget);
    
    if (!isNaN(num)) {
      let current = 0;
      const step = num / 30;
      const isDecimal = rawTarget.includes('.');

      const timer = setInterval(() => {
        current += step;
        if (current >= num) {
          el.textContent = isDecimal ? num.toFixed(2) : Math.floor(num) + (rawTarget.includes('+') ? '+' : rawTarget.includes('%') ? '%' : '');
          clearInterval(timer);
        } else {
          el.textContent = isDecimal ? current.toFixed(2) : Math.floor(current) + (rawTarget.includes('+') ? '+' : rawTarget.includes('%') ? '%' : '');
        }
      }, 30);
    }
  });
}

// ── 9. AVATAR FALLBACK HANDLER ────────────────────────────
function initAvatarFallback() {
  const avatarImgs = document.querySelectorAll('.avatar-img, .about-photo');
  avatarImgs.forEach(img => {
    img.addEventListener('error', function() {
      const parent = this.parentElement;
      const fallback = document.createElement('div');
      fallback.className = this.className;
      fallback.style.cssText = `
        background: linear-gradient(135deg, #6366f1, #ec4899);
        display: flex; align-items: center; justify-content: center;
        font-size: 3.5rem; color: #fff; font-weight: 800; border-radius: 50%;
      `;
      fallback.textContent = 'QT';
      if (parent) parent.replaceChild(fallback, this);
    });
  });
}

// ── 10. INITIALIZATION ────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNavLinks();
  initScrollEffects();
  initProjectFilters();
  initAvatarFallback();
  initStatCounters();

  // Make home active by default
  navigateTo('home');
});
