/* Aerotech Drone School — UI behavior
 * Accordions, scroll reveal, programs side-nav active state. */

(() => {
  'use strict';

  // Accordion toggles (advantage + audience sections)
  const initAccordions = () => {
    document.querySelectorAll('.acc-item, .aud-item').forEach((item) => {
      item.addEventListener('click', () => {
        const wasOpen = item.classList.contains('open');
        // Close siblings within the same accordion
        item.parentElement
          .querySelectorAll('.acc-item, .aud-item')
          .forEach((sibling) => sibling.classList.remove('open'));
        if (!wasOpen) item.classList.add('open');
      });
    });
  };

  // Reveal sections on scroll
  const initScrollReveal = () => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
  };

  // Programs side-nav active state syncs with the visible row
  const initProgramsSideNav = () => {
    const sideNav = document.getElementById('prog-side');
    if (!sideNav) return;

    const links = sideNav.querySelectorAll('a');
    const rows = document.querySelectorAll('.programs-row');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = [...rows].indexOf(entry.target);
            links.forEach((link) => link.classList.remove('active'));
            if (links[idx]) links[idx].classList.add('active');
          }
        });
      },
      { threshold: 0.5 }
    );

    rows.forEach((row) => observer.observe(row));
  };

  // Hide nav on scroll down, reveal on scroll up. Always white past the top
  // so the slide-in starts from the white state (no dark flash).
  const initNavScroll = () => {
    const nav = document.querySelector('.nav');
    if (!nav) return;
    let lastY = window.scrollY;

    const update = () => {
      const y = window.scrollY;
      if (y <= 10) {
        nav.classList.remove('nav--hidden', 'nav--scrolled');
      } else {
        nav.classList.add('nav--scrolled');
        if (y > lastY && y > 80) {
          nav.classList.add('nav--hidden');
        } else {
          nav.classList.remove('nav--hidden');
        }
      }
      lastY = y;
    };

    window.addEventListener('scroll', update, { passive: true });
    update();
  };

  // Language switcher (visual only — set active state on click)
  const initLangSwitch = () => {
    const sw = document.querySelector('.lang-switch');
    if (!sw) return;
    sw.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        sw.querySelectorAll('a').forEach((a) => a.classList.remove('active'));
        link.classList.add('active');
      });
    });
  };

  // Mobile menu drawer
  const initMobileMenu = () => {
    const btn = document.querySelector('.icon-btn--menu');
    const menu = document.getElementById('mobileMenu');
    const nav = document.querySelector('.nav');
    if (!btn || !menu) return;

    const open = () => {
      menu.classList.add('open');
      if (nav) nav.classList.remove('nav--hidden');
      document.body.style.overflow = 'hidden';
    };
    const close = () => {
      menu.classList.remove('open');
      document.body.style.overflow = '';
    };

    btn.addEventListener('click', (e) => {
      e.preventDefault();
      menu.classList.contains('open') ? close() : open();
    });
    menu.querySelectorAll('a').forEach((a) => a.addEventListener('click', close));
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') close();
    });
  };

  document.addEventListener('DOMContentLoaded', () => {
    initAccordions();
    initScrollReveal();
    initProgramsSideNav();
    initNavScroll();
    initLangSwitch();
    initMobileMenu();
  });
})();
