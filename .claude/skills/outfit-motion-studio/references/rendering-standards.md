# Rendering standards

## Formats

| Name | Size | FPS | Where | Composition id suffix |
|---|---|---|---|---|
| Vertical (default) | 1080×1920 | 30 | Reels, TikTok, Shorts, FB/IG Stories | `-V` |
| Landscape | 1920×1080 | 30 | YouTube, website `VideoSection` | `-H` |
| Square | 1080×1080 | 30 | FB/IG feed | `-S` |

Templates read `width`/`height` from `useVideoConfig()` and adapt; don't fork a
template per format. Use `isVertical(width, height)` from `_shared/brand.ts`
for layout switches.

## Safe zones (vertical)

The user's Instagram Reels safe zone, measured from Reels screenshots and
converted to 1080×1920 video pixels. It replaced an earlier, tighter zone
(with a lower-right notch) that the user found too cramped; don't bring that back.

```
          x=155                          x=930
   y=230  ┌────────────────────────────────┐   top bar (back, search) above
          │  ┌─────────┬────────┬────────┐ │
   y=300  │  │         TEXT HOOK         │ │   hook text, point graphics
   y=690  │  ├─────────┼────────┼────────┤ │
          │  │           EYES            │ │   speaker's eyes: keep clear
   y=1119 │  ├─────────┼────────┼────────┤ │
          │  │         CAPTIONS          │ │   captions, lower thirds
   y=1547 │  └─────────┴────────┴────────┘ │
   y=1604 └────────────────────────────────┘   username, caption, CTA below
               x=352       x=725                like/comment/share right of x=930
```

- **Safe box** (green): x 155–930, y 230–1604. Clear: top **230**, bottom
  **316**, left **155**, right **150** px. All text, logos and key content stay
  inside. Backgrounds and photos may bleed to every edge.
- **Layout thirds** (white grid): text hook y 300–690, eyes y 690–1119,
  captions y 1119–1547; columns at x 352 and 725, centre ≈ 540.
  - Hook text and point graphics go in the **text hook** third.
  - The **eyes** third belongs to the speaker's face. Ask for footage framed
    with the eyes there; if the speaker is framed high (eyes in the hook
    third), put point graphics in the captions third (`place: "captions"`).
  - Captions and lower thirds sit in the **captions** third.
- Phones that fill the screen crop ~50 px from each side; the box covers it.

`_shared/brand.ts`: `safeArea()` returns the box, `layoutBands()` the thirds
and columns, `fitFontSize()` shrinks headlines to fit the safe width.
(`reelsZone()` remains for older code and no longer has a notch.)

Check placement on any still with the guide overlay:
`npm run stills -- <slug> --guides` (in `motion/`): red = unsafe, green = safe
box, white grid = thirds.

## Render commands

Video (H.264, for all social uploads):

```bash
npx remotion render <CompositionId> out/<name>.mp4 --codec=h264 --crf=18 --pixel-format=yuv420p --audio-codec=aac --audio-bitrate=320k
```

Master / archive (ProRes, for re-editing):

```bash
npx remotion render <CompositionId> out/<name>.mov --codec=prores --prores-profile=hq
```

Transparent overlays (lower-third over someone else's edit):

```bash
npx remotion render LowerThird out/lower-third.mov --codec=prores --prores-profile=4444 --pixel-format=yuva444p10le --image-format=png
```

Thumbnail / cover (pick the frame where the headline is fully set):

```bash
npx remotion still <CompositionId> out/<name>-cover.png --frame=<n> --scale=1
```

In a headless/CI container where Remotion can't download its browser, add
`--browser-executable=<path to chromium>`.

## Quality checks before delivery

- [ ] Render a still of the busiest frame of every scene and view it.
- [ ] Text ≥ 24 px at 1080 wide, inside the safe zone.
- [ ] No frame where text is unreadable mid-transition for more than 6 frames.
- [ ] Audio peaks ≤ −1 dBTP, integrated loudness about **−14 LUFS** (social).
- [ ] Duration matches the scene plan ±0.5 s.
- [ ] File name: `outfit_<topic>_<format>_<yyyymmdd>.mp4`,
      e.g. `outfit_wall-finishes-ranked_V_20261125.mp4`.

## Images and footage

- Project photos live in the outfit repo at `public/projects/<n>/<k>.jpg`
  and 3D renders at `public/3d/<n>/<k>.jpg`. Copy the ones you need into the
  Remotion `public/` folder; reference with `staticFile()`.
- Use `<Img>` from `remotion` (it waits for loading), `objectFit: "cover"`.
- Footage: `<OffthreadVideo>` (or `<Video>` from `@remotion/media`), see the
  `remotion-markup` skill.
