# Script analysis: from words to a scene plan

Use this whenever the user hands over a script, voiceover, caption, talking
points, or a rough idea ("make a reel about fluted panels vs. wainscoting").

## 1. Read for the job of the video

Decide which one of these the video is, and say it back to the user in one
line. It sets the structure.

| Type | Structure | Typical templates |
|---|---|---|
| **Showcase** (a finished project) | Hook → before → reveal → details → CTA | kinetic-typography, before-after, lower-third, end-card |
| **Explainer** (how/why) | Question → answer in 3 steps → takeaway → CTA | kinetic-typography, architectural-diagram, end-card |
| **Ranking / comparison** | Promise → items countdown → winner → CTA | kinetic-typography, material-ranking or tier-list, end-card |
| **Talking head** (footage of a person) | Footage with lower-third → key lines as type → CTA | lower-third, kinetic-typography, end-card |
| **Brand / promo** | Logo → 2–3 claims → CTA | logo-reveal, kinetic-typography, end-card |

## 2. Split into beats

A **beat** is one idea the viewer takes away. Rules:

- One sentence of voiceover ≈ one beat. Split sentences with "and"/"but".
- Each beat gets **one on-screen line** of at most 7 words. The on-screen line
  is the *headline* of the beat, not the transcript. If captions are needed
  for a talking head, use the `remotion-captions` skill separately.
- Measure: spoken English ≈ **2.5 words/second**; Bisaya/Tagalog ≈ 2.2.
  A beat lasts as long as its voiceover, or 0.4 s per on-screen word
  (minimum 1.5 s) if there is no voiceover.
- The first beat is the **hook**: on screen by frame 0, under 2 s, a
  question, a number, or a bold claim ("STOP PAINTING ACCENT WALLS.").

## 3. Map beats to templates

| The beat… | Template |
|---|---|
| States a claim, question, quote or number | `kinetic-typography` |
| Introduces the brand | `logo-reveal` (only as the opener, once) |
| Compares 3–6 options on scored criteria | `material-ranking` |
| Sorts 6+ options into groups | `tier-list` |
| Explains a layout, dimension, wall build-up or process | `architectural-diagram` |
| Shows a transformation (photos/footage) | `before-after` |
| Introduces a person, project or place over footage | `lower-third` (overlay) |
| Asks the viewer to act | `end-card` (always last) |

If no template fits, prefer `kinetic-typography` over inventing a layout.

## 4. Write the scene plan

Present it as a table before building, and wait for approval when the video is
over 15 s or the user hasn't given a script:

```
Format: 1080×1920 @30fps · Total: 24.0 s · Type: Ranking

| # | Time | Template | On-screen text | Voiceover / notes |
|---|------|----------|----------------|-------------------|
| 1 | 0.0–2.0 | kinetic-typography | 5 WALL FINISHES, RANKED. | "Which wall finish is worth it?" |
| 2 | 2.0–18.0 | material-ranking | 05 PAINT … 01 FLUTED WPC | 3.2 s per item |
| 3 | 18.0–20.0 | kinetic-typography | BUILT TO FIT. | |
| 4 | 20.0–24.0 | end-card | BOOK A FREE CONSULTATION | |
```

## 5. Check before building

- [ ] Hook in the first 2 s, logo visible by 3 s (logo-reveal or end-card
      watermark).
- [ ] No beat has more than one hero element.
- [ ] Every number or claim has a source (user, supplier sheet, or a cited
      page). Anything missing is listed as a question to the user.
- [ ] Total length fits the platform (Reels ≤ 90 s, ideally 15–35 s).
- [ ] Ends on end-card with one CTA, matching the goal
      (consultation, quote, message on Messenger).

## Voice

Outfit's copy (from outfit.ph) is warm, direct and local: "We fit out your
space", "Best spaces in Cebu", "Smarter designs". Short declaratives, no
jargon, no hype words like "revolutionary". Mixing in Bisaya is natural
for this audience when the user's script does.
