/* ═══════════════════════════════════════════════════════════
   BETEL CHURCH — script.js
   Handles: theme toggle, reading progress, scroll reveal,
            smooth scroll, system dark mode detection,
            footer year, subtle hero parallax.
═══════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ── Cached DOM refs ───────────────────────────────── */
  const html        = document.documentElement;
  const themeBtn    = document.getElementById('theme-toggle');
  const themeIcon   = document.getElementById('theme-icon');
  const progressBar = document.getElementById('progress-bar');
  const ctaBtn      = document.getElementById('cta-btn');
  const footerYear  = document.getElementById('footer-year');

  /* ── Footer year ────────────────────────────────────── */
  if (footerYear) {
    footerYear.textContent = new Date().getFullYear();
  }

  /* ══════════════════════════════════════════════════════
     THEME MANAGEMENT
  ══════════════════════════════════════════════════════ */
  const STORAGE_KEY = 'betel-theme';
  const ICONS = { light: '☽', dark: '☀' };

  function getPreferredTheme() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function applyTheme(theme) {
    html.setAttribute('data-theme', theme);
    if (themeIcon) themeIcon.textContent = ICONS[theme];
    localStorage.setItem(STORAGE_KEY, theme);
  }

  function toggleTheme() {
    const current = html.getAttribute('data-theme') || 'light';
    applyTheme(current === 'light' ? 'dark' : 'light');
  }

  // Init theme immediately (before paint) to avoid flash
  applyTheme(getPreferredTheme());

  if (themeBtn) {
    themeBtn.addEventListener('click', toggleTheme);
  }

  // Listen for OS-level changes
  window.matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', (e) => {
      // Only auto-switch if user hasn't manually set a preference
      if (!localStorage.getItem(STORAGE_KEY)) {
        applyTheme(e.matches ? 'dark' : 'light');
      }
    });

  /* ══════════════════════════════════════════════════════
     READING PROGRESS BAR
  ══════════════════════════════════════════════════════ */
  function updateProgress() {
    if (!progressBar) return;
    const scrollTop    = window.scrollY;
    const docHeight    = document.documentElement.scrollHeight - window.innerHeight;
    const progress     = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = Math.min(progress, 100) + '%';
  }

  /* ══════════════════════════════════════════════════════
     SCROLL REVEAL
  ══════════════════════════════════════════════════════ */
  function initReveal() {
    // Auto-tag elements we want to reveal
    const targets = [
      '.article-header',
      '.article-text h2',
      '.pull-quote',
      '.infobox',
      '.article-tags.bottom-tags',
      '.sidebar-widget',
      '.site-footer',
    ];

    targets.forEach((selector) => {
      document.querySelectorAll(selector).forEach((el) => {
        el.classList.add('reveal');
      });
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // animate once
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
  }

  /* ══════════════════════════════════════════════════════
     SMOOTH SCROLL — CTA BUTTON
  ══════════════════════════════════════════════════════ */
  if (ctaBtn) {
    ctaBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.getElementById('article');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }

  // Generic smooth scroll for all anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href').slice(1);
      if (!targetId) return;
      const target = document.getElementById(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ══════════════════════════════════════════════════════
     HERO PARALLAX (subtle, performance-safe)
  ══════════════════════════════════════════════════════ */
  const heroContent = document.querySelector('.hero-content');
  const lightRays   = document.querySelector('.light-rays');

  function onScroll() {
    updateProgress();

    const sy = window.scrollY;

    // Subtle parallax on hero content
    if (heroContent && sy < window.innerHeight) {
      heroContent.style.transform = `translateY(${sy * 0.18}px)`;
    }

    // Rays move slightly faster
    if (lightRays && sy < window.innerHeight) {
      lightRays.style.transform = `translateY(${sy * 0.08}px)`;
    }
  }

  /* ══════════════════════════════════════════════════════
     PASSIVE SCROLL LISTENER (batched via rAF)
  ══════════════════════════════════════════════════════ */
  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        onScroll();
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  /* ══════════════════════════════════════════════════════
     INIT
  ══════════════════════════════════════════════════════ */
  document.addEventListener('DOMContentLoaded', () => {
    initReveal();
    updateProgress();
  });

  // If DOM already loaded (script deferred or at bottom)
  if (document.readyState !== 'loading') {
    initReveal();
    updateProgress();
  }

})();
