# Page Sections

All sections are in `index.html`. Styles in `css/sections.css`. Single-page site — navigation is anchor-based, no router.

## Section Order & IDs

| Order | ID | Class | Purpose |
|---|---|---|---|
| 0 | — | `.nav` | Fixed top navigation bar |
| 1 | — | `.hero` | Full-bleed video hero |
| 2 | — | `.statement` | Value proposition statement |
| 5 | `#advantage` | `.advantage` | Why Aerotech (accordion) |
| 6 | `#journey` | `.journey` | Sticky-scroll video + text steps |
| 7 | `#audience` | `.audience` | Who We Teach (accordion) |
| 8 | — | `.numbers` | Stats (4 large display numbers) |
| 9 | `#demo` | `.demo` | Visit / location section |
| 10 | — | `.teaser` | Short centered statement |
| 11 | `#industries` | `.industries` | 4-col hover image grid + Drone Services CTA → `/services/` |
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

> **Note:** The old `.ds-teaser` hub sections (Drone School / Drone Services) were
> removed. The Drone Services content was merged into the `.industries` section below,
> which now carries the intro copy, working `Learn More` links, and the
> "Explore Drone Services" CTA → `/services/`.

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
- Header (`.container`): eyebrow + H2 + `.industries-intro` lead paragraph
- Full-bleed grid: 4 columns (`.industry-col`), wraps 2×2 ≤1100px, single column ≤920px
- Each cell is a full-height `<img>`; hover fades in a dark overlay + copy + `Learn More` link (pure CSS, no JS)
- Columns: Aerial Mapping / Infrastructure Inspection / Subsurface Survey / Custom Builds & R&D
- `Learn More` links → matching `/services/#...` anchors (Subsurface → `/services/` overview)
- Closes with `.industries-cta`: "Explore Drone Services" `.btn-bracket` → `/services/`
- Has `.reveal` class

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
