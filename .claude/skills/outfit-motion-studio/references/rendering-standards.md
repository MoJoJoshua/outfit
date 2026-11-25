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

Measured from an Instagram Reels UI overlay (sponsored post, worst case) at
1080×1920. Keep all text, logos and key faces/products inside:

```
        x=110                         x=914
 y=254  ┌──────────────────────────────┐        top bar (Reels, camera)
        │                              │
        │          SAFE BOX            │
        │                              │
 y=1072 │                    ┌─────────┘  <- notch: like / comment / share
        │                    │             buttons take 290 px on the right
 y=1322 └────────────────────┘ x=790       username, caption, CTA below
        |<- lower-zone centre x=450 ->|
```

- Main box: top **254**, bottom **598**, left **110**, right **166** px clear.
- Below **y=1072** the right inset grows to **290** px. Anything there
  (captions, lower thirds, contact rows, bottom of grids) centres on
  **x=450**, not 540.
- Some phones crop ~**54 px** from each side; the margins above already cover it.
- Backgrounds and photos may bleed to every edge; only text and key content
  must stay inside.

`_shared/brand.ts`: `safeArea()` returns the main box, `reelsZone()` the notch
(`notchTop`, `notchRight`, `centerX`), `safeRightAt(y)` the right inset at a
given height. Every template uses them. `fitFontSize()` shrinks headlines so
the longest line fits the safe width.

Check placement on any still with the guide overlay:
`npm run stills -- <slug> --guides` (in `motion/`). Shaded = unsafe.

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
