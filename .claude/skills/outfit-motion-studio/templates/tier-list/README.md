# tier-list

S / A / B / C tier board. Rows slide in, then items slide in from the right
edge into their tier, one at a time. Same data rules as material-ranking:
placements come from the user (`sampleData: true` until confirmed).

**Length:** 1.6 s intro + `items × secondsPerItem` + 2 s hold
(`tierListDuration`).

| Prop | Type | Notes |
|---|---|---|
| `title` | string | `\n` to break. Names the use. |
| `items` | `{name,tier,image}[]` | Reveal order. For suspense go C → S. Max 4 per tier vertical, 6 landscape (extras are not drawn). |
| `secondsPerItem` | number | 0.6–3; 1 s is the sweet spot with voiceover. |
| `sampleData` | boolean | Shows "SAMPLE DATA" under the title. |

Tier colors: S bronze, A copper, B charcoal, C stone. No D/F tiers: we say
where a material fits, we don't trash it.
