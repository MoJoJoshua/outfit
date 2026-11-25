# material-ranking

Countdown ranking (05 → 01) with an image panel and scored criteria bars.
Read `references/material-ranking.md` first: **scores come from the user**.

**Length:** `items.length × secondsPerItem` (computed by `materialRankingDuration`
and `calculateMetadata`). 3–4 s per item.

| Prop | Type | Notes |
|---|---|---|
| `title` | string | Small label on every card, names the use ("Condo accent walls"). |
| `criteria` | `{key,label,inverted}[]` | 3–4. `inverted: true` when high = less (label it "Affordability", not "Cost"). |
| `items` | `{name,note,scores,image}[]` | **Best first.** The video counts down from the last. `scores[key]` 0–10. |
| `secondsPerItem` | number | 2.5–8. |
| `sampleData` | boolean | Default `true` shows "SAMPLE DATA". Set `false` only when the user has confirmed the scores. |

Layout: image on top 42% (vertical) or right 45% (landscape), revealed by a
right-to-left flute wipe with a slow push-in. Rank 01 gets the espresso panel
and bronze bars; everything else is ivory on ink.

Images: `public/` paths like `"outfit/fluted-wall.jpg"` or URLs. Empty shows
an ivory fluted placeholder.
