# Page Sections

All sections are in `index.html`. Styles in `css/sections.css`. Single-page site — navigation is anchor-based, no router.

## Section Order & IDs

| Order | ID | Class | Purpose |
|---|---|---|---|
| 0 | — | `.nav` | Fixed top navigation bar |
| 1 | — | `.hero` | Full-bleed video hero |
| 2 | — | `.statement` | Value proposition statement |
| 3 | — | `.ds-teaser` | Drone School hub — 3 cards → `/drone-school/` |
| 4 | — | `.ds-teaser` | Drone Services hub — 3 cards → `/services/` |
| 5 | `#advantage` | `.advantage` | Why Aerotech (accordion) |
| 6 | `#journey` | `.journey` | Sticky-scroll video + text steps |
| 7 | `#audience` | `.audience` | Who We Teach (accordion) |
| 8 | — | `.numbers` | Stats (4 large display numbers) |
| 9 | `#demo` | `.demo` | Visit / location section |
| 10 | — | `.teaser` | Short centered statement |
| 11 | `#industries` | `.industries` | 2-col image grid (Mapping, Inspection) |
| 12 | — | `.footer` | Footer (inverted color scheme) |

---

## Hero (`.hero`)
- Height: 100vh (min 720px, max 920px)
- Background: autoplaying, muted, looped 1080p MP4 video
- Layout: copy on left side (H1 + eyebrow + 2 CTA buttons)
- H1: "From code to flight." (display size, Instrument Sans 600)
- No section ID — it's the top of the page

## Statement (`.statement`)
- Centered single-column layout
- Large H2 + short subtext paragraph + one `.btn-bracket`
- Padding: 140px top/bottom (desktop)
- Has `.reveal` class

## Drone School Teaser (`.ds-teaser`)
- 3 cards in a row + headline + body + bottom CTA → `/drone-school/`
- First of two sibling hub sections (school + services)
- Has `.reveal` class

## Drone Services Teaser (`.ds-teaser`)
- Identical structure to Drone School teaser, content swap
- 3 cards: Aerial Mapping / Infrastructure Inspection / Custom Builds → `/services/`
- Has `.reveal` class

## Advantage (`.advantage`)
- 2-column grid: SVG illustration (drone quadcopter schematic) | 4-item accordion
- Accordion items: school's 4 key differentiators
- Has `.reveal` class

## Audience (`.audience`)
- 2-column: photo (left) + accordion (right)
- Accordion: 4 audience types — Kids / Teens / University Students / Professionals
- Each item has a brief description + course suggestions
- Has `.reveal` class

## Numbers (`.numbers`)
- 4-column grid of large display stats
- Format: large number (`--accent` color) + label below
- Example: "2 000+" graduates, "97%" completion rate
- Has `.reveal` class

## Demo (`.demo`)
- 2-column: copy + large photo
- Min-height 600px
- Purpose: invite to visit the physical location
- Has `.reveal` class

## Teaser (`.teaser`)
- Centered, 100px padding
- One short statement (italic or styled differently)
- Transition section between Demo and Industries

## Industries (`.industries`)
- 100vh, 2-column CSS grid
- Each cell is a full-height image (background-image)
- Hover: dark overlay fades in + text appears (pure CSS, no JS)
- Columns: Mapping / Inspection
- No `.reveal` — full-viewport, always visible

## Footer (`.footer`)
- **Inverted color scheme:** white background, dark text
- 5-column link grid + brand section
- Brand section: logo + tagline + social icons (inline SVG)
- Link groups: Drone School / Who We Teach / Industries / Services / Connect
- Bottom bar: copyright + language switcher

---

## Adding a New Section

1. Add HTML to `index.html` in the correct order above
2. Give it an `id` and the `.reveal` class
3. Add anchor to nav links if it needs to be navigable
4. Style in `css/sections.css`
5. Padding: `140px` top/bottom desktop, `88px` mobile (use existing section as template)
6. Grid layout: use `.container` + `.grid-12` or custom grid
7. All values from `css/variables.css` tokens only
