---
name: outfit-motion-studio
description: Makes on-brand motion graphics and social videos for Outfit Construction Inc. (OutfitPH, "We fit out your space") with Remotion. Use whenever the user sends a talking-head video or clip to edit ("make a reel from this"), or asks for an Outfit video, reel, ad, logo animation, explainer, material comparison or ranking, tier list, before/after reveal, lower third, end card, or to turn a script into animated scenes for Outfit's Facebook, Instagram, TikTok or YouTube. Builds on the remotion-* skills; it decides what the video looks and moves like, they decide how Remotion code is written.
---

# Outfit Motion Studio

Brand-specific layer on top of Remotion. Every Outfit video is built from the
eight templates in `templates/`, styled by the shared tokens in
`templates/_shared/brand.ts`, and checked against the rules in `references/`.

For Remotion mechanics (project setup, fonts, sequencing, rendering, Studio),
load the `remotion-best-practices` skill and follow it. Where it and this skill
disagree on *look or motion*, this skill wins; on *code mechanics*, it wins.

## Which workflow

- **The user sent footage of someone talking** (the usual case): follow
  `references/talking-head.md` exactly. It uses the ready-made `motion/`
  project in the outfit repo: `npm run new` imports and transcribes,
  you write `plan.json`, `npm run stills` previews, `npm run render` exports.
  Don't copy templates or set up a new project for this.
- **A video made only of graphics** (no footage), or a new standalone clip:
  use the workflow below. In the outfit repo, build it inside `motion/`
  (templates are importable there as `@outfit/<template>`).

## Graphics-only workflow

1. **Read the brief or script.** If the user gave a script, follow
   `references/script-analysis.md` to break it into beats and map each beat
   to a template. Show the scene plan (table: beat, template, duration, on-screen
   text) before building anything longer than 15 seconds.
2. **Pick the format.** Default to vertical 1080×1920 at 30 fps (Reels, TikTok,
   Shorts). Use 1920×1080 for YouTube/website and 1080×1080 for feed posts.
   See `references/rendering-standards.md`.
3. **Set up the project.** In the outfit repo, `motion/` is already set up
   (`cd motion && npm install`). For a Remotion project elsewhere:
   - Copy `templates/` into the project's `src/outfit/` (keep `_shared/`).
   - Copy `assets/*.png` into the project's `public/outfit/`.
   - Install the extras at the project's Remotion version:
     `npx remotion add @remotion/google-fonts @remotion/zod-types zod`
     (`npx remotion versions` must report no mismatches; Remotion 4.0.5xx
     expects zod 4).
   - Register compositions from `src/outfit/Root.example.tsx`, or merge its
     entries into the existing `Root.tsx`.
4. **Build scenes from templates.** Change content through props, never by
   editing the template internals for a one-off. If a scene truly needs a new
   layout, add a new template folder that imports `_shared/` and follows the
   same rules.
5. **Check against the rules** before rendering:
   `references/motion-guidelines.md`, `references/animation-rules.md`,
   `references/typography.md`. Render a still of the busiest frame of every
   scene (`npx remotion still <id> --frame=<n>`) and look at it.
6. **Render** with the settings in `references/rendering-standards.md`.

## Brand in one screen

The logo is a wall of **fluted panels split black | ivory**, with **OUT** in
white on black and **FIT.** in black on ivory. Everything in the motion system
grows from that: split frames, vertical flute lines, panels that slide like
cladding being installed, a single bronze accent.

| Token | Hex | Use |
|---|---|---|
| `ink` | `#0B0B0B` | Black panel, primary dark background |
| `ivory` | `#F6F3EC` | Ivory panel, primary light background |
| `charcoal` | `#201F1D` | Buttons, cards, secondary dark (site `theme-secondary`) |
| `bronze` | `#8A6238` | Primary accent: rules, highlights, rank #1 (site `theme-primary`) |
| `copper` | `#AB7539` | Hover/second accent, sparingly (site `theme-accent`) |
| `espresso` | `#241408` | Deep warm shadow, gradients only (site `theme-base`) |

Typeface: **Montserrat** only. Headlines ExtraBold 800 uppercase; labels Light
300 uppercase with wide tracking (like "WE FIT OUT YOUR SPACE").
Full rules: `references/typography.md`.

Full guidelines summary: `references/brand-guidelines.pdf` (generated from the
outfit.ph website code: logo, colors, type and voice as the site uses them).

## Templates

| Folder | Use for | Default length |
|---|---|---|
| `logo-reveal/` | Openers; split panels slide in, OUT / FIT. land, tagline types on | 3 s |
| `kinetic-typography/` | Hook lines, key claims, quotes; word-by-word panel reveals | 2–5 s per line |
| `material-ranking/` | "Top 5 wall finishes…" countdowns with scored criteria bars | 4 s per item |
| `tier-list/` | S/A/B/C tiers of materials, layouts, mistakes | 1 s per item + 2 s |
| `architectural-diagram/` | Floor plans, wall sections, dimension lines that draw on | 5–8 s |
| `before-after/` | Renovation reveals with a fluted wipe divider | 4–6 s |
| `lower-third/` | Speaker name/role, project name and location over footage | 4 s hold |
| `end-card/` | CTA, contact, socials; always the last scene | 4–5 s |

Each folder has `index.tsx` (component, zod schema, default props, duration)
and a `README.md` with props, timing and do/don't. Shared code lives in
`templates/_shared/`: `brand.ts` (colors, easing, type styles, safe areas,
`src()` for image paths) and `primitives.tsx` (`FluteSurface`, `PanelSlide`,
`FluteReveal`, `MeasureLine`, `TypeSet`, `PushIn`). `Root.example.tsx`
registers every template in vertical and landscape.

Image props take a path inside the Remotion project's `public/`
(`"outfit/kitchen-after.jpg"`) or a URL. Outfit's own project photos are in
this repo at `public/projects/<n>/<k>.jpg` and 3D renders at `public/3d/<n>/<k>.jpg`.

## Assets

| File | What it is |
|---|---|
| `outfit-full-logo.png` | Panel logo with "WE FIT OUT YOUR SPACE" tagline (885×351) |
| `outfit-panel-logo.png` | Panel logo without tagline (882×283) |
| `outfit-black-flutes.png` | Seamless black fluted texture, 1920×1080, 48 px pitch |
| `outfit-ivory-flutes.png` | Seamless ivory fluted texture, 1920×1080, 48 px pitch |
| `outfit-split-panel.png` | Black | ivory split, no lettering, 1920×1080 |

Never recolor, stretch, outline, retype or add effects to the logo. For
animated logo moments use `logo-reveal`, which reveals the real PNG over
fluted panels aligned to its black | ivory seam.

Templates draw flutes with CSS (`FluteSurface`) so the pitch stays exact at any
size; the texture PNGs are for thumbnails, slides and editors outside Remotion.

## Hard rules

- One bronze accent per frame; never introduce other hues except in
  `material-ranking` data colors defined in `brand.ts`.
- No bouncy/elastic easing, no spin, no glitch, no neon. Motion feels like
  carpentry: precise, weighted, settles cleanly.
- Every video ends on `end-card`. Videos over 10 s open with `logo-reveal`
  or a hook line in `kinetic-typography` and show the logo within 3 s.
- Claims about materials (prices, durability, ratings) must come from the user
  or a cited source. Never invent numbers; ask. See `references/material-ranking.md`.
- Contact details come from `src/lib/constants.ts` in the outfit repo: don't
  type them from memory.
