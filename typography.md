# Typography — Bouche et Terre

## Fonts in use

| Font | Role |
|---|---|
| ClarelSerif | Body / headings (custom, with Georgia fallback) |
| Dancing Script | Logo |
| Elastik | Bottom nav (custom, with ClarelSerif fallback) |

---

## Desktop font sizes

| Element | Text | Font family | Size | Line height | Alignment | Top | Bottom | Transform |
|---|---|---|---|---|---|---|---|---|
| `#intro` | "Bouche et Terre is genuinely…" | ClarelSerif | 28px | 36.6px | center | 18px | — | `translateX(-50%)` |
| `#logo` | "Bouche et terre" | PNG image (`1.png`) | JS-animated width (1100→950→430px) | — | center | JS-animated (300→300→22px) | — | `translateX(-50%)` |
| `#event-info` | "Wonder Wilder Farmer Fest Sunday…" | ClarelSerif | 35px | 40px | center (4 cols, space-around) | JS-animated | — | — |
| `#header-s3 .hs3-left` | "Wonder Wilder Farmer Fest Sunday…" | ClarelSerif | 35px | 40px | center | 0 | — | — |
| `#header-s3 .hs3-right` | "Le Monde des Mille Couleurs…" | ClarelSerif | 35px | 40px | center | 0 | — | — |
| `#manifesto` | "Bouche et Terre is not…" | ClarelSerif | 66px | 1.16 | center | — | 346px | `translateX(-50%)` |
| `#curated` | "Curated by Ceci est Passata…" | ClarelSerif | 35px | 0 | center | — | JS-animated | `translateX(-50%)` |
| `.bottom-nav` | "PROGRAMMA TICKETS" | Elastik | clamp(11px, 1.2vw, 48px) | 0 | space-between | — | 0 | — |

---

## Mobile font sizes (≤ 767px)

| Element | Text | Size | Line height | Alignment | Top | Bottom | Transform |
|---|---|---|---|---|---|---|---|
| `#intro` | "Bouche et Terre is genuinely…" | 4vw | 1.2 | center | 4vh | — | `translateX(-50%)` |
| `#event-info` | "Wonder Wilder Farmer Fest Sunday…" | 4vw | 1.2 | center (2-col grid) | JS-animated (78vh → 3vh) | 0 | — |
| `#header-s3` | "Wonder Wilder Farmer Fest / Le…" | 4vw | 1.2 | left / right | 0 | — | — |
| `#manifesto` | "Bouche et Terre is not…" | 5vw | 1.35 | center | auto | calc(10vh + 10vw) | `translateX(-50%)` |
| `#curated` | "Curated by Ceci est Passata…" | 3vw | 1.6 | center | — | JS-animated (15vh) | `translateX(-50%)` |
| `.bottom-nav` | "PROGRAMMA TICKETS" | 5vw | 0 | space-between | — | 0 | — |
| `#logo` (reduced motion) | "Bouche et terre" | 80vw width | — | center | — | — | none |
