# AI Image Prompts — Industries Section

Three portrait images for the **"Delivering results for the world's toughest missions"** section ([index.html:687-810](../index.html#L687-L810)). These replace the current abstract SVG illustrations in `.industry-visual`.

---

## Target specs

| Property | Value |
|---|---|
| Aspect ratio | **4:7 portrait** (matches `viewBox="0 0 400 700"`) |
| Final render size | **1200 × 2100 px** (3× retina), export **800 × 1400 px** for web |
| Format | JPEG quality 82 (or AVIF for `<picture>` upgrade later) |
| File names | `industries-defense.jpg`, `industries-mapping.jpg`, `industries-inspection.jpg` |
| Save to | `assets/images/industries/` |

> Midjourney flag: `--ar 4:7` &nbsp;·&nbsp; Flux/SDXL: set width 768, height 1344 &nbsp;·&nbsp; DALL·E 3: request "tall portrait, 4:7 ratio" in prompt.

---

## House style — paste this prefix into every prompt

> **Cinematic editorial photography, dark moody atmosphere, ultra-realistic, shot on Sony A7R V with Zeiss 35mm prime, shallow depth of field, volumetric haze, dramatic side-rim lighting, deep blacks (#000) with soft violet-purple highlights (#8B5CFF / #B89BFF), film grain, premium aerospace brand aesthetic à la Anduril / SpaceX / Skydio, muted color palette, high contrast, 8K, sharp foreground subject, blurred environmental backdrop, vertical composition with breathing room at top and bottom for text overlay.**

**Universal negative prompt** (Flux/SDXL/Stable Diffusion — append at the end or use `--no` in MJ):
> `--no text, watermark, logo, brand names, cartoon, illustration, low-poly, plastic look, oversaturated, neon, rainbow, stock-photo cliché, smiling models, instagram filter, fisheye distortion, lens flare overload, multiple drones in frame, toy drone, RC hobbyist look, blurry subject`

---

## 1. Defense & Security

**Subject:** a tactical operator in matte-black flight suit and tinted glasses crouched at dusk, hands on a rugged ground control station; matte-black quadcopter hovering low ~3m away, propellers in subtle motion blur, status LEDs glowing cool violet. Border-zone landscape: distant ridgeline, low fog, recon antenna silhouette.

**Background tint hint** (replaces current `#080f18`): cold blue-black, midnight steel.

### Midjourney v6/v7 prompt
```
Cinematic editorial photograph of a single tactical drone operator at blue-hour twilight, matte-black flight suit, tinted ballistic eyewear, crouched behind a rugged tablet-style ground control station with antenna mast, hands on controls, focused expression, matte-black tactical quadcopter hovering 3 meters away in mid-frame with motion-blurred propellers and faint violet status LEDs, low ground fog, distant mountain ridgeline, recon tower silhouette far background, cold blue-black palette #080f18, subtle violet rim light #8B5CFF on operator's shoulder and drone, volumetric haze, shallow DOF f/2.0, 35mm prime, dramatic side-key lighting from single distant source, premium aerospace brand aesthetic, vertical composition, negative space top and bottom, ultra-realistic, 8K, film grain --ar 4:7 --style raw --v 7 --no text, watermark, logo, brand names, multiple drones, toy drone, smiling, oversaturated
```

### Flux / SDXL prompt
```
A cinematic photograph at twilight: one tactical drone operator in matte-black flight suit and tinted glasses, crouched behind a rugged ground control unit, focused, gloved hands on controls. A matte-black tactical quadcopter hovers low 3m away, propellers blurred, faint violet LEDs (#8B5CFF). Cold blue-black palette anchored at #080f18 with deep blacks. Low ground fog, distant ridgeline and recon tower silhouette. Single dramatic side-rim light source, volumetric haze, shallow DOF, 35mm lens, film grain. Editorial aerospace brand aesthetic. Tall vertical composition (4:7), generous negative space top and bottom, sharp on subject, painterly soft background.
```

### DALL·E 3 prompt
```
A tall vertical photograph (4:7 ratio), cinematic and editorial in style. Subject: a single tactical drone operator at blue-hour twilight, wearing a matte-black flight suit and tinted ballistic eyewear, crouched behind a rugged ground control station with a small antenna. Hands on the controls, expression focused. A matte-black tactical quadcopter hovers about three meters away with motion-blurred propellers and faint violet LED indicators. The environment is a foggy border landscape with a distant mountain ridge and a far-away recon tower silhouette. Color palette: cold blue-black (around #080f18) with subtle violet-purple rim light (around #8B5CFF) on the operator's shoulder. Volumetric haze, dramatic side lighting from a single distant source, shallow depth of field, 35mm lens look, fine film grain. Premium aerospace brand mood like Anduril or Skydio. Generous empty space at the top and bottom for headline text overlay. No text in the image, no logos, no multiple drones.
```

### Variations to try
- **A — Operator hero:** as above, operator dominant, drone mid-distance.
- **B — Drone hero:** swap depth — drone fills lower-third foreground in sharp focus, operator out-of-focus in background.
- **C — Over-shoulder:** behind-operator angle, GCS screen glowing violet, drone receding into fog.

Pick A unless you want to lead with hardware.

---

## 2. Aerial Mapping & Survey

**Subject:** white-and-grey fixed-wing or VTOL survey drone climbing over agricultural patchwork at golden hour transitioning to dusk; below, a fieldworker with a tablet showing a faint violet map grid; geometric field boundaries, dirt roads, irrigation lines reading like a topographic plan from above.

**Background tint hint** (replaces `#07100a`): deep green-black, agricultural earth.

### Midjourney v6/v7 prompt
```
Cinematic editorial photograph from a low aerial perspective, a sleek white-and-grey survey drone (fixed-wing or VTOL hybrid) climbing through soft golden-hour haze over a vast patchwork of agricultural fields and orchards, geometric field boundaries reading like a topographic plan, dirt access roads and irrigation lines, single small figure of a surveyor far below holding a rugged tablet that emits faint violet map-grid glow #8B5CFF, deep green-black palette anchored at #07100a, warm amber sunset rim light on drone fuselage, atmospheric haze, sharp focus on drone in upper-third, painterly soft fields below, shallow DOF, 35mm prime, premium aerospace brand aesthetic, vertical composition, breathing room top and bottom, ultra-realistic, 8K, subtle film grain --ar 4:7 --style raw --v 7 --no text, watermark, logo, brand names, cartoon, oversaturated, instagram filter, multiple drones, lens flare overload
```

### Flux / SDXL prompt
```
A cinematic editorial photograph: a sleek white-and-grey survey drone (fixed-wing VTOL hybrid) climbing through golden-hour haze over an enormous patchwork of agricultural fields. Below, geometric field boundaries, irrigation lines, and a single small surveyor figure holding a rugged tablet that emits a faint violet map-grid light (#8B5CFF). Deep green-black ground palette around #07100a, warm amber rim light on the drone fuselage from a low sunset. Atmospheric haze, shallow DOF, 35mm lens, film grain. Tall 4:7 vertical, drone in upper third sharp, fields painterly below. Premium aerospace brand mood. Negative space top and bottom for headline overlay.
```

### DALL·E 3 prompt
```
A tall vertical photograph (4:7 ratio), cinematic editorial style. Low aerial perspective showing a sleek white-and-grey survey drone (fixed-wing or VTOL hybrid) climbing through soft golden-hour haze. Below the drone is a vast patchwork of agricultural fields and orchards, with geometric field boundaries, dirt access roads, and irrigation lines that read like a topographic plan. A single small figure of a surveyor stands far below holding a rugged tablet that emits a faint violet map-grid glow. Color palette: deep green-black ground (around #07100a) with warm amber sunset rim light on the drone fuselage and a subtle violet accent (around #8B5CFF) from the tablet. Atmospheric haze, shallow depth of field, 35mm lens look, fine film grain. Premium aerospace mood. Sharp focus on the drone in the upper third, painterly soft fields below. Generous empty space at top and bottom. No text, no logos, no multiple drones.
```

### Variations to try
- **A — Drone hero from below** (default, recommended).
- **B — Topographic from above:** straight-down god-view of field patterns with the drone shadow crossing them; very graphic, less human.
- **C — Surveyor hero:** ground-level shot of surveyor with tablet, drone small in sky above — humanizes the service.

A reads strongest in a 3-column row.

---

## 3. Infrastructure Inspection

**Subject:** an industrial inspection drone hovering close to a high-voltage transmission tower at dusk, gimbal camera pointed at insulators, faint violet LiDAR/laser scan lines projecting onto the steel lattice; in distance a pipeline corridor stretches to the horizon, low warm tungsten light.

**Background tint hint** (replaces `#10100a`): warm-black / deep tungsten umber.

### Midjourney v6/v7 prompt
```
Cinematic editorial photograph at dusk, an industrial inspection quadcopter hovering 4 meters from the upper section of a high-voltage transmission tower, gimbal camera tilted upward toward ceramic insulators, faint violet laser-scan grid lines (#8B5CFF) projected from the drone onto the steel lattice, propellers in motion blur, weathered steel structure detailed and sharp, distant pipeline corridor and substation receding to horizon under low warm tungsten light, deep warm-black palette anchored at #10100a, subtle violet accent from scan lines and drone LEDs, atmospheric haze, dramatic backlight from setting sun behind tower silhouette, shallow DOF, 35mm prime, premium aerospace brand aesthetic, vertical composition, drone and tower segment in upper two-thirds, breathing room top and bottom, ultra-realistic, 8K, fine film grain --ar 4:7 --style raw --v 7 --no text, watermark, logo, brand names, cartoon, oversaturated, neon, multiple drones, toy drone
```

### Flux / SDXL prompt
```
A cinematic editorial photograph at dusk: an industrial inspection quadcopter hovering 4 meters from the upper section of a high-voltage transmission tower. The drone's gimbal camera is tilted toward ceramic insulators; faint violet laser-scan grid lines (#8B5CFF) project from the drone onto the steel lattice. Propellers motion-blurred. In the distance a pipeline corridor and substation recede to the horizon under low warm tungsten light. Deep warm-black palette around #10100a with violet accent from the scan lines. Backlight from a setting sun silhouettes the tower. Atmospheric haze, shallow DOF, 35mm lens, film grain. Tall 4:7 vertical, drone and tower segment in upper two-thirds, painterly distance below. Premium aerospace brand mood. Empty space top and bottom for headline.
```

### DALL·E 3 prompt
```
A tall vertical photograph (4:7 ratio), cinematic editorial style. Subject: an industrial inspection quadcopter hovering about four meters from the upper section of a high-voltage transmission tower at dusk. The drone's gimbal camera is tilted upward toward the tower's ceramic insulators, and faint violet laser-scan grid lines project from the drone onto the steel lattice. The propellers are motion-blurred. In the far distance, a pipeline corridor and substation recede toward the horizon under low warm tungsten light. Color palette: deep warm-black (around #10100a) with subtle violet accents (around #8B5CFF) from the scan lines and drone indicators. The setting sun behind the tower creates dramatic backlight and silhouette. Atmospheric haze, shallow depth of field, 35mm lens look, fine film grain. Premium aerospace mood. The drone and tower segment occupy the upper two-thirds, with painterly distance below. Generous empty space at top and bottom for a headline. No text, no logos, no multiple drones.
```

### Variations to try
- **A — Tower close-up** (default, recommended — most graphic).
- **B — Pipeline corridor:** drone tracking a pipeline that vanishes to vanishing point; strong leading line.
- **C — Wind turbine blade:** swap subject — drone inspecting a turbine blade tip; cleaner shape, lighter brand read.

A is the strongest for "toughest missions" copy.

---

## Cross-image consistency checklist

Before accepting a set, verify the three images read as one family:

- [ ] All three are clearly **4:7 portrait** with empty top **and** bottom (the white industry label and hover panel sit on top in the page).
- [ ] All three share the same **black-base / violet-accent** palette — no warm orange should dominate image 3 if it kills the cohesion.
- [ ] Lighting direction is **consistent enough** — pick all dusk OR all golden hour, not mixed midday.
- [ ] **One drone per image**, no human faces in close-up (we want product, not portraiture).
- [ ] Subjects sit in roughly the **same vertical band** (around the upper-middle third) so the row scans evenly.
- [ ] Grain and contrast match — re-grade in Lightroom/Photoshop if one is noticeably crisper or softer than the others.

---

## Recommended workflow

1. Generate **4 variants per image** with the Midjourney prompt first (it has the strongest brand/cinematic look).
2. If a hero is close-but-not-quite, run **Flux Pro** with `image_prompt_strength: 0.6` and the original as reference for refinement.
3. Upscale to **2400 × 4200** (e.g., MJ `--upscale` or Topaz Gigapixel).
4. **Color match in Lightroom:** apply the same preset to all three — pull blacks to true black, lift shadow detail slightly, push vibrance on violet only via HSL.
5. Export at **800 × 1400** JPEG q82, plus an `@2x` at **1600 × 2800** for retina.
6. Replace each `<div class="industry-visual">` SVG block with `<img src="assets/images/industries/industries-defense.jpg" srcset="…@2x.jpg 2x" alt="…" loading="lazy">`. Keep the `industry-visual` wrapper for layout.

---

## If you want a quick A/B

Generate one image per industry with the **operator/human-led** variant (Defense A, Mapping C, Inspection — add a worker holding a tablet) and one set with the **hardware-led** variant (Defense B, Mapping A, Inspection A). Drop both into the page and judge in context — hardware-led usually wins for B2B credibility, human-led wins for emotional pull on a school landing page. You may end up mixing.
