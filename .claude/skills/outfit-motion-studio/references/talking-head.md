# Talking-head workflow

The user sends a video of someone talking ("make a reel from this") and gets
back an edited video: branded captions, hook text, a lower third, full-screen
graphics at the right moments, and the end card. Everything runs in the
`motion/` Remotion project in the outfit repo.

## 0. Setup (once per session)

```bash
cd motion && npm install
pip install pywhispercpp   # the "outfit" cloud environment does both of these automatically
```

Transcription uses a Whisper model from `huggingface.co` (the "outfit" cloud
environment allows it and pre-downloads the `small` model). If the download is
blocked, the import still works but without captions: tell the user to start
the chat in the "outfit" environment, or offer to work from a transcript they
paste instead.

Whisper gets a vocabulary hint (Outfit, Cebu, Banawa, fit-out...) through
`scripts/transcribe.py --prompt`. If the speaker names a project, client or
product, add those words to the hint for better spelling.

## 1. Get the footage

- Attached to the chat: it is in the uploads folder; use that path.
- Google Drive link: download it with the Drive connector into the scratchpad.
- Anything else: ask for the file.

## 2. Import and transcribe

```bash
cd motion && npm run new -- <path/to/video> <slug>
```

`<slug>` is short, lowercase, no date, e.g. `accent-walls`. This creates
`public/videos/<slug>/` with `source.mp4`, `captions.json` (word timings),
`transcript.txt` (readable, timestamped) and a starter `plan.json`.

Options: `--model base` (faster, rougher) or `--model medium` (better for
mixed English/Bisaya, slower); `--language en` or `tl` to force a language.
Whisper has no Cebuano model, so **Bisaya words are often misspelled**: read
`transcript.txt`, fix wrong words directly in `captions.json` (only the
`text` fields), and mention uncertain ones to the user.

## 3. Plan

Read `transcript.txt` and apply `script-analysis.md`: find the hook, the
beats, and moments where a graphic explains better than the face. Then show
the user the plan as a short table and **wait for approval**:

```
| Time | What appears | Content |
|---|---|---|
| 0.2–2.6 | Hook text over speaker | STOP PAINTING ACCENT WALLS. |
| 3.0–7.0 | Lower third | Outfit Construction · Condo fit-outs, Cebu |
| 8.0–14.5 | Full-screen: material ranking | 3 finishes (needs your scores) |
| 14.5–19.0 | Full-screen: before/after | project 21 photos |
| end | End card, 4 s | Book a free consultation |
```

Rules of thumb for a talking head:

- **Hook text** (`punch`) on the first spoken line, 2–3 s, always.
- **Lower third** once, in the first 10 s, when the speaker is introduced or
  the topic starts. Don't stack it with a punch.
- **Cutaways** (full-screen templates) only where the speaker *describes*
  something visual or lists things: rankings, comparisons, layouts, results.
  At most one cutaway per ~15 s; the face is what keeps people watching.
  The voice keeps playing underneath; captions hide during cutaways.
- **Punches** for 1–2 key claims later in the video; not every sentence.
- Trim dead air at the start with `trim.startSeconds`.
- Placement is automatic: captions and lower thirds sit at the bottom of the
  Reels safe zone, centred on x=450 to clear the like/comment/share buttons.
  If the speaker's face is low in the frame, use `punch` with `position: "top"`
  and keep cutaways short rather than moving captions.
- Facts in graphics (scores, prices, sizes) come from the user. Ask.

## 4. Write plan.json

Edit `public/videos/<slug>/plan.json`. Times are seconds in the **source**
footage. `motion/examples/accent-walls.plan.json` is a complete example.

```jsonc
{
  "overlays": [
    { "type": "punch", "from": 0.2, "to": 2.6, "text": "Stop painting\naccent walls.", "accentWords": ["walls"], "position": "top" },
    { "type": "lowerThird", "from": 3, "to": 7, "name": "Outfit Construction", "role": "Condo fit-outs · Cebu" },
    { "type": "cutaway", "from": 8, "to": 14.5, "template": "material-ranking", "props": { "items": [/* ... */], "secondsPerItem": 2.1667 } },
    { "type": "cutaway", "from": 14.5, "to": 19, "template": "before-after", "props": { "beforeImage": "projects/21/1.jpg", "afterImage": "projects/21/5.jpg" } }
  ],
  "endCard": { "enabled": true, "seconds": 4, "props": { "cta": "Message us\non Messenger." } }
}
```

| Overlay | Fields |
|---|---|
| `punch` | `text`, optional `eyebrow`, `accentWords`, `position` (`top`/`center`) |
| `lowerThird` | `name`, optional `role`, `tone` (`charcoal`/`ivory`) |
| `cutaway` | `template`: `kinetic-typography`, `material-ranking`, `tier-list`, `architectural-diagram`, `before-after`, `logo-reveal`; `props`: any of that template's props (see its README), missing ones use defaults |

Match cutaway length to the template: material-ranking needs
`items × secondsPerItem`, tier-list `1.6 + items × secondsPerItem + 2`.

Photos: `projects/<n>/<k>.jpg` and `3d/<n>/<k>.jpg` are the website's own
project photos (linked into `motion/public/`). Pick ones that match what the
speaker describes; look at them first.

## 5. Preview, then render

```bash
npm run stills -- <slug> --guides   # first pass: Reels safe-zone overlay on, check placement
npm run stills -- <slug>     # out/<slug>/stills/*.jpg, one per overlay + captions + end card
npm run render -- <slug>     # out/<slug>/outfit_<slug>_V_<date>.mp4
```

Look at every still before showing them. In the `--guides` pass nothing
readable may touch the pink shade (see the safe-zone diagram in
`rendering-standards.md`); send the clean stills (without guides) to the user. Send the stills to the user, apply
their changes to `plan.json`, re-run stills for what changed, then render and
send the MP4. Footage and renders are not committed to git (too large); commit
`plan.json`, `captions.json` and `transcript.txt` if the user wants the edit kept.
