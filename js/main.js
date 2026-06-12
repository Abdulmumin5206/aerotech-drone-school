/* Aerotech Drone School — UI behavior
 * Accordions, scroll reveal, nav, lead CTA, modals. */

(() => {
  'use strict';

  // The offer modal still auto-fires once per session. The lead drawer no longer
  // auto-opens on scroll — it opens only from the Contact tab and the
  // "Get in Touch" buttons — so it needs no coordination flag of its own.
  let modalAutoFired = false;

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
    const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const swapImg = (imgEl, src, alt) => {
      if (!imgEl || !src || imgEl.getAttribute('src') === src) return;
      const apply = () => {
        imgEl.src = src;
        if (alt) imgEl.alt = alt;
      };
      if (reduced) {
        apply();
        return;
      }
      imgEl.classList.add('swapping');
      const onEnd = () => {
        apply();
        imgEl.classList.remove('swapping');
        imgEl.removeEventListener('transitionend', onEnd);
      };
      imgEl.addEventListener('transitionend', onEnd);
    };

    const swapText = (el, value) => {
      if (!el || el.textContent === value) return;
      if (reduced) {
        el.textContent = value;
        return;
      }
      el.classList.add('swapping');
      const onEnd = () => {
        el.textContent = value;
        el.classList.remove('swapping');
        el.removeEventListener('transitionend', onEnd);
      };
      el.addEventListener('transitionend', onEnd);
    };

    // Each accordion describes its own image + caption target so the same
    // click handler can drive multiple "image + accordion" sections.
    const groups = [
      {
        itemSel: '.acc-item',
        imgEl: document.getElementById('advantage-img'),
        titleEl: document.getElementById('advantage-step-title'),
      },
      {
        itemSel: '.aud-item',
        imgEl: document.getElementById('audience-img'),
        titleEl: document.getElementById('audience-step-title'),
      },
    ];

    groups.forEach((group) => {
      document.querySelectorAll(group.itemSel).forEach((item) => {
        item.addEventListener('click', () => {
          const wasOpen = item.classList.contains('open');
          item.parentElement
            .querySelectorAll(group.itemSel)
            .forEach((sibling) => sibling.classList.remove('open'));
          if (!wasOpen) {
            item.classList.add('open');
            const heading = item.querySelector('h3');
            const headingText = heading ? heading.textContent.trim() : '';
            const src = item.dataset.illu;
            if (src) swapImg(group.imgEl, src, headingText);
            swapText(group.titleEl, headingText);
          }
        });
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

  // Language switcher (visual only — dropdown with flags)
  const initLangSwitch = () => {
    const sw = document.querySelector('.lang-switch');
    if (!sw) return;
    const trigger = sw.querySelector('.lang-switch__current');
    const menu = sw.querySelector('.lang-switch__menu');
    const codeEl = sw.querySelector('.lang-switch__code');
    const flagEl = trigger && trigger.querySelector('.lang-switch__flag');
    if (!trigger || !menu) return;

    const open = () => {
      menu.hidden = false;
      trigger.setAttribute('aria-expanded', 'true');
    };
    const close = () => {
      menu.hidden = true;
      trigger.setAttribute('aria-expanded', 'false');
    };

    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      if (menu.hidden) open(); else close();
    });

    document.addEventListener('click', (e) => {
      if (!sw.contains(e.target)) close();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') close();
    });

    menu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        menu.querySelectorAll('a').forEach((a) => a.classList.remove('is-active'));
        menu.querySelectorAll('li').forEach((li) => li.setAttribute('aria-selected', 'false'));
        link.classList.add('is-active');
        const li = link.closest('li');
        if (li) li.setAttribute('aria-selected', 'true');
        if (codeEl) codeEl.textContent = link.dataset.lang || codeEl.textContent;
        const newFlag = link.querySelector('.lang-switch__flag');
        if (flagEl && newFlag) flagEl.innerHTML = newFlag.innerHTML;
        close();
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

    // Expand/collapse mobile submenus inside the drawer
    menu.querySelectorAll('.mobile-menu-toggle').forEach((toggle) => {
      const submenuId = toggle.getAttribute('aria-controls');
      const submenu = submenuId ? document.getElementById(submenuId) : null;
      if (!submenu) return;
      toggle.addEventListener('click', () => {
        const isOpen = toggle.getAttribute('aria-expanded') === 'true';
        toggle.setAttribute('aria-expanded', String(!isOpen));
        if (isOpen) {
          submenu.setAttribute('hidden', '');
        } else {
          submenu.removeAttribute('hidden');
        }
      });
    });
  };

  // Desktop nav dropdown — hover intent (delayed close) + click for keyboard / touch
  const initNavDropdown = () => {
    const canHover = window.matchMedia('(hover: hover)').matches;

    document.querySelectorAll('.nav-item.has-dropdown').forEach((item) => {
      const trigger = item.querySelector('.nav-trigger');
      if (!trigger) return;

      trigger.addEventListener('click', (e) => {
        // Trigger is still an anchor to #drone-school. On touch / keyboard
        // activation, toggle the panel instead of jumping immediately so the
        // user can choose a sub-item. Mouse clicks fall through.
        const isTouch = window.matchMedia('(hover: none)').matches;
        if (isTouch || e.detail === 0) {
          e.preventDefault();
          const open = item.classList.toggle('is-open');
          trigger.setAttribute('aria-expanded', String(open));
        }
      });

      // Hover intent: open on enter, close after a short grace period so the
      // cursor can travel from the trigger down to the panel without it
      // fading out and becoming unclickable on the way.
      if (canHover) {
        let closeTimer;
        item.addEventListener('mouseenter', () => {
          clearTimeout(closeTimer);
          item.classList.add('is-open');
          trigger.setAttribute('aria-expanded', 'true');
        });
        item.addEventListener('mouseleave', () => {
          clearTimeout(closeTimer);
          closeTimer = setTimeout(() => {
            item.classList.remove('is-open');
            trigger.setAttribute('aria-expanded', 'false');
          }, 180);
        });
      }
    });

    document.addEventListener('click', (e) => {
      document.querySelectorAll('.nav-item.has-dropdown.is-open').forEach((item) => {
        if (!item.contains(e.target)) {
          item.classList.remove('is-open');
          const trig = item.querySelector('.nav-trigger');
          if (trig) trig.setAttribute('aria-expanded', 'false');
        }
      });
    });

    document.addEventListener('keydown', (e) => {
      if (e.key !== 'Escape') return;
      document.querySelectorAll('.nav-item.has-dropdown.is-open').forEach((item) => {
        item.classList.remove('is-open');
        const trig = item.querySelector('.nav-trigger');
        if (trig) trig.setAttribute('aria-expanded', 'false');
      });
    });
  };

  // Lead-capture CTA — persistent right-edge drawer with auto-open + click trigger
  const initLeadCTA = () => {
    const popup = document.getElementById('leadCTA');
    const trigger = document.getElementById('leadTrigger');
    if (!popup || !trigger) return;

    const STORAGE_SUBMITTED = 'aerotech_cta_submitted'; // permanent block on conversion

    const params = new URLSearchParams(location.search);
    const force = params.get('showcta') === '1';

    let isOpen = false;
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

    // No auto-open on scroll. The drawer opens only when the user asks: the
    // right-edge Contact tab (above) or any [data-lead-open] button — e.g. the
    // visit-lab and footer "Get in Touch" CTAs. preventDefault stops their
    // href="#"/"#demo" fallback from jumping. ?showcta=1 still opens for testing.
    document.querySelectorAll('[data-lead-open]').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        open();
      });
    });
    if (force) open();

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

  const initLevelCarousel = () => {
    const carousel = document.querySelector('[data-carousel]');
    if (!carousel) return;
    const track = carousel.querySelector('.ds-carousel__track');
    const slides = Array.from(track.querySelectorAll('.ds-slide'));
    if (!slides.length) return;
    const prevBtn = carousel.querySelector('[data-dir="prev"]');
    const nextBtn = carousel.querySelector('[data-dir="next"]');
    const counter = carousel.querySelector('[data-current]');
    const videos = slides.map((s) => s.querySelector('video'));

    const slideStep = () => slides[0].offsetWidth + parseInt(getComputedStyle(track).columnGap || 20, 10);

    const currentIndex = () => Math.round(track.scrollLeft / slideStep());

    const ensureSrc = (v) => {
      if (!v) return;
      const src = v.getAttribute('data-src');
      if (src && !v.src) {
        v.src = src;
        v.load();
      }
    };

    const update = () => {
      const idx = Math.max(0, Math.min(slides.length - 1, currentIndex()));
      if (counter) counter.textContent = String(idx + 1);
      if (prevBtn) prevBtn.disabled = idx === 0;
      if (nextBtn) nextBtn.disabled = idx === slides.length - 1;
      const active = videos[idx];
      ensureSrc(active);
      videos.forEach((v, i) => {
        if (!v) return;
        if (i === idx) {
          const p = v.play();
          if (p && typeof p.catch === 'function') p.catch(() => {});
        } else {
          v.pause();
        }
      });
    };

    const goTo = (idx) => {
      const clamped = Math.max(0, Math.min(slides.length - 1, idx));
      track.scrollTo({ left: clamped * slideStep(), behavior: 'smooth' });
    };

    if (prevBtn) prevBtn.addEventListener('click', () => goTo(currentIndex() - 1));
    if (nextBtn) nextBtn.addEventListener('click', () => goTo(currentIndex() + 1));

    let raf = 0;
    let scrollTimer = 0;
    let isScrolling = false;
    track.addEventListener('scroll', () => {
      if (!isScrolling) {
        isScrolling = true;
        videos.forEach((v) => v && !v.paused && v.pause());
      }
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const idx = Math.max(0, Math.min(slides.length - 1, currentIndex()));
        if (counter) counter.textContent = String(idx + 1);
        if (prevBtn) prevBtn.disabled = idx === 0;
        if (nextBtn) nextBtn.disabled = idx === slides.length - 1;
      });
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => {
        isScrolling = false;
        update();
      }, 140);
    });
    window.addEventListener('resize', update);

    // Drag-to-scroll on pointer devices. Snap is disabled mid-drag (via the
    // .is-dragging class) so the track tracks the pointer 1:1; on release we
    // snap to the nearest slide.
    let isDown = false;
    let dragging = false;
    let startX = 0;
    let startScroll = 0;
    track.addEventListener('pointerdown', (e) => {
      if (e.pointerType === 'touch') return;
      isDown = true;
      dragging = false;
      startX = e.clientX;
      startScroll = track.scrollLeft;
    });
    track.addEventListener('pointermove', (e) => {
      if (!isDown) return;
      const dx = e.clientX - startX;
      // Only commit to a drag once the pointer clearly moves — keeps plain
      // clicks (and any future links inside a slide) working.
      if (!dragging && Math.abs(dx) < 4) return;
      if (!dragging) {
        dragging = true;
        track.classList.add('is-dragging');
        track.setPointerCapture(e.pointerId);
      }
      e.preventDefault();
      track.scrollLeft = startScroll - dx;
    });
    const endDrag = (e) => {
      if (!isDown) return;
      isDown = false;
      if (dragging) {
        dragging = false;
        track.classList.remove('is-dragging');
        try { track.releasePointerCapture(e.pointerId); } catch (_) {}
        goTo(currentIndex());
      }
    };
    track.addEventListener('pointerup', endDrag);
    track.addEventListener('pointercancel', endDrag);

    // Mouse-wheel support: a mostly-vertical wheel over the carousel steps one
    // slide at a time (via goTo, so it lands exactly on a snap point rather than
    // fighting the mandatory snap). At the first/last slide the wheel passes
    // through untouched, so the page scrolls on past — the carousel never traps
    // the page. Horizontal wheel/trackpad swipes fall through to native scroll.
    let wheelLock = false;
    track.addEventListener('wheel', (e) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return; // horizontal → native
      const idx = currentIndex();
      const goingNext = e.deltaY > 0;
      if ((goingNext && idx >= slides.length - 1) || (!goingNext && idx <= 0)) return;
      e.preventDefault();
      e.stopPropagation(); // keep the page's smooth-scroll from also reacting
      if (wheelLock) return;
      wheelLock = true;
      goTo(idx + (goingNext ? 1 : -1));
      setTimeout(() => { wheelLock = false; }, 450);
    }, { passive: false });

    update();
  };

  const initTypewriter = () => {
    const typer = document.querySelector('.typewriter');
    if (!typer) return;
    const textEl = typer.querySelector('.typewriter__text');
    if (!textEl) return;

    const words = (typer.dataset.words || '')
      .split(',')
      .map((w) => w.trim())
      .filter(Boolean);
    if (!words.length) return;

    const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      textEl.textContent = words[0];
      return;
    }

    const TYPE_MS = 60;
    const TYPE_JITTER = 35;
    const DELETE_MS = 30;
    const DELETE_JITTER = 15;
    const HOLD_MS = 1300;
    const HOLD_JITTER = 350;
    const GAP_MS = 280;
    const jitter = (base, range) => base + Math.random() * range;

    let wordIdx = 0;
    let charCount = 0;
    let phase = 'typing';

    const tick = () => {
      const word = words[wordIdx];
      if (phase === 'typing') {
        charCount++;
        textEl.textContent = word.slice(0, charCount);
        if (charCount >= word.length) {
          phase = 'holding';
          setTimeout(tick, jitter(HOLD_MS, HOLD_JITTER));
        } else {
          setTimeout(tick, jitter(TYPE_MS, TYPE_JITTER));
        }
        return;
      }
      if (phase === 'holding') {
        phase = 'deleting';
        setTimeout(tick, jitter(DELETE_MS, DELETE_JITTER));
        return;
      }
      if (phase === 'deleting') {
        charCount--;
        textEl.textContent = word.slice(0, Math.max(0, charCount));
        if (charCount <= 0) {
          phase = 'gap';
          wordIdx = (wordIdx + 1) % words.length;
          setTimeout(tick, GAP_MS);
        } else {
          setTimeout(tick, jitter(DELETE_MS, DELETE_JITTER));
        }
        return;
      }
      if (phase === 'gap') {
        phase = 'typing';
        tick();
      }
    };

    textEl.textContent = '';
    tick();
  };

  // Count-up for the NUMBERS section. Each [data-count] animates from 0 to its
  // target the first time it scrolls into view. The trailing .unit span (e.g.
  // the "+" in "240+") is preserved throughout.
  const initCountUp = () => {
    const els = document.querySelectorAll('[data-count]');
    if (!els.length) return;

    const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const run = (el) => {
      const target = parseInt(el.dataset.count, 10);
      if (isNaN(target)) return;
      const unitEl = el.querySelector('.unit');
      const unitHTML = unitEl ? unitEl.outerHTML : '';
      const set = (n) => { el.innerHTML = String(n) + unitHTML; };

      if (reduced) {
        set(target);
        return;
      }

      const DURATION = 1600;
      const start = performance.now();
      const ease = (t) => 1 - Math.pow(1 - t, 3); // easeOutCubic
      const frame = (now) => {
        const p = Math.min(1, (now - start) / DURATION);
        set(Math.round(ease(p) * target));
        if (p < 1) requestAnimationFrame(frame);
      };
      set(0);
      requestAnimationFrame(frame);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            run(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    els.forEach((el) => observer.observe(el));
  };

  // Scroll-driven theme for the "light zone" (audience → numbers → visit-lab →
  // teaser). The site cross-fades from the dark theme to white as this band
  // scrolls through view; .is-light is toggled on the whole .light-zone so the
  // audience section flips in step, and everything keys off CSS variables.
  //
  // We flip the theme when an imaginary trigger line — sitting LIGHT_TRIGGER
  // viewports ABOVE the viewport top — falls inside the band. Because the
  // numbers section is taller than the viewport, keying off its top fired the
  // fade far too early, so the line sits above the fold: the flip lands once
  // you've scrolled the numbers section up to roughly its centre, as the 2030
  // row comes into reach. Bigger LIGHT_TRIGGER = line higher up = flip later.
  //
  // We read the band's position synchronously in a rAF (driven by the scroll
  // event, which the smooth-scroll loop's own scrollTo also fires) rather than
  // via IntersectionObserver: IO batches its callbacks asynchronously, so during
  // a fast momentum fling the toggle landed a frame or two late and you'd catch
  // a brief flash of the wrong theme. The rect read is one cheap measurement per
  // frame, throttled to a single rAF, and the class only flips when the state
  // actually changes — so the CSS cross-fade still runs at most twice.
  const LIGHT_TRIGGER = 0.8; // viewports above the top edge; bigger = flip later
  const initLightZone = () => {
    const zone = document.querySelector('.light-zone');
    const band = document.querySelector('.light-zone-band') || zone;
    if (!zone) return;

    let isLight = false;
    let queued = false;

    const update = () => {
      queued = false;
      const line = -LIGHT_TRIGGER * window.innerHeight;
      const r = band.getBoundingClientRect();
      const shouldLight = r.top <= line && r.bottom >= line;
      if (shouldLight !== isLight) {
        isLight = shouldLight;
        zone.classList.toggle('is-light', isLight);
      }
    };

    const onScroll = () => {
      if (!queued) {
        queued = true;
        requestAnimationFrame(update);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    update();
  };

  // Smooth, momentum-style scrolling ("Lenis-lite"). Each frame we ease the
  // REAL window scroll position toward a target instead of letting the wheel
  // snap it — that's the gliding/inertia feel. Because it drives the real
  // scroll (window.scrollTo) rather than transforming the page, position:sticky
  // (journey), every IntersectionObserver effect, and the fixed nav/drawer all
  // keep working untouched.
  //
  // Tuning: EASE is the glide — lower = floatier/longer, higher = snappier.
  // WHEEL_MULT scales how far one wheel notch throws you.
  const initSmoothScroll = () => {
    const mq = (q) => window.matchMedia && window.matchMedia(q).matches;
    // Touch screens already have native momentum (and don't fire wheel), and
    // reduced-motion users opt out entirely.
    if (mq('(prefers-reduced-motion: reduce)') || !mq('(pointer: fine)')) return;

    // Apple trackpads/Magic Mouse carry their own momentum, so a soft lerp on top
    // of that felt laggy/slow. Use a snappier ease on Apple so it stays responsive;
    // Windows mouse wheels (no native momentum) keep the floatier glide.
    const isApple = /Mac|iPhone|iPad|iPod/i.test(navigator.platform || navigator.userAgent || '');
    const EASE = isApple ? 0.2 : 0.1; // 0–1 lerp factor per frame (higher = snappier)
    const WHEEL_MULT = 0.9;           // scale wheel delta — <1 = less travel per notch

    let targetY = window.scrollY;
    let currentY = targetY;
    let animating = false;

    const maxScroll = () =>
      Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    const clamp = (v) => Math.max(0, Math.min(v, maxScroll()));

    const tick = () => {
      currentY += (targetY - currentY) * EASE;
      if (Math.abs(targetY - currentY) < 0.5) {
        currentY = targetY;
        window.scrollTo(0, currentY);
        animating = false;
        return;
      }
      window.scrollTo(0, currentY);
      requestAnimationFrame(tick);
    };

    const start = () => {
      if (!animating) {
        animating = true;
        requestAnimationFrame(tick);
      }
    };

    // Don't hijack wheel inside internal scrollers (drawer, modal, menus) that
    // scroll vertically on their own — let their native scroll/containment run.
    // The carousel is intentionally NOT here: it only scrolls horizontally, and
    // horizontal-intent wheel already bails out above. Excluding it would hand
    // vertical scroll back to native mid-glide, so the eased page scroll and the
    // native scroll fight each other right over the carousel — the jump you feel.
    const isProtected = (el) =>
      !!(el && el.closest &&
        el.closest('.cta-popup, .offer-modal, .mobile-menu, .nav-dropdown, .lang-switch__menu'));
    const bodyLocked = () => document.body.style.overflow === 'hidden';

    window.addEventListener('wheel', (e) => {
      if (e.ctrlKey) return;                              // pinch-zoom
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return; // horizontal intent
      if (bodyLocked() || isProtected(e.target)) return;

      let delta = e.deltaY;
      if (e.deltaMode === 1) delta *= 16;                 // lines → px
      else if (e.deltaMode === 2) delta *= window.innerHeight; // pages → px

      // Starting a fresh burst: resync to the live position so scrollbar drags
      // or keyboard scrolls in between aren't fought.
      if (!animating) {
        currentY = window.scrollY;
        targetY = window.scrollY;
      }
      targetY = clamp(targetY + delta * WHEEL_MULT);
      e.preventDefault();
      start();
    }, { passive: false });

    // While idle, keep the target honest if the page is moved by other means
    // (scrollbar drag, keyboard, anchor focus).
    window.addEventListener('scroll', () => {
      if (!animating) {
        currentY = window.scrollY;
        targetY = window.scrollY;
      }
    }, { passive: true });

    // In-page anchor jumps glide with the same easing instead of snapping.
    document.addEventListener('click', (e) => {
      const link = e.target.closest && e.target.closest('a[href^="#"]');
      if (!link) return;
      const hash = link.getAttribute('href');
      if (!hash || hash === '#') return;
      const dest = document.getElementById(hash.slice(1));
      if (!dest) return;
      e.preventDefault();
      currentY = window.scrollY;
      targetY = clamp(dest.getBoundingClientRect().top + window.scrollY);
      start();
    });
  };

  document.addEventListener('DOMContentLoaded', () => {
    initAccordions();
    initScrollReveal();
    initNavScroll();
    initNavDropdown();
    initLangSwitch();
    initMobileMenu();
    initLeadCTA();
    initOfferModal();
    initJourneyScroll();
    initLevelCarousel();
    initTypewriter();
    initCountUp();
    initLightZone();
    initSmoothScroll();
  });
})();
