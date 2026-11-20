# Drop-in images

Put an image in the right folder with the right file name and it appears automatically.
Formats: `.webp` (preferred), `.avif`, `.jpg`, `.jpeg`, `.png`.
Dev server: refresh the page. Production: run `npm run build` again.

| File | Where it shows | Suggested size |
|---|---|---|
| `divisions/<division>/hero.*` | Full-width hero background (dark overlay + white text are applied automatically) | 2400 × 1400 |
| `divisions/<division>/banner.*` | Statement banner background | 2400 × 1000 |
| `divisions/<division>/<item-id>.*` | Image on that offering / equipment card | 1200 × 900 |

`<division>` = `digital`, `equipment` or `engineering`.

Item ids (the card images):
- **digital**: school-college, erp, websites, ecommerce, mobile, custom
- **equipment**: power, solar, garments, industrial, it-security, hvac, lab, medical
- **engineering**: electrical, solar-install, network-cctv, ac-ventilation, lab-setup, maintenance

Home page (`public/images/home/`):
- `hero.*` — photo inside the big circle in the hero (square, 1200 × 1200)
- `digital.*`, `equipment.*`, `engineering.*` — image beside each tab in "What we do" (1600 × 1200)

Example: `public/images/divisions/equipment/power.webp` → photo on the "Power & Electrical" card.

Without an image, each slot shows a designed placeholder (grid + icon), so the site never looks broken.
Use photos you own or have a licence for.
