# Offspring Technologies — Website (Phase 1: UI only)

Next.js 16 (App Router) · React 19 · Tailwind CSS 4 · TypeScript. No database, no backend.

```bash
npm install
npm run dev      # http://localhost:3000  (redirects to /en)
npm run build
```

## Structure
- `src/app/[locale]/` — pages: home, `solutions`, `solutions/[division]` (digital · equipment · engineering), `about`, `contact`
- `src/components/` — Header, Footer, Logo (concept mark), HeroNetwork, ContactForm, ui primitives
- `src/app/globals.css` — brand tokens (colors, fonts, motion) in Tailwind `@theme`
- `src/i18n/` — site copy in `dictionaries/en.ts`; division page copy in `dictionaries/en-divisions.ts`

## Images
Drop photos into `public/images/divisions/<division>/` — they appear automatically. See `public/images/README.md` for file names and sizes.

## Bangla localization
Routes are already `/{locale}/…`. To launch Bangla:
1. Complete `src/i18n/dictionaries/bn.ts` (missing keys fall back to English).
2. Add `"bn"` to `enabledLocales` in `src/i18n/config.ts`. The footer language switcher appears automatically and Hind Siliguri is used for `lang="bn"`.

## Before going live
- Replace placeholder contact details in `en.ts` (`contact.details`).
- The contact form is UI-only (`ContactForm.tsx` simulates a submit) — wire to an API/form service in phase 2.
- Logo is a concept mark — swap `LogoMark` in `Logo.tsx` and `public/icon.svg` with the final logo.
