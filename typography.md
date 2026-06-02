# Typography — Bouche et Terre

## Fonts in use

| Font | Role |
|---|---|
| ClarelSerif | Body / headings (custom, with Georgia fallback) |
| Dancing Script | Logo |
| Elastik | Bottom nav (custom, with ClarelSerif fallback) |

---

## Desktop font sizes

| Element | Font family | Size | Line height | Alignment | Top | Bottom | Transform |
|---|---|---|---|---|---|---|---|
| `#intro` | ClarelSerif | 28px | 36.6px | center | 18px | — | `translateX(-50%)` |
| `#logo` | Dancing Script | JS-animated | 0.88 | center | JS-animated | — | `translateX(-50%)` |
| `#logo .line2` | Dancing Script | 0.84em (relative to logo) | 0 | center | — | — | — |
| `#event-info` | ClarelSerif | 35px | 40px | center (4 cols, space-around) | JS-animated | — | — |
| `#header-s3 .hs3-left` | ClarelSerif | 35px | 40px | center | 0 | — | — |
| `#header-s3 .hs3-right` | ClarelSerif | 35px | 40px | center | 0 | — | — |
| `#manifesto` | ClarelSerif | 66px | 1.16 | center | — | 346px | `translateX(-50%)` |
| `#curated` | ClarelSerif | 35px | 0 | center | — | JS-animated | `translateX(-50%)` |
| `.bottom-nav` | Elastik | clamp(11px, 1.2vw, 48px) | 0 | space-between | — | 0 | — |

---

## Mobile font sizes (≤ 767px)

| Element | Size | Line height | Alignment | Top | Bottom | Transform |
|---|---|---|---|---|---|---|
| `#intro` | 4vw | 1.2 | center | 4vh | — | `translateX(-50%)` |
| `#event-info` | 4vw | 1.2 | center (2-col grid) | JS-animated | — | — |
| `#header-s3` | 4vw | 1.2 | left / right | 0 | — | — |
| `#manifesto` | 5vw | 1.35 | center | auto | calc(10vh + 1vw) | `translateX(-50%)` |
| `#curated` | 3vw | 1.6 | center | — | JS-animated | `translateX(-50%)` |
| `.bottom-nav` | 5vw | 0 | space-between | — | 0 | — |
| `#logo` (reduced motion) | 20vw | 0.88 | center | — | — | none |
