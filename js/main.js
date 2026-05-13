/* Aerotech Drone School — UI behavior
 * Accordions, scroll reveal, programs side-nav active state. */

(() => {
  'use strict';

  // Shared coordination flags between the offer modal and the lead drawer.
  // Only one auto-popup fires per session — first-to-fire wins. Both remain
  // available via their own triggers (drawer button / future "View offer" link).
  let modalAutoFired = false;
  let drawerAutoOpened = false;

  // Treat any browser refresh (F5, Ctrl+R, Ctrl+Shift+R) as a fresh visit so the
  // popups re-trigger. Submitted/redeemed flags still block forever.
  const isReload = (() => {
    try {
      const nav = performance.getEntriesByType && performance.getEntriesByType('navigation')[0];
      if (nav && nav.type) return nav.type === 'reload';
      return performance.navigation && performance.navigation.type === 1;
    } catch (_) {
      return false;
    }
  })();

  // Accordion toggles (advantage + audience sections)
  const initAccordions = () => {
    const advantageImg = document.getElementById('advantage-img');

    const swapAdvantageImg = (src, alt) => {
      if (!advantageImg || !src || advantageImg.getAttribute('src') === src) return;
      const apply = () => {
        advantageImg.src = src;
        if (alt) advantageImg.alt = alt;
      };
      const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduced) {
        apply();
        return;
      }
      advantageImg.classList.add('swapping');
      const onEnd = () => {
        apply();
        advantageImg.classList.remove('swapping');
        advantageImg.removeEventListener('transitionend', onEnd);
      };
      advantageImg.addEventListener('transitionend', onEnd);
    };

    document.querySelectorAll('.acc-item, .aud-item').forEach((item) => {
      item.addEventListener('click', () => {
        const wasOpen = item.classList.contains('open');
        // Close siblings within the same accordion
        item.parentElement
          .querySelectorAll('.acc-item, .aud-item')
          .forEach((sibling) => sibling.classList.remove('open'));
        if (!wasOpen) {
          item.classList.add('open');
          const src = item.dataset.illu;
          if (src) {
            const heading = item.querySelector('h3');
            swapAdvantageImg(src, heading ? heading.textContent.trim() : '');
          }
        }
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

  // Nav scroll behavior:
  //  - At top / within ~0.85 viewport: keep at-top look (no white flash).
  //  - Past that threshold: hide on scroll-down, slide back in white on scroll-up.
  //  - The white state is paired with a CSS transition-delay so the color flip
  //    happens after the slide-up — never visible on the bar.
  const initNavScroll = () => {
    const nav = document.querySelector('.nav');
    if (!nav) return;

    let lastY = window.scrollY;
    let ticking = false;

    const apply = () => {
      const y = window.scrollY;
      const goingDown = y > lastY;
      const hideThreshold = window.innerHeight * 0.85;

      if (y < hideThreshold) {
        nav.classList.remove('nav--hidden', 'nav--scrolled');
      } else if (goingDown) {
        nav.classList.add('nav--hidden', 'nav--scrolled');
      } else {
        nav.classList.remove('nav--hidden');
        nav.classList.add('nav--scrolled');
      }

      lastY = y;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(apply);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    apply();
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

  // Lead-capture CTA — persistent right-edge drawer with auto-open + click trigger
  const initLeadCTA = () => {
    const popup = document.getElementById('leadCTA');
    const trigger = document.getElementById('leadTrigger');
    if (!popup || !trigger) return;

    const SESSION_KEY = 'aerotech_cta_session';        // suppress within tab session
    const STORAGE_AUTOSEEN = 'aerotech_cta_autoseen';  // cross-session cap timestamp
    const STORAGE_SUBMITTED = 'aerotech_cta_submitted'; // permanent block on conversion
    const CAP_MS = 3 * 24 * 60 * 60 * 1000; // 3-day cross-session cap

    const params = new URLSearchParams(location.search);
    const force = params.get('showcta') === '1';

    let isOpen = false;
    let autoOpenedThisSession = false;
    let justOpenedAt = 0;

    const open = () => {
      if (isOpen) return;
      isOpen = true;
      justOpenedAt = Date.now();
      popup.classList.remove('is-success', 'is-error');
      popup.classList.add('is-open');
      popup.setAttribute('aria-hidden', 'false');
      trigger.classList.add('is-hidden');
      trigger.setAttribute('aria-expanded', 'true');
    };

    const close = () => {
      if (!isOpen) return;
      isOpen = false;
      popup.classList.remove('is-open');
      popup.setAttribute('aria-hidden', 'true');
      trigger.classList.remove('is-hidden');
      trigger.setAttribute('aria-expanded', 'false');
    };

    // Trigger button toggles the drawer
    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      isOpen ? close() : open();
    });

    // Close button
    popup.querySelector('.cta-popup__close').addEventListener('click', close);

    // Click outside drawer closes (ignore the click that just opened it)
    document.addEventListener('click', (e) => {
      if (!isOpen) return;
      if (Date.now() - justOpenedAt < 100) return;
      if (popup.contains(e.target) || trigger.contains(e.target)) return;
      close();
    });

    // ESC closes
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && isOpen) close();
    });

    // Wheel containment — page won't scroll when wheel is inside the drawer.
    // Allow internal scrolling, but stop chaining at the panel boundaries
    // (overscroll-behavior: contain handles edges; this handles the no-overflow case).
    const scroller = document.getElementById('leadScroll');
    scroller.addEventListener('wheel', (e) => {
      const { scrollTop, scrollHeight, clientHeight } = scroller;
      if (scrollHeight <= clientHeight) {
        e.preventDefault();
        return;
      }
      const atTop = scrollTop <= 0;
      const atBottom = scrollTop + clientHeight >= scrollHeight - 1;
      if ((atTop && e.deltaY < 0) || (atBottom && e.deltaY > 0)) {
        e.preventDefault();
      }
    }, { passive: false });

    // Touch containment for mobile
    let touchStartY = 0;
    scroller.addEventListener('touchstart', (e) => {
      touchStartY = e.touches[0].clientY;
    }, { passive: true });
    scroller.addEventListener('touchmove', (e) => {
      const { scrollTop, scrollHeight, clientHeight } = scroller;
      if (scrollHeight <= clientHeight) {
        e.preventDefault();
        return;
      }
      const deltaY = touchStartY - e.touches[0].clientY;
      const atTop = scrollTop <= 0;
      const atBottom = scrollTop + clientHeight >= scrollHeight - 1;
      if ((atTop && deltaY < 0) || (atBottom && deltaY > 0)) {
        e.preventDefault();
      }
    }, { passive: false });

    // Auto-open: session-suppressed (unless this is a reload), 3-day cross-session
    // cap (also bypassed on reload), never after submit. Suppressed if the offer
    // modal already auto-fired this session. ?showcta=1 forces show for testing.
    const canAutoOpen = () => {
      if (force) return true;
      if (autoOpenedThisSession) return false;
      if (modalAutoFired) return false;
      if (params.get('nocta') === '1') return false;
      if (window.innerHeight < 600) return false;
      try {
        if (localStorage.getItem(STORAGE_SUBMITTED) === 'true') return false;
        if (!isReload) {
          if (sessionStorage.getItem(SESSION_KEY) === 'true') return false;
          const seenAt = parseInt(localStorage.getItem(STORAGE_AUTOSEEN) || '0', 10);
          if (seenAt && Date.now() - seenAt < CAP_MS) return false;
        }
      } catch (_) {}
      return true;
    };

    const tryAutoOpen = () => {
      if (!canAutoOpen()) return;
      autoOpenedThisSession = true;
      drawerAutoOpened = true;
      try {
        sessionStorage.setItem(SESSION_KEY, 'true');
        localStorage.setItem(STORAGE_AUTOSEEN, String(Date.now()));
      } catch (_) {}
      open();
      cleanupAutoTriggers();
    };

    const demoSection = document.getElementById('demo');
    const sectionObserver = demoSection
      ? new IntersectionObserver(
          (entries) => { if (entries[0].isIntersecting) tryAutoOpen(); },
          { threshold: 0.2 }
        )
      : null;
    if (sectionObserver) sectionObserver.observe(demoSection);

    const cleanupAutoTriggers = () => {
      if (sectionObserver) sectionObserver.disconnect();
    };

    // Slide the trigger out when the footer enters view so it doesn't overlap
    // footer buttons/links. Uses a separate class from .is-hidden (drawer-open
    // state) so the two states don't clobber each other.
    const footer = document.querySelector('.footer');
    if (footer) {
      const footerObserver = new IntersectionObserver(
        (entries) => {
          trigger.classList.toggle('is-at-footer', entries[0].isIntersecting);
        },
        { threshold: 0, rootMargin: '0px 0px -40px 0px' }
      );
      footerObserver.observe(footer);
    }

    // Mode toggle
    const input = popup.querySelector('#leadInput');
    const btnLabel = popup.querySelector('.cta-popup__btn-label');
    const errorEl = popup.querySelector('#leadError');
    const toggleBtns = popup.querySelectorAll('.cta-popup__toggle-btn');
    let mode = 'phone';

    const setMode = (next) => {
      if (next === mode) return;
      mode = next;
      toggleBtns.forEach((b) => {
        const isActive = b.dataset.mode === mode;
        b.classList.toggle('is-active', isActive);
        b.setAttribute('aria-selected', String(isActive));
      });
      if (mode === 'phone') {
        input.type = 'tel';
        input.placeholder = '+998 __ ___ __ __';
        input.autocomplete = 'tel';
        btnLabel.textContent = 'Get a callback';
      } else {
        input.type = 'email';
        input.placeholder = 'you@example.com';
        input.autocomplete = 'email';
        btnLabel.textContent = 'Email me';
      }
      input.value = '';
      popup.classList.remove('is-error');
      errorEl.textContent = '';
    };

    toggleBtns.forEach((b) => {
      b.addEventListener('click', () => setMode(b.dataset.mode));
    });

    // Validation
    const validatePhone = (v) => {
      const cleaned = v.replace(/[\s\-()]/g, '');
      return /^(\+998\d{9}|998\d{9}|\d{9})$/.test(cleaned);
    };
    const validateEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

    input.addEventListener('input', () => {
      if (popup.classList.contains('is-error')) {
        popup.classList.remove('is-error');
        errorEl.textContent = '';
      }
    });

    // Submit
    const form = popup.querySelector('#leadForm');
    const submitBtn = form.querySelector('.cta-popup__submit');

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const value = input.value.trim();
      const isValid = mode === 'phone' ? validatePhone(value) : validateEmail(value);
      if (!isValid) {
        popup.classList.add('is-error');
        errorEl.textContent = mode === 'phone'
          ? 'Enter a valid phone number.'
          : 'Enter a valid email address.';
        input.focus();
        return;
      }

      popup.classList.remove('is-error');
      submitBtn.setAttribute('disabled', 'true');
      const originalLabel = btnLabel.textContent;
      btnLabel.textContent = 'Sending…';

      try {
        // Placeholder — swap for Web3Forms / Telegram / Sheets endpoint.
        console.log('[Aerotech CTA lead]', { mode, value, ts: new Date().toISOString() });
        await new Promise((r) => setTimeout(r, 600));

        try { localStorage.setItem(STORAGE_SUBMITTED, 'true'); } catch (_) {}
        popup.classList.add('is-success');
        submitBtn.removeAttribute('disabled');
        btnLabel.textContent = originalLabel;
        input.value = '';
      } catch (err) {
        submitBtn.removeAttribute('disabled');
        btnLabel.textContent = originalLabel;
        errorEl.textContent = "Couldn't send. Try again or write to hello@aerotech.uz";
        popup.classList.add('is-error');
      }
    });
  };

  // Offer modal — center promo with phone capture
  const initOfferModal = () => {
    const modal = document.getElementById('offerModal');
    if (!modal) return;

    const SESSION_KEY = 'aerotech_offer_session';     // suppress within tab session
    const STORAGE_SEEN = 'aerotech_offer_seen';        // cross-session cap timestamp
    const STORAGE_REDEEMED = 'aerotech_offer_redeemed'; // permanent block on conversion
    const CAP_MS = 24 * 60 * 60 * 1000; // 1-day cross-session cap
    const TIME_THRESHOLD_MS = 5000;

    let isOpen = false;
    let firedThisSession = false;

    const params = new URLSearchParams(location.search);
    const force = params.get('showoffer') === '1';

    // Killswitches up front — if blocked, never wire timers. Force overrides.
    if (!force) {
      if (params.get('nooffer') === '1') return;
      try {
        if (localStorage.getItem(STORAGE_REDEEMED) === 'true') return;
        if (sessionStorage.getItem(SESSION_KEY) === 'true') return;
        const seenAt = parseInt(localStorage.getItem(STORAGE_SEEN) || '0', 10);
        if (seenAt && Date.now() - seenAt < CAP_MS) return;
      } catch (_) {}
    }

    const lockBodyScroll = () => {
      document.body.dataset.prevOverflow = document.body.style.overflow || '';
      document.body.style.overflow = 'hidden';
    };

    const unlockBodyScroll = () => {
      document.body.style.overflow = document.body.dataset.prevOverflow || '';
      delete document.body.dataset.prevOverflow;
    };

    const open = () => {
      if (isOpen) return;
      isOpen = true;
      modal.classList.remove('is-success', 'is-error');
      modal.classList.add('is-open');
      modal.setAttribute('aria-hidden', 'false');
      lockBodyScroll();
      try {
        sessionStorage.setItem(SESSION_KEY, 'true');
        localStorage.setItem(STORAGE_SEEN, String(Date.now()));
      } catch (_) {}
    };

    const close = () => {
      if (!isOpen) return;
      isOpen = false;
      modal.classList.remove('is-open');
      modal.setAttribute('aria-hidden', 'true');
      unlockBodyScroll();
    };

    const tryFire = () => {
      if (firedThisSession) return;
      // Skip only if the drawer is currently visible on screen — don't penalise
      // the modal just because the drawer auto-opened earlier and was dismissed.
      const drawer = document.getElementById('leadCTA');
      if (drawer && drawer.classList.contains('is-open')) {
        firedThisSession = true;
        cleanup();
        return;
      }
      firedThisSession = true;
      modalAutoFired = true;
      open();
      cleanup();
    };

    const onExitIntent = (e) => {
      if (e.clientY <= 0) tryFire();
    };

    const cleanup = () => {
      clearTimeout(timerId);
      document.removeEventListener('mouseleave', onExitIntent);
    };

    const timerId = setTimeout(tryFire, TIME_THRESHOLD_MS);
    if (window.innerWidth > 920) {
      document.addEventListener('mouseleave', onExitIntent);
    }

    // Close interactions
    modal.querySelector('.offer-modal__close').addEventListener('click', close);
    modal.querySelectorAll('[data-close]').forEach((el) => {
      el.addEventListener('click', close);
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && isOpen) close();
    });

    // Form
    const form = modal.querySelector('#offerForm');
    const input = modal.querySelector('#offerInput');
    const errorEl = modal.querySelector('#offerError');
    const btnLabel = modal.querySelector('.offer-modal__btn-label');
    const submitBtn = form.querySelector('.offer-modal__submit');

    const validatePhone = (v) => {
      const cleaned = v.replace(/[\s\-()]/g, '');
      return /^(\+998\d{9}|998\d{9}|\d{9})$/.test(cleaned);
    };

    input.addEventListener('input', () => {
      if (modal.classList.contains('is-error')) {
        modal.classList.remove('is-error');
        errorEl.textContent = '';
      }
    });

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const value = input.value.trim();
      if (!validatePhone(value)) {
        modal.classList.add('is-error');
        errorEl.textContent = 'Enter a valid phone number.';
        input.focus();
        return;
      }

      modal.classList.remove('is-error');
      submitBtn.setAttribute('disabled', 'true');
      const original = btnLabel.textContent;
      btnLabel.textContent = 'Sending…';

      try {
        // Placeholder — swap for Web3Forms / Telegram / Sheets endpoint.
        console.log('[Aerotech offer claimed]', { phone: value, ts: new Date().toISOString() });
        await new Promise((r) => setTimeout(r, 700));

        try { localStorage.setItem(STORAGE_REDEEMED, 'true'); } catch (_) {}
        modal.classList.add('is-success');
        submitBtn.removeAttribute('disabled');
        btnLabel.textContent = original;
        input.value = '';
      } catch (err) {
        submitBtn.removeAttribute('disabled');
        btnLabel.textContent = original;
        errorEl.textContent = "Couldn't send. Try again or write to hello@aerotech.uz";
        modal.classList.add('is-error');
      }
    });
  };

  // Journey sticky-scroll: swap the active video as each text step crosses
  // the middle of the viewport. Inactive videos pause to save CPU.
  const initJourneyScroll = () => {
    const track = document.querySelector('.journey-track');
    if (!track) return;

    const steps = track.querySelectorAll('.journey-step');
    const videos = track.querySelectorAll('.journey-video');
    const dots = track.querySelectorAll('.journey-progress span');
    if (!steps.length || !videos.length) return;

    const setActive = (idx) => {
      steps.forEach((s, i) => s.classList.toggle('is-active', i === idx));
      videos.forEach((v, i) => {
        const isActive = i === idx;
        v.classList.toggle('is-active', isActive);
        if (isActive) {
          const playPromise = v.play();
          if (playPromise && typeof playPromise.catch === 'function') {
            playPromise.catch(() => {});
          }
        } else {
          v.pause();
        }
      });
      dots.forEach((d, i) => d.classList.toggle('is-active', i === idx));
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = [...steps].indexOf(entry.target);
            if (idx !== -1) setActive(idx);
          }
        });
      },
      {
        // Trigger when the step crosses the middle 40% of the viewport.
        rootMargin: '-30% 0px -30% 0px',
        threshold: 0,
      }
    );

    steps.forEach((step) => observer.observe(step));
  };

  document.addEventListener('DOMContentLoaded', () => {
    initAccordions();
    initScrollReveal();
    initProgramsSideNav();
    initNavScroll();
    initLangSwitch();
    initMobileMenu();
    initLeadCTA();
    initOfferModal();
    initJourneyScroll();
  });
})();
