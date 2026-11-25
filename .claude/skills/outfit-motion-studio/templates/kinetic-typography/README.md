# kinetic-typography

Hook lines, claims, questions and quotes. A color panel slides in, the
eyebrow fades up, the headline sets word by word out of a mask, a bronze
measure line draws underneath. This is the default template: if a beat
fits nothing else, it goes here.

**Length:** 0.4 s per headline word + 1.2 s hold, minimum 2 s.
Override `durationInFrames` per use.

| Prop | Type | Default | Notes |
|---|---|---|---|
| `eyebrow` | string | `We fit-out` | Light 300 line above. Empty hides it. |
| `headline` | string | `Smarter\ndesigns.` | `\n` breaks lines. Max 3 lines, ≤18 chars/line at display size. |
| `accentWords` | string[] | `["designs"]` | Set in bronze. 1–2 words max, the word that carries the meaning. |
| `background` | `ink` \| `ivory` \| `charcoal` | `ink` | Alternate between beats for rhythm. |
| `fluted` | boolean | `false` | Fluted texture; use only with short headlines (contrast). |
| `align` | `left` \| `center` | `left` | Left for statements, center for single-word punches. |
| `size` | `display` \| `headline` | `display` | `headline` for 4+ words. |
| `underline` | boolean | `true` | Bronze measure line. |
| `exit` | boolean | `true` | Words drop out at the end; turn off when the next scene slides over it. |

**Do** write the on-screen line as the headline of the beat, not the transcript.
**Don't** use more than one accent color or exceed 3 lines.
