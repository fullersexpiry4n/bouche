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
| `#logo` (S1/S2) | "Bouche et terre" | PNG image (`1.png`) | JS-animated width (1920→1920→1px) | — | center | JS-animated top (0→0→22px) | — | `translateX(-50%)` |
| `#logo2` (S3/S4) | "Bouche et terre" | PNG image (`3.png`) | 1920px | — | center | 60px | — | `translateX(-50%)` |
| `#event-info` | "Wonder Wilder Farmer Fest Sunday…" | ClarelSerif | 35px | 40px | center (4 cols, space-around) | JS-animated (1123→36px) | — | — |
| `#header-s3 .hs3-left` | "Wonder Wilder Farmer Fest Sunday…" | ClarelSerif | 35px | 40px | center | 33px | — | — |
| `#header-s3 .hs3-right` | "Le Monde des Mille Couleurs…" | ClarelSerif | 35px | 40px | center | 33px | — | — |
| `#manifesto` | "Bouche et Terre is not…" | ClarelSerif | 66px | 1.16 | center | — | 346px | `translateX(-50%)` |
| `#curated` | "Curated by Ceci est Passata…" | ClarelSerif | 35px | 0 | center | — | JS-animated (173px) | `translateX(-50%)` |
| `.bottom-nav` | "PROGRAMMA TICKETS" | Elastik | clamp(11px, 1.2vw, 48px) | 0 | space-between | — | 0 | — |

---

## Mobile font sizes (≤ 767px)

| Element | Text | Size | Line height | Alignment | Top | Bottom | Transform |
|---|---|---|---|---|---|---|---|
| `#intro` | "Bouche et Terre is genuinely…" | 4vw | 1.2 | center | 4vh | — | `translateX(-50%)` |
| `#event-info` | "Wonder Wilder Farmer Fest Sunday…" | 4vw | 1.2 | center (2-col grid) | JS-animated (78vh → 3vh) | 0 | — |
| `#header-s3` | "Wonder Wilder Farmer Fest / Le…" | 4vw | 1.2 | left / right | 33px | — | — |
| `#manifesto` | "Bouche et Terre is not…" | 5vw | 1.35 | center | auto | calc(10vh + 10vw) | `translateX(-50%)` |
| `#curated` | "Curated by Ceci est Passata…" | 3vw | 1.6 | center | — | JS-animated (15vh) | `translateX(-50%)` |
| `.bottom-nav` | "PROGRAMMA TICKETS" | 5vw | 0 | space-between | — | 0 | — |
| `#logo` (reduced motion) | "Bouche et terre" | 80vw width | — | center | — | — | none |

---

## JS animation arrays [S1, S2, S3, S4]

| Key | Values | Unit | Notes |
|---|---|---|---|
| `logoFS` | 1920, 1920, 1, 1 | px | `#logo` (1.png) width |
| `logoTop` | 0, 0, 22, 22 | px | `#logo` top |
| `logo1Op` | 1, 1, 0, 0 | — | `#logo` opacity |
| `logo2Op` | 0, 0, 1, 1 | — | `#logo2` opacity |
| `eventTop` | 1123, 36, 36, 36 | px | `#event-info` top |
| `curatedBottom` | 173, 173, 173, 173 | px | `#curated` bottom |
| `logoFS_vw` | 75, 65, 28, 28 | ×vw | mobile logo width |
| `logoTop_vh` | 0, 0, 3, 3 | ×vh | mobile logo top |
| `eventTop_vh` | 78, 3, 3, 3 | ×vh | mobile event-info top |
| `curatedBot_vh` | 15, 15, 15, 15 | ×vh | mobile curated bottom |
| `introOp` | 1, 0, 0, 0 | — | `#intro` opacity |
| `manifestoOp` | 0, 1, 1, 1 | — | `#manifesto` opacity |
| `curatedOp` | 0, 1, 1, 1 | — | `#curated` opacity |
| `eventInfoOp` | 1, 1, 0, 0 | — | `#event-info` opacity |
| `headerS3Op` | 0, 0, 1, 1 | — | `#header-s3` opacity |
