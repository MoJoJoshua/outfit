# Material ranking content

Rankings ("Top 5 wall finishes for condos", "Countertops ranked") are Outfit's
most shareable format, and the most likely to embarrass the brand if the facts
are wrong. This page covers what to rank, how to score, and how to stay honest.

## Data comes from the user

**Never invent prices, lifespans, ratings or brand names.** Before building a
ranking, you need for every item:

| Field | Required | Example |
|---|---|---|
| `name` | yes | "Fluted WPC panel" |
| `scores` per criterion, 1–10 | yes | durability 8, cost 6 … |
| `note` (one line, ≤ 7 words) | yes | "Moisture-safe, no repainting" |
| `price` | optional | "₱1,800 / m²" with date and source |
| `image` | optional | project photo from `public/projects/...` |

If the user gives only names, propose criteria and ask them to fill in or
confirm scores. You may suggest **qualitative** placeholders ("usually more
moisture-resistant than painted MDF") but label them as Outfit's opinion to
confirm, not as facts. Prices must carry a date and a source; Philippine
material prices move fast.

## Criteria

Pick 3–4 criteria. Fewer reads better on a phone. Standard set for interiors:

| Criterion | Question it answers | Higher is |
|---|---|---|
| Durability | How long does it look good with normal use? | better |
| Moisture resistance | Kitchen/bathroom/condo humidity? | better |
| Cost | Material + install per m² | **cheaper scores higher** |
| Install speed | Days on site, mess | better |
| Maintenance | Cleaning, repainting, refinishing | **less work scores higher** |
| Look | Premium feel, matches modern Cebu condo style | better |

Always state the direction on screen when it's inverted
("COST: higher = more affordable").

## Scoring and order

- Overall = weighted average of the criteria; default equal weights. If the
  user weights something ("for rentals, cost matters most"), show it in the
  intro beat.
- Count down **from last to first** (05 → 01). Rank 01 is the only item that
  gets the bronze treatment.
- Ties: break by the criterion the video is about; if still tied, share the
  rank and say so.

## On-screen anatomy (`material-ranking` template)

```
┌────────────────────────────┐
│ 03                         │  rank numeral, ExtraBold, ivory (bronze for 01)
│ LAMINATE                   │  name, headline size
│ Easy clean, wide colors    │  note, body size
│ ─────────────────────────  │
│ DURABILITY  ███████░░░  7  │  bars fill with ease.draw, staggered 4 frames
│ MOISTURE    █████░░░░░  5  │
│ COST        ████████░░  8  │
│                            │
│ [ project photo, flute wipe]│
└────────────────────────────┘
```

## Fairness

- Rank by suitability for the stated use ("for condo accent walls"), not
  absolute quality. Put the use in the title.
- Don't name or disparage competitor companies. Generic product categories
  only, unless the user supplies a supplier brand Outfit actually uses.
- End with a recommendation tied to Outfit's service ("Not sure what fits your
  space? Free consultation"), not with "#1 is always best".

## Tier lists

Same data rules. Tiers are **S / A / B / C** (no D/F: we don't trash
materials, we say where they fit). Tier colors are in `brand.ts`
(`tierColors`): S = bronze, A = copper, B = charcoal, C = stone. Each tier row
holds at most 4 items in vertical format, 6 in horizontal.
