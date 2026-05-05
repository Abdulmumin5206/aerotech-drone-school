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

  document.addEventListener('DOMContentLoaded', () => {
    initAccordions();
    initScrollReveal();
    initProgramsSideNav();
  });
})();
