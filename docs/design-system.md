# Design System

Source of truth: `css/variables.css`. Never hardcode values — always use tokens.

## Color Tokens

| Token | Value | Use |
|---|---|---|
| `--bg` | `#000000` | Primary background (pure black) |
| `--bg-2` | `#0a0a0a` | Slightly lifted backgrounds |
| `--line` | `rgba(255,255,255,0.10)` | Subtle hairline borders, dividers |
| `--line-strong` | `rgba(255,255,255,0.22)` | Stronger borders, focus states |
| `--text` | `#ffffff` | Primary text |
| `--text-dim` | `rgba(255,255,255,0.62)` | Secondary / body copy |
| `--text-faint` | `rgba(255,255,255,0.42)` | Tertiary / helper text |
| `--accent` | `#8B5CFF` | Purple — interactive states, icons, focus rings |
| `--accent-2` | `#B89BFF` | Lighter purple — hover text, subtle highlights |

**Footer exception:** Footer flips the color scheme — white background, dark text using inverted token values.

## Typography

| Role | Font | Size | Weight | Use |
|---|---|---|---|---|
| Display / H1 | Instrument Sans | `clamp(56px, 9vw, 140px)` | 600 | Hero, section headlines |
| H2 / H3 | Instrument Sans | `clamp(32px, 5vw, 72px)` | 600 | Sub-section heads |
| Eyebrow | Inter | 13px | 500 | Small caps labels above headlines, dot-prefixed |
| Body | Inter | 15px | 400 | Main copy; use `--text-dim` color |
| Small / Labels | Inter | 11–14px | 500 | Form labels, footer nav, metadata |

**Letter-spacing:** All display text uses `-0.02em` to `-0.04em` (tight, premium feel).
**Line heights:** Display 1.02–1.05 · Body 1.55 · Small 1.45–1.5

## Spacing

| Use | Desktop | Mobile |
|---|---|---|
| Section vertical padding | 140px | 88px |
| Container horizontal padding | 48px | 24px |
| Grid column gap (large) | 80px | — |
| Grid column gap (small) | 24px | 16px |
| Component inner gaps | 8–36px | 8–24px |

All spacing values are multiples of 8px.

## Grid

- `.grid-12` — 12-column CSS grid, auto flow
- `.container` — max-width 1440px, centered, with horizontal padding
- Responsive: 920px breakpoint switches most grids to single column

## Motion / Easing

```css
--ease: cubic-bezier(0.4, 0, 0.2, 1);  /* Material Design easing */
```

| Duration | Use |
|---|---|
| 200ms | Hover state transitions |
| 350ms | Accordion open/close |
| 400ms | Nav transitions |
| 900ms | Scroll-reveal animations |

Always pair with `prefers-reduced-motion` — use `opacity` fade only, no translate.

```css
@media (prefers-reduced-motion: reduce) {
  /* remove translateY, keep opacity only */
}
```

## Visual Language

- **Dark mode only** — deep blacks, pure white text, no grays
- **Restraint** — accent purple is used sparingly; most of the site is white-on-black
- **Premium / luxury tech** — minimal decoration, tight type, generous whitespace
- **No raster images** — all illustration is inline SVG; only the hero video is media
- **No drop shadows** — depth is created by borders (`--line`) and backdrop-blur
