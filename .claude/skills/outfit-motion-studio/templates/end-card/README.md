# end-card

Always the last scene. Fluted ink panel with an espresso fade, the full logo
with tagline, one CTA, a bronze rule, a supporting line and up to four
contact rows.

**Length:** 5 s (4 s minimum: people screenshot this frame).

| Prop | Type | Notes |
|---|---|---|
| `cta` | string | One action, matched to the video's goal. `\n` to break. |
| `subline` | string | Empty hides it. |
| `contacts` | `{label,value}[]` | Max 4. Defaults mirror `src/lib/constants.ts` in the outfit repo; re-check them there before rendering. |

Good CTAs from what Outfit actually offers (outfit.ph FAQ): "Book a free
consultation.", "Message us on Messenger.", "Get a quote." Don't promise
free quotations before design approval: the site says quotes follow the
approved design proposal.
