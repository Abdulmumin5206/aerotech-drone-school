# Aerotech Drone School — Project Guide

## What this is
A single-page marketing/landing site for a drone school (Uzbekistan). Zero frameworks, zero build tools — pure HTML + CSS + vanilla JS. Lives in one `index.html`. Deployed to GitHub Pages.

## File map
```
index.html          — The entire site (~1050 lines)
css/
  variables.css     — ALL design tokens (colors, fonts, easing, spacing)
  base.css          — Reset + typography primitives
  layout.css        — Container, grid, nav, footer shells
  components.css    — Buttons, accordions, modals, CTA drawer
  sections.css      — Per-section styles (hero, programs, audience, etc.)
js/main.js          — All JS behavior (~574 lines, IIFE pattern)
assets/videos/      — Hero background video (1080p MP4)
docs/               — Design system docs (read these before building anything new)
```

## Must-read before any UI work
- [docs/design-system.md](docs/design-system.md) — tokens, typography, spacing, motion
- [docs/components.md](docs/components.md) — button patterns, accordions, nav, modals
- [docs/sections.md](docs/sections.md) — every page section explained

## Stack
- HTML5 (semantic, ARIA attributes, inline SVG icons)
- CSS3 with custom properties — no Tailwind, no framework
- Vanilla ES6+ JS — no React, no Vue, no jQuery
- Google Fonts: **Instrument Sans** (display) + **Inter** (body)
- No package.json, no bundler, no build step

## Responsive breakpoints
- **920px** — main desktop/mobile split
- **720px** — tighter mobile adjustments

## Key rules
1. All values come from `css/variables.css` — never hardcode colors or sizes
2. Primary CTA = `.btn-bracket`, secondary = `.btn-link`
3. New sections need `.reveal` class — JS handles fade+slide animation automatically
4. Hover states always shift: text `--text` → `--accent-2`, borders/icons → `--accent`
5. Container max-width 1440px, padding 48px desktop / 24px mobile
6. Section vertical padding: 140px desktop / 88px mobile
7. All transitions use `var(--ease)` cubic-bezier with 200–900ms durations
8. Always add `prefers-reduced-motion` fallbacks for animations
9. Language switcher is UI-only (no i18n backend wired up)
10. Lead capture drawer + offer modal share frequency caps via localStorage — coordinate them

## JS pattern
All JS is one IIFE in `js/main.js`. Add new behavior as a named function called at bottom of the IIFE. Use IntersectionObserver for scroll effects, not scroll event listeners.
