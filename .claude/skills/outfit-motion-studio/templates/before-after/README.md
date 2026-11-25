# before-after

Renovation reveal. The before photo holds with a charcoal BEFORE tag, then
the after photo wipes in flute by flute left to right, a bronze AFTER tag
slides in, and the project name rises at the bottom. Both photos push in
slowly (1.00 → 1.06).

**Length:** 5 s default (before 1.6 s, wipe ~1.2 s, after hold ~2.2 s).

| Prop | Type | Notes |
|---|---|---|
| `beforeImage`, `afterImage` | string | `public/` path or URL. Empty shows placeholders. |
| `beforeLabel`, `afterLabel` | string | Keep short. Bisaya is fine ("SAUNA" / "KARON"). |
| `projectName` | string | e.g. "Kitchen renovation · Cebu City". Empty hides. |
| `revealAtSeconds` | number | When the wipe starts; ≥ 0.8. |

**Do** shoot/choose both photos from the same angle; crop them identically.
**Don't** use the 3D render as "after" without labelling it "3D DESIGN".
