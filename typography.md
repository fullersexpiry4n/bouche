# Typography — Bouche et Terre

## Fonts in use

| Font | Role |
|---|---|
| ClarelSerif | Body / headings (custom, with Georgia fallback) |
| Dancing Script | Logo |
| Elastik | Bottom nav (custom, with ClarelSerif fallback) |

---

## Desktop font sizes

| Element | Font family | Size | Line height | Alignment |
|---|---|---|---|---|
| `#intro` | ClarelSerif | 35px | 1.6 | center |
| `#logo` | Dancing Script | JS-animated | 0.88 | center |
| `#logo .line2` | Dancing Script | 0.84em (relative to logo) | 0 | center |
| `#event-info` | ClarelSerif | 35px | 1.45 | center (4 cols, space-around) |
| `#header-s3 .hs3-left` | ClarelSerif | 35px | 5px | center |
| `#header-s3 .hs3-right` | ClarelSerif | 35px | 5px | center |
| `#manifesto` | ClarelSerif | 66px | 1.16 | center, bottom (20vh above nav) |
| `#curated` | ClarelSerif | 35px | 0 | center |
| `.bottom-nav` | Elastik | clamp(11px, 1.2vw, 48px) | 0 | space-between |

---

## Mobile font sizes (≤ 767px)

| Element | Size | Line height | Alignment |
|---|---|---|---|
| `#intro` | 3.4vw | 1.6 | center |
| `#event-info` | 3.5vw | 1.45 | center (2-col grid) |
| `#header-s3` | 4vw | 1.5 | left / right |
| `#manifesto` | 5vw | 1.35 | center |
| `#curated` | 3vw | 1.6 | center |
| `.bottom-nav` | 5vw | 0 | space-between |
| `#logo` (reduced motion) | 20vw | 0.88 | center |
