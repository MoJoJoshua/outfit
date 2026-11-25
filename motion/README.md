# Outfit motion

Remotion project for Outfit Construction videos. Brand rules and templates
live in the `outfit-motion-studio` skill (`.claude/skills/outfit-motion-studio/`)
and are imported here as `@outfit/<template>`.

## Talking-head videos

In a new Claude Code chat on this repo: attach the video and say
"make an Outfit reel from this". Claude follows
`.claude/skills/outfit-motion-studio/references/talking-head.md`.

By hand:

```bash
npm install
pip install pywhispercpp gdown pillow-heif
npm run new -- ~/Downloads/clip.mp4 accent-walls   # import + transcribe (or a Drive link)
npm run assets -- <Drive folder link> accent-walls  # optional: your photos
# edit public/videos/accent-walls/plan.json (see examples/)
npm run stills -- accent-walls                     # preview images
npm run render -- accent-walls                     # final MP4 in out/
npm run studio                                     # interactive preview
```

Footage and renders are git-ignored; `plan.json`, `captions.json` and
`transcript.txt` can be committed.
