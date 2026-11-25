# architectural-diagram

Floor-plan explainer on an ivory drafting grid: outer walls draw on, then
partitions, then overall dimension lines with ticks, then room labels with
their sizes. Highlight the room the video is about.

**Length:** 7 s default; everything has landed by ~4 s, the rest is hold.

| Prop | Type | Notes |
|---|---|---|
| `eyebrow`, `title` | string | Title `\n` to break. |
| `planWidthM`, `planDepthM` | number | Overall plan size in meters. |
| `rooms` | `{label,x,y,w,h,highlight}[]` | Meters from the top-left of the plan. Rectangles only. |
| `caption` | string | One line under the plan. Keep "illustrative" wording unless measurements are real. |

The defaults are a **sample** layout. Real projects need real measurements
from the user or the drawing set. For wall sections or non-rectangular plans,
build a new scene from `MeasureLine` and SVG paths with the same timing
(walls 1.2 s, dims 0.6 s, labels staggered 6 frames).
