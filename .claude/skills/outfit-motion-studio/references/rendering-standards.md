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

Platform UI covers parts of the frame. Keep all text and the logo inside:

- top **220 px**, bottom **380 px**, right **140 px**, left **80 px** clear.

`_shared/brand.ts` exports `safeArea(width, height)` that returns these insets;
every template uses it. Backgrounds and photos may bleed to the edges.

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
