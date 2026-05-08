# Page Sections

All sections are in `index.html`. Styles in `css/sections.css`. Single-page site — navigation is anchor-based, no router.

## Section Order & IDs

| Order | ID | Class | Purpose |
|---|---|---|---|
| 0 | — | `.nav` | Fixed top navigation bar |
| 1 | — | `.hero` | Full-bleed video hero |
| 2 | `#statement` | `.statement` | Value proposition statement |
| 3 | `#advantage` | `.advantage` | Why Aerotech (accordion) |
| 4 | `#programs` | `.programs` | 4 course tracks with side-nav |
| 5 | `#pillars` | `.pillars` | Learn / Build / Fly cards |
| 6 | `#audience` | `.audience` | Who We Teach (accordion) |
| 7 | `#numbers` | `.numbers` | Stats (4 large display numbers) |
| 8 | `#demo` | `.demo` | Visit / location section |
| 9 | `#teaser` | `.teaser` | Short centered statement |
| 10 | `#industries` | `.industries` | 3-col image grid (Defense, Mapping, Inspection) |
| 11 | — | `.footer` | Footer (inverted color scheme) |

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

## Advantage (`.advantage`)
- 2-column grid: SVG illustration (drone quadcopter schematic) | 4-item accordion
- Accordion items: school's 4 key differentiators
- Has `.reveal` class

## Programs (`.programs`)
- 4 full-width rows, each is a course track:
  1. Fundamentals
  2. Intermediate
  3. Advanced
  4. Professional
- Each row: left sticky side-nav rail + content area (alternating copy/visual layout)
- JS `initProgramsSideNav()` highlights active row on scroll
- This section is the content-heaviest; scroll takes time to traverse

## Pillars (`.pillars`)
- 3-column card grid: "Learn" / "Build" / "Fly"
- Each card: icon (inline SVG) + headline + short body
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
- 100vh, 3-column CSS grid
- Each cell is a full-height image (background-image)
- Hover: dark overlay fades in + text appears (pure CSS, no JS)
- Columns: Defense / Mapping / Inspection
- No `.reveal` — full-viewport, always visible

## Footer (`.footer`)
- **Inverted color scheme:** white background, dark text
- 5-column link grid + brand section
- Brand section: logo + tagline + social icons (inline SVG)
- Link groups: Programs / Company / Resources / Legal / Contact
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
