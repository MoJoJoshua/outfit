# Typography

**Montserrat is the only typeface.** It is what outfit.ph loads
(`next/font/google`, Montserrat). In Remotion, load it with
`@remotion/google-fonts/Montserrat` via `templates/_shared/brand.ts`
(weights 300, 500, 700, 800 only).

The logo letters themselves are a heavy geometric bevel, not Montserrat. Never
try to retype the logo in a font; use the PNGs or `logo-reveal`.

## Type scale

Sizes are for a 1080-px-wide frame. For 1920×1080, multiply by 1.25.

| Role | Weight | Size | Case | Tracking | Line height |
|---|---|---|---|---|---|
| Display (hook, big claim) | 800 | 120–160 | UPPER | -0.02em | 0.95 |
| Headline | 800 | 72–96 | UPPER | -0.01em | 1.0 |
| Subhead | 700 | 44–56 | UPPER | 0 | 1.1 |
| Eyebrow / tagline | 300 | 28–36 | UPPER | 0.18em | 1.2 |
| Body / caption | 500 | 34–40 | Sentence | 0 | 1.3 |
| Label / data / footnote | 500 | 24–28 | UPPER | 0.08em | 1.2 |

Minimum on-screen size: **24 px** at 1080 wide. Anything smaller won't survive
platform compression.

## Pairings

- The site's hero pairs a **Light 300 eyebrow** ("WE FIT-OUT") over an
  **ExtraBold 800 title** ("SMARTER DESIGNS"). This is the house pattern: use it
  for most title cards.
- Tagline is always set "WE FIT OUT YOUR SPACE", Light 300, uppercase, wide
  tracking. Don't hyphenate it in the tagline (the site's hero uses "Fit-Out"
  as a noun/verb elsewhere, which is fine in body copy).
- The full stop in "FIT." is part of the brand. Short headlines may end in a
  bronze full stop: "BUILT TO FIT." Use it at most once per video besides the
  logo.

## Color

| Background | Text | Accent text |
|---|---|---|
| ink / charcoal | ivory | bronze or copper |
| ivory | ink | bronze |
| photo | ivory on charcoal scrim | bronze |

Never set bronze body text on ink at under 44 px (contrast too low).

## Line breaking

- Max **3 lines** for headlines, **18 characters per line** for display,
  **28** for headlines, **38** for body.
- Break by meaning, not by width: "SMARTER / DESIGNS", not "SMART- / ER".
- No orphans: a single short word may not sit alone on the last line.
- Bisaya/Tagalog copy is welcome (the audience uses it): keep the same scale,
  and give it the same weight as English.

## Numbers

- Use lining numerals; prices as `₱45,000` (peso sign, comma thousands,
  no decimals unless needed). Dimensions `2.4 m` or `2400 mm`, pick one per video.
- Ranks are set as large ExtraBold numerals: `01`, `02` (two digits).
