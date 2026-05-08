# Lead-Capture CTA — Plan

A scroll-triggered popup that invites visitors to leave a phone number or email so the Aerotech team can reach out. Visual language follows the Vantor / Raptor aesthetic the site already uses (deep black, hairline borders, mono-feel labels, corner-bracket framing).

> **Scope of this doc:** plan-only. No implementation yet. We agree on this, then wire it into the existing `index.html` / `css/components.css` / `js/main.js`.

---

## 1. Intent

| | |
|---|---|
| **Primary goal** | Capture warm leads (parents, students, B2B inquiries) without forcing them to scroll all the way to a contact section. |
| **Secondary goal** | Reinforce trust — the popup should feel like a deliberate, premium part of the page, not an ad. |
| **What success looks like** | User submits phone OR email → toast confirms → our team gets the lead in inbox / Telegram / Sheet. |
| **What it must NOT feel like** | A newsletter modal. No "Subscribe", no marketing copy. Tone is "Talk to a human." |

---

## 2. Trigger logic

| Rule | Value | Reason |
|---|---|---|
| Scroll threshold | After **40%** of page scrolled, OR **25 seconds** elapsed (whichever first) | Gives the hero + statement section room to land before interrupting. |
| Exit intent (desktop) | Mouse leaves viewport top → show immediately | High-intent moment, common pattern. |
| Frequency cap | Once per visitor per **7 days** (`localStorage` key `aerotech_cta_seen`) | Stops repeat-visitor fatigue. |
| Hard suppression | If user already submitted → never show again (`aerotech_cta_submitted=true`). | Obvious. |
| Manual dismiss | Closing → don't show again **this session**, but eligible after 7 days. | Respects the "no" without giving up forever. |
| Disabled on | `#contact` route, `?nocta=1` query param, screen height < 600px | Avoids covering the contact section / small viewports. |

---

## 3. Visual / layout spec

Inspired by Vantor's **"Request a Raptor demo"** card and the Raptor hero card — black surface, white hairline border, generous whitespace, eyebrow label, large quiet headline, single primary CTA.

### Form factor

- **Desktop / tablet (≥ 920px):** bottom-right card, **420px wide**, 32px from bottom-right corner. Slides in from below with 24px translateY + fade, ~420ms `--ease`.
- **Mobile (< 920px):** full-width sheet pinned to bottom, rounded top corners only, slides up from the bottom edge.

### Anatomy (top → bottom)

```
┌──────────────────────────────────────────────┐
│  ◯ AEROTECH                              ✕   │   ← eyebrow + close
│                                              │
│  Talk to our team.                           │   ← display headline (~28px)
│                                              │
│  Leave your number or email and we'll        │   ← sub copy (text-dim, 14px)
│  reach out within one working day.           │
│                                              │
│  ┌────────────────────────────────────────┐  │
│  │ +998 __ ___ __ __                      │  │   ← single input, mode toggles
│  └────────────────────────────────────────┘  │
│                                              │
│  ◦ Phone   ● Email                           │   ← tiny segmented toggle
│                                              │
│  ┌─ Get a callback ─┐                        │   ← btn-bracket (existing comp)
│  └──────────────────┘                        │
│                                              │
│  By submitting you agree to be contacted.    │   ← text-faint, 12px
└──────────────────────────────────────────────┘
```

### Visual tokens (reuse existing `variables.css`)

| Token | Use |
|---|---|
| `--bg` `#000` | Card background |
| `--line` | 1px hairline border around card |
| `--line-strong` | Input bottom border |
| `--text` | Headline + input value |
| `--text-dim` | Body copy |
| `--text-faint` | Legal microcopy |
| `--accent` `#8B5CFF` | Focus ring on input, hover state on bracket button |

### Motion

- **Enter:** `opacity 0 → 1`, `translateY(24px → 0)` over 420ms `--ease`. Backdrop fades to `rgba(0,0,0,0.4)` only on mobile sheet (desktop card has no backdrop — non-blocking).
- **Exit:** reverse, 220ms.
- **Submit success:** card collapses to a small confirmation state (checkmark + "We've got it. Talk soon.") for 2.5s, then dismiss.

### Copy options (pick one)

| Variant | Headline | Sub |
|---|---|---|
| **A — direct** | Talk to our team. | Leave your number or email and we'll reach out within one working day. |
| **B — student-voice** | Curious about flying drones? | Drop your contact — we'll show you the lab. |
| **C — parent-voice** | Questions about the program? | Leave a number, we'll call back. No spam. |

> Recommendation: **A** for the English locale, with localized variants in the i18n table later (UZ / RU already in the nav).

---

## 4. Form behavior

### Fields

- **Single input** that re-validates based on the mode toggle (Phone / Email).
- Default mode = **Phone** (Uzbek market, faster conversion than email).
- Phone validation: accept `+998XXXXXXXXX` or local `XXXXXXXXX`. Auto-prefix `+998` if user starts with `9`.
- Email validation: standard regex, trim, lowercase.

### States

| State | Visual |
|---|---|
| Idle | Input empty, button label "Get a callback" / "Email me" |
| Typing | Bottom border brightens to `--text` |
| Invalid (on blur) | Bottom border `#ff6b6b`, helper text below |
| Loading | Button shows spinner + "Sending…", input disabled |
| Success | Card collapses to confirmation panel (see Motion above) |
| Error | Inline error above button: "Couldn't send. Try again or write to hello@aerotech.uz" |

### Submit destination — **decision needed**

Pick one. The choice changes what we wire up:

1. **Web3Forms / Formspree** — zero-backend, drops payload into email. Fastest. **Recommended for now.**
2. **Telegram bot** — payload posted to a private group via bot token. Good for a small ops team.
3. **Google Sheets** (Apps Script webhook) — easy to share with non-technical staff.
4. **Custom endpoint** — proper backend later when we have one.

---

## 5. Accessibility

- Trap focus inside the popup while open; restore focus to the trigger element on close.
- `role="dialog"`, `aria-modal="true"` on mobile sheet only (desktop card is non-blocking → `role="region"` + `aria-label`).
- ESC closes. Close button has `aria-label="Dismiss"`.
- Input has visible label (visually hidden but present for screen readers).
- Honors `prefers-reduced-motion` → no slide animation, just fade.

---

## 6. Files to touch (when we implement)

| File | Change |
|---|---|
| `index.html` | Append CTA markup just before `</body>`. ~30 lines. |
| `css/components.css` | Add `.cta-popup`, `.cta-popup__*` block. ~120 lines. |
| `css/variables.css` | No new tokens — reuse existing. |
| `js/main.js` | Add `initLeadCTA()` — trigger logic, validation, submit, localStorage flags. ~100 lines. |
| (new) `js/lead-capture.js` *(optional)* | If we'd rather isolate it. Decide at implementation. |

No new dependencies. Pure HTML/CSS/JS, matching the project's current stack.

---

## 7. Assets to prepare

- ✕ close icon — inline SVG, already styled like the search icon in the nav. **No download needed.**
- Optional: small Aerotech mark in the eyebrow row — reuse the SVG from `.logo-mark` in the nav.
- No images, no illustrations. Vantor's restraint is the point.

---

## 8. Open questions for you

Before I write code, please confirm:

1. **Submit destination** — which of the four options in §4? (My pick: Web3Forms.)
2. **Copy variant** — A, B, or C from §3? (My pick: A.)
3. **Default mode** — Phone or Email? (My pick: Phone.)
4. **Locales** — ship English-only first, or all three (EN/UZ/RU) at launch?
5. **Trigger** — happy with 40% scroll OR 25s? Or do you want it to wait longer (e.g. 60% / 40s)?
6. **Position on desktop** — bottom-right card, or center modal? (My pick: bottom-right, less aggressive.)

Answer those and I'll implement against `index.html` / `components.css` / `main.js` in one pass.
