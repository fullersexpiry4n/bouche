# Typography — Bouche et Terre

## Fonts in use

| Font | Role |
|---|---|
| ClarelSerif | Body / headings (custom, with Georgia fallback) |
| Dancing Script | Logo |
| Elastik | Bottom nav (custom, with ClarelSerif fallback) |

---

## Desktop font sizes

| Element | Text | Font family | Size | Line height | Alignment | Top | Bottom | Transform | Height |
|---|---|---|---|---|---|---|---|---|---|
| `#intro` | "Bouche et Terre is genuinely…" | ClarelSerif | 28px | 36.6px | center | 18px | — | `translateX(-50%)` | — |
| `#logo` (S1/S2) | "Bouche et terre" | PNG image (`1.png`) | JS-animated width (1920→1920→1px) | — | center | JS-animated top (0→0→22px) | — | `translateX(-50%)` | — |
| `#logo2` (S3/S4) | "Bouche et terre" | PNG image (`3.png`) | 1920px | — | center | 60px | — | `translateX(-50%)` | — |
| `#event-info` | "Wonder Wilder Farmer Fest Sunday…" | ClarelSerif | 35px | 40px | center (4 cols, space-around) | JS-animated (1123→36px) | — | — | — |
| `#header-s3 .hs3-left` | "Wonder Wilder Farmer Fest Sunday…" | ClarelSerif | 35px | 40px | center | 33px | — | — | — |
| `#header-s3 .hs3-right` | "Le Monde des Mille Couleurs…" | ClarelSerif | 35px | 40px | center | 33px | — | — | — |
| `#manifesto` | "Bouche et Terre is not…" | ClarelSerif | 44px | 1.16 | center | — | 500px | `translateX(-50%)` | — |
| `#curated` | "Curated by Ceci est Passata…" | ClarelSerif | 28px | 1.45 | center | — | 160px | `translateX(-50%)` | — |
| `#more-info` | "More info? steven@… dries@…" (S4 only) | ClarelSerif | 0.86em (~24px) | inherit | center | — | nested in `#curated` | — | — |
| `.bottom-nav` | "PROGRAMMA TICKETS" | Elastik | clamp(11px, 1.2vw, 48px) | 0 | space-between | — | 0 | — | 8vh |

---

## Mobile font sizes (≤ 767px)

| Element | Text | Size | Line height | Alignment | Top | Bottom | Transform |
|---|---|---|---|---|---|---|---|
| `#intro` | "Bouche et Terre is genuinely…" | 3.5vw | 1.3 | center | 4vh | — | `translateX(-50%)` |
| `#event-info` | "Wonder Wilder Farmer Fest Sunday…" | 3.5vw | — | center (2-col grid) | JS (70vh → 0); padding-top 3vh; **persistent header on phone (all states, replaces header-s3 text)** | — | — |
| `#header-s3` | "Wonder Wilder Farmer Fest / Le…" | 3.5vw | 1.25 | left / right | 8vh | — | — |
| `.hs3-center` / `.hs3-logo-phone` (**1.png** — S3/S4) | "Bouche et terre" | width 72vw | — | center | 8vh | — | abs, `translateX(-50%)` — between header & manifesto (phone; tablet still uses bouche_logo.png) |
| `#manifesto` | "Bouche et Terre is not…" | min(4.5vw, 19px) | 1.3 | justify | 48% | auto | `translate(-50%, -50%)` — `<br>` hidden |
| `#manifesto-streep` | Brown brush-stroke PNG below manifesto (S3/S4 only) | 100vw | — | — | — | `margin-top: 0.6em` | `left:50% translateX(-50%)` |
| `#curated` | "Curated by Ceci est Passata…" | 3.5vw | 1.6 | center | — | JS-animated (6vh) | `translateX(-50%)` |
| `#more-info` | "More info? steven@… dries@…" (S4 only) | 0.86em (~3.0vw) | inherit | center | — | nested in `#curated` | — |
| `.bottom-nav` | "PROGRAMMA TICKETS" | 5vw | — | space-between | — | 0 | — |
| `#logo` (fluid) | "Bouche et terre" | 100vw→28vw JS-animated | — | center | 20vh→3vh JS-animated | — | none |

## Tablet font sizes (768px – 1023px)

| Element | Text | Size | Line height | Alignment | Top | Bottom | Transform |
|---|---|---|---|---|---|---|---|
| `#intro` | "Bouche et Terre is genuinely…" | 2vw | 1.2 | center | 3vh | — | `translateX(-50%)` |
| `#event-info` | "Wonder Wilder Farmer Fest Sunday…" | 2.8vw | 1.25 | center (2-col grid) | JS-animated | — | — |
| `#header-s3` | "Wonder Wilder Farmer Fest / Le…" | 2.8vw | 1.25 | left / right | 10vh | — | — |
| `.hs3-logo-mob` (bouche_logo.png — S3/S4) | "Bouche et terre" | 100% | — | — | — | 25vh | — |
| `#manifesto` | "Bouche et Terre is not…" | 3vw | 1.3 | center | 55% | auto | `translate(-50%, -50%)` — `<br>` hidden |
| `#manifesto-streep` | Brown brush-stroke PNG below manifesto (S3/S4 only) | 100vw | — | — | — | `margin-top: 0.6em` | `left:50% translateX(-50%)` |
| `#curated` | "Curated by Ceci est Passata…" | 2.0vw | 1.6 | center | — | JS-animated (15vh) | `translateX(-50%)` |
| `#more-info` | "More info? steven@… dries@…" (S4 only) | 0.72em (~1.44vw) | inherit | center | — | nested in `#curated` | — |
| `.bottom-nav` | "PROGRAMMA TICKETS" | 2.5vw | — | space-between | — | 0 | — |

---

## JS animation arrays [S1, S2, S3, S4]

| Key | Values | Unit | Notes |
|---|---|---|---|
| `logoFS` | 1920, 1920, 1, 1 | px | `#logo` (1.png) width |
| `logoTop` | 0, 0, 22, 22 | px | `#logo` top |
| `logo1Op` | 1, 1, 0, 0 | — | `#logo` opacity |
| `logo2Op` | 0, 0, 1, 1 | — | `#logo2` opacity |
| `eventTop` | 1123, 36, 36, 36 | px | `#event-info` top |
| `curatedBottom` | 160, 160, 160, 160 | px | `#curated` bottom |
| `logoFS_vw` | 100, 100, 28, 28 | ×vw | mobile logo width |
| `logoTop_vh` | 20, 20, 3, 3 | ×vh | mobile logo top |
| `eventTop_vh` | 70, 0, 0, 0 | ×vh | mobile event-info top (phone: persistent header, +3vh padding) |
| `curatedBot_vh` | 0, 11, 11, 19 | ×vh | mobile curated bottom |
| `logoFS_vw_t` | 90, 90, 28, 28 | ×vw | tablet logo width |
| `logoTop_vh_t` | 15, 15, 3, 3 | ×vh | tablet logo top |
| `eventTop_vh_t` | 70, 3, 0, 0 | ×vh | tablet event-info top |
| `curatedBot_vh_t` | 0, 11, 11, 11 | ×vh | tablet curated bottom |
| `introOp` | 1, 0, 0, 0 | — | `#intro` opacity |
| `manifestoOp` | 0, 1, 1, 1 | — | `#manifesto` opacity |
| `curatedOp` | 0, 1, 1, 1 | — | `#curated` opacity |
| `eventInfoOp` | 1, 1, 0, 0 | — | `#event-info` opacity |
| `headerS3Op` | 0, 0, 1, 1 | — | `#header-s3` opacity |
