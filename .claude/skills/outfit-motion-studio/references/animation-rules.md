# Animation rules

Concrete numbers for `motion-guidelines.md`. All timings at **30 fps**; if a
composition uses another rate, convert with `fps` from `useVideoConfig()`
(never hard-code frames in a template).

## Easing

Defined in `templates/_shared/brand.ts` as `ease`:

| Name | Curve | Use |
|---|---|---|
| `ease.install` | `bezier(0.16, 1, 0.3, 1)` | Default for things entering: fast, long soft settle |
| `ease.remove` | `bezier(0.7, 0, 0.84, 0)` | Things leaving: gentle start, quick exit |
| `ease.slide` | `bezier(0.65, 0, 0.35, 1)` | Panels and wipes crossing the frame |
| `ease.draw` | `bezier(0.33, 1, 0.68, 1)` | Lines drawing on, bars filling |
| cubic out | `Easing.out(Easing.cubic)` | Every caption word entering (user preference) and point-graphic items |

Springs are allowed only with `damping >= 200` (no overshoot). Never use
`Easing.elastic`, `Easing.bounce`, `Easing.back` or a spring that overshoots.

## Durations

| Action | Frames @30 | Seconds |
|---|---|---|
| Word rising in (`TypeSet`) | 14 | 0.47 |
| Stagger between words | 3–4 | 0.1–0.13 |
| Panel slide across frame | 15 | 0.5 |
| Flute wipe (full frame) | 18–24 | 0.6–0.8 |
| Measure line draw | 18 | 0.6 |
| Bar/score fill | 20 | 0.67 |
| Exit (any element) | 8–10 | 0.27–0.33 |
| Hold after last element lands | ≥ 36 | ≥ 1.2 |

Exits are always faster than entrances (about 60%).

## Distances

- Text rises out of a mask by about one line height (`TypeSet` does this);
  small text that isn't masked moves at most 16–20 px. Never fly text in from off-frame.
- Panels travel the full frame width/height; nothing else does.
- Scale: only for photos (slow push-in **1.00 → 1.06** over the shot), never
  for text.

## Choreography

- **Stagger, don't stack.** At most two elements in motion at any frame,
  except for flute wipes (which are one element).
- Order: background → image → headline → supporting text → accent line.
- Exit in reverse order, or all at once with one panel slide over them.
- Leave **6 frames** of stillness before a cut so the eye can land.

## Transitions between scenes

Use `@remotion/transitions` `TransitionSeries` (install with
`npx remotion add @remotion/transitions`) only with:

- `slide()` from left/right with `ease.slide`, 15 frames (= panel slide), or
- a flute wipe: put the incoming scene inside `<FluteReveal>` (from
  `_shared/primitives.tsx`) layered over the outgoing one.

No fades between scenes, except fade to ink before the end card (10 frames).

## Forbidden

- CSS `transition` / `animation`, Tailwind `animate-*` (they don't render).
- Rotation over 2°, 3D flips, perspective tilts on text. (Photo cards in
  `photos` may tilt up to 3.5°, like prints laid on a table.)
- Motion blur on text. Blur-in reveals. Glow. Chromatic aberration.
- Typewriter character-by-character effects, except the tagline in
  `logo-reveal` (letter-spaced, 1 frame per character) and `question` chat
  bubbles (they imitate a message being typed).
- Shake, pulse, heartbeat, looping idle animations on text.
