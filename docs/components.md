# Components

All components live in `css/components.css`. JS behavior in `js/main.js`.

## Buttons

### `.btn-bracket` — Primary CTA
Corner-bracket border effect. Transparent background, fills on hover.

```html
<a href="#" class="btn-bracket">Start Learning</a>
```

- Default: transparent bg, `--text` color, corner brackets via `::before`/`::after`
- Hover: brackets animate to `--accent` color
- Use for: main CTAs ("Start Learning", "Download Syllabus", "Get in Touch")

### `.btn-link` — Secondary / Inline
Underline + arrow, no border box.

```html
<a href="#" class="btn-link">Read program details →</a>
```

- Default: `--text` color, `--line-strong` underline
- Hover: shifts to `--accent-2` text, `--accent` underline
- Use for: secondary actions, "Learn More", navigation links

---

## Accordions

### `.accordion` / `.acc-item` — Standard Accordion
Used in Advantage section (4 items about the school).

```html
<div class="accordion">
  <div class="acc-item">
    <button class="acc-trigger">Title</button>
    <div class="acc-body">Content</div>
  </div>
</div>
```

- Only one item open at a time (JS closes siblings)
- Open animation: `max-height` 0 → 280px over 350ms `--ease`
- Active trigger: color shifts to `--accent`

### `.aud-item` — Audience Accordion
Same behavior, used in Audience section (Kids / Teens / Students / Professionals).

---

## Navigation

### `.nav` — Top Bar
Fixed, 76px tall, full-width.

States:
- **Default (top of page):** transparent or black bg, `--text` links
- **`.nav--hidden`:** `translateY(-100%)` — slides off-screen when scrolling down past 85vh
- **`.nav--scrolled`:** white background, dark text — appears when scrolling up above 85vh

Contains:
- Logo mark (inline SVG)
- Anchor links (`#audience`, `#advantage`, `#demo`, `#industries`)
- Language switcher pill (EN / UZ / RU) — UI only, no backend
- Search icon + hamburger icon (mobile)

### `.mobile-menu` — Full-screen Drawer
Triggered at < 920px. Covers entire viewport. Opens/closes on hamburger icon. ESC key closes.

---

## Lead Capture CTA Drawer

### `.cta-trigger` — Right-edge Tab
Fixed position, vertically centered on right edge. 46px wide, rotated "CONTACT" label.

- Hidden with `.is-hidden` class
- Auto-opens drawer on click

### `.cta-popup` — Side Drawer Panel
480px wide on desktop, full-width on mobile. Slides in from right.

Form features:
- Toggle: Phone mode (`+998XXXXXXXXX` or 9-digit local) / Email mode (standard regex)
- Single input + submit button
- Success state: checkmark + confirmation text
- Auto-opens after 40% scroll OR 25s elapsed (whichever first)
- Frequency cap: once per 3 days (localStorage key)

---

## Offer Modal

### `.offer-modal` — Center-screen Modal
Backdrop: `rgba(0,0,0,0.85)` + `backdrop-filter: blur(8px)`.

- Same phone-capture form as CTA drawer
- Auto-fires 5s after page load (also exit-intent on desktop)
- 1-day frequency cap (localStorage key)
- Never auto-fires if CTA drawer is visible
- Both modal and drawer coordinate: only one auto-triggers per session

---

## Scroll Reveal

Add `.reveal` class to any section or element. JS handles everything else.

```html
<section class="my-section reveal">...</section>
```

Animation: `opacity 0→1` + `translateY(24px→0)` over 900ms `--ease`.
Trigger: IntersectionObserver at 12% visibility threshold.

---

## Industries Grid

`.industries` — 2-column full-height image grid (100vh). Each cell: hover reveals overlay text. No JS needed — pure CSS `:hover` transitions.
