# lower-third

Name/role or project/location over footage. A bronze post grows, a charcoal
(or ivory) panel slides out from it, name and role rise inside. Exits by
sliding back left. **Transparent background**: render it as ProRes 4444
(`rendering-standards.md`) or place it in a `<Sequence>` above footage.

**Length:** `holdSeconds + 1.4 s` (`lowerThirdDuration`).

| Prop | Type | Notes |
|---|---|---|
| `name` | string | Subhead, one line. |
| `role` | string | Eyebrow line in copper/bronze. Empty hides. |
| `tone` | `charcoal` \| `ivory` | Charcoal over most footage; ivory over dark footage. |
| `holdSeconds` | number | ≥ 1.5; 3 s default. |

Sits bottom-left inside the safe zone (vertical: above the caption area).
