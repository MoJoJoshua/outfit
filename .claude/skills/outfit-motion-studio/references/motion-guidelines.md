# Motion guidelines

The brand idea: **we fit out your space.** On screen, that means things get
*installed*: panels slide into place, lines are measured out, surfaces are
revealed. Nothing floats, bounces or sparkles.

## Character

| We are | We are not |
|---|---|
| Precise: elements land on a grid and stop | Playful: overshoot, wobble, squash |
| Weighted: fast out, long gentle settle | Floaty: linear drifts, slow fades everywhere |
| Architectural: vertical flutes, straight wipes, dimension lines | Organic: blobs, particles, liquid transitions |
| Calm: one thing moves at a time | Busy: everything animates at once |

## The four signature moves

Use these before inventing anything. All are in `templates/_shared/`.

1. **Panel slide** (`PanelSlide`): a full-height panel enters from the
   left or right edge, like a board slid into a wall track. 12–18 frames,
   `ease.slide`. Used for scene changes and backgrounds.
2. **Flute wipe** (`FluteReveal`): a reveal made of vertical strips the
   width of one flute (48 px at 1080 wide), staggered 1 frame each from one
   side. Used for image reveals and before/after.
3. **Measure line** (`MeasureLine`): a thin bronze line draws on, end ticks
   appear, then the label. Used for dimensions, underlines and dividers.
4. **Type set** (`TypeSet`): words rise one line height out of a mask with
   `ease.install`, 3–4 frames apart. Used for all headline text.

## Composition

- Default layout is the **split**: one side ink, one side ivory, as in the logo.
  Text sits on the side with the strongest contrast. A 50/50 split is the
  default; 40/60 and 33/67 are allowed. Vertical videos may split top/bottom.
- Keep a **margin of 80 px** (1080 wide) / 120 px (1920 wide). Vertical videos
  also respect the platform safe zone in `rendering-standards.md`.
- Hold every readable frame long enough to read twice: about
  **0.4 s per word**, minimum 1.2 s for anything with text.
- **One hero per frame.** If two things need attention, sequence them.

## Pace

| Platform | Cut rhythm | Notes |
|---|---|---|
| Reels / TikTok / Shorts | new beat every 1.5–3 s | Hook text on frame 0, no slow open |
| Facebook feed | 2–4 s | Must work muted: all key info on screen |
| YouTube / website | 3–6 s | Logo reveal may be the full 3 s |

## Color in motion

- Backgrounds change only by panel slide or flute wipe, never by crossfading
  colors.
- Bronze appears on the one thing the viewer should look at now. When focus
  moves, the bronze moves with it.
- Photos of finished projects are the stars: don't tint them, don't put text on
  busy areas without a charcoal scrim (`rgba(32,31,29,0.72)`).

## Sound (when used)

- Soft wood/material foley on panel slides (a low "thock"), a light tick on
  measure lines. Never whooshes on every cut.
- Music: warm, minimal, mid-tempo (90–110 BPM). Cut beats on the downbeat.
