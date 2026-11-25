# Talking-head workflow

The user sends a video of someone talking ("make a reel from this") and gets
back an edited video: branded captions, hook text, a lower third, full-screen
graphics at the right moments, and the end card. Everything runs in the
`motion/` Remotion project in the outfit repo.

## 0. Setup (once per session)

```bash
cd motion && npm install
pip install pywhispercpp gdown pillow-heif   # the "outfit" cloud environment does both of these automatically
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

- **Attached to the chat** (limit about 30 MB): it is in the uploads folder;
  use that path.
- **Google Drive link** (any size): pass the link straight to `npm run new`;
  it downloads the file. The file must be shared as "Anyone with the link"
  (Share → General access). If the download is refused, the session is not
  in the "outfit" environment.
- **Too big to attach and no Drive?** Ask the user to record or export at
  1080p, 30 fps: Reels are 1080×1920, so 4K/60 fps only makes the file bigger.
  30 MB holds roughly 60–80 s at 1080p.

### Photos and other assets

If the user has their own photos (site progress, finished rooms, materials,
team), they put them in a Google Drive **folder** shared as "Anyone with the
link" and send the folder link (a single file link also works):

```bash
cd motion && npm run assets -- <Drive folder link> <slug>
```

Photos land in `public/videos/<slug>/assets/` as JPG (HEIC from iPhones is
converted, rotated upright, max 2400 px). **Open
`assets/_contact-sheet.jpg` and look at the photos before planning**, then use
them in plan.json as `"videos/<slug>/assets/<file>.jpg"`, e.g. as before/after
images, ranking item images or tier-list chips. If no photo fits a beat, fall
back to the website's own `projects/<n>/<k>.jpg`. Ask which photo is "before"
and which is "after" if it isn't obvious.

## 2. Import and transcribe

```bash
cd motion && npm run new -- <path/to/video or Drive link> <slug>
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

- **Caption style** (`captions.style`), pick one per video and say which:
  - `"keyword"` (default for explainers, tips, hooks): short phrases mid-frame,
    connector words small and one keyword huge ("how much does a / CABINET /
    actually cost"). The keyword is picked automatically (longest content
    word, numbers first); force the right one with `captions.keywords` and set
    1–5 money/claim words in bronze with `captions.accentWords`.
  - `"phrase"` (calm stories, testimonials): 1–3 words at a time at the
    bottom. Mark 2–5 **emphasis** phrases per minute in `captions.emphasis`:
    those hold up to 4 words on a bronze plate. (`"word"` is an old name for it.)
  - Both styles move **phrase by phrase, never word by word**: a phrase lands
    as a whole 0.1 s before it's spoken and eases out just before the next.
    Word-by-word reveal looked like it lagged behind fast speech, so it was
    dropped at the user's request; don't bring it back.
  - `captions.tone`: `"light"` (ivory, default) or `"dark"` (ink) for very bright
    footage. `captions.tracking`: extra letter spacing in % (default -1, the
    user's preference for fuller words).
- **Point graphics** prove what is being said. Time every item to the spoken
  word (read its `startMs` in `captions.json`, minus ~0.1 s). Use one when the
  speaker:
  | says… | graphic |
  |---|---|
  | a list or process ("first… second… third", "plan, design, build") | `steps`: 2–5 cards, one per spoken item, icons from `motion/src/talking-head/icons.tsx` |
  | a question people ask ("Sir, how much…?") | `question`: chat bubble that types in |
  | "not X, but Y" / "instead of" / a myth | `strike`: X crossed out with a bronze line, Y below |
  | "like this", "our clients", results, variety | `photos`: 1–4 photo cards flying in |
  | describes something to look at for 5–12 s (a material, a room, a build) | `split`: photos on top, speaker below |
  Leave 2–4 s of plain speaker between graphics; never two at once. While a
  graphic or split is on, captions automatically switch to one word at the
  bottom (or on the split seam). Graphics sit on the speaker's chest by
  default; use `place: "top"` only when the speaker is framed low.
- **Point-graphic content is the speaker's words.** Labels repeat what is
  said (short, title case); don't add facts, prices or material claims they
  didn't say. Photos from the website are stand-ins: say so in the plan and
  ask for real ones (Drive folder) when the point is about a specific
  material or product.
- **Hook text** (`punch`) on the first spoken line, 2–3 s, always.
- **Lower third** once, in the first 10 s, when the speaker is introduced or
  the topic starts. Don't stack it with a punch.
- **Cutaways** (full-screen templates) only where the speaker *describes*
  something visual or lists things: rankings, comparisons, layouts, results.
  At most one cutaway per ~15 s; the face is what keeps people watching.
  The voice keeps playing underneath; captions hide during cutaways.
- **Punches** for 1–2 key claims later in the video; not every sentence.
- Trim dead air at the start with `trim.startSeconds`.
- **Push-in is automatic**: every plain stretch (no punch, cutaway, point
  graphic or split; lower thirds and keyword captions don't count) of 2.5 s+
  gets a slow zoom toward the face, up to 10% for stretches of 8 s+, easing
  back just before the next graphic. 10% is the user's cap; never exceed it.
  Tune with `pushIn: { max, minSeconds, focusY }`, or `enabled: false`.
- Placement is automatic: captions and lower thirds sit at the bottom of the
  Reels safe zone, centred on x=450 to clear the like/comment/share buttons.
  If the speaker's face is low in the frame, use `punch` with `position: "top"`
  and keep cutaways short rather than moving captions.
- Facts in graphics (scores, prices, sizes) come from the user. Ask.

## 4. Write plan.json

Edit `public/videos/<slug>/plan.json`. Times are seconds in the **source**
footage. `motion/examples/` has complete examples.

```jsonc
{
  "captions": { "enabled": true, "file": "captions.json", "emphasis": [{ "from": 8.2, "to": 11.0 }] },
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
| `steps` | optional `title`; `items`: `[{ label, icon, at }]` (2–5) |
| `question` | `items`: `[{ text, at, icon? }]` (1–3); optional `place` |
| `strike` | `text`, optional `replacement`, `strikeAt`, `replaceAt`, `place` |
| `photos` | `items`: `[{ src, at, caption? }]` (1–4); optional `place` |
| `split` | `items`: `[{ src, at, caption? }]`; optional `ratio` (0.35–0.6, default 0.5), `focusY` (% of speaker footage kept at the top, default 8) |

`at`, `strikeAt`, `replaceAt` are **source seconds** like `from`/`to`.
Icons: consult, design, measure, 3d, build, turnover, home, sofa, cabinet,
hinge, drawer, handle, paint, panel, peso, calendar, clock, truck, check,
cross, camera, chat, question, search, star.
`motion/examples/kitchen-cabinet-cost.plan.json` uses every point graphic.

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
