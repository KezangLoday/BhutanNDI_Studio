# NGOTAG Studio — Bhutan NDI auth redesign

The Studio auth flow rebuilt in React + TypeScript against the Bhutan NDI
website design system. Functionality and step order match the existing Studio
screens exactly; only the visual layer changed.

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build
```

## Structure

```
src/styles/tokens.css        every design-system token as a CSS custom property
src/styles/global.css        resets, font loading, eyebrow + mint-wave utilities
src/components/              AuthLayout, BrandPanel, Button, TextField, Toast, icons, illustrations
src/features/auth/           the four steps + AuthFlow orchestrator
```

`AuthFlow` holds the step state (`login-email` → `login-method`,
`signup-name` → `signup-method`) and the email value. Each step is a pure
presentational component taking callbacks, so wiring it to the real Studio
API means replacing the `onNext` / `onSelect` / `onContinue` handlers in
`AuthFlow.tsx` and nothing else.

## What changed from the old screens

| Before | After |
|---|---|
| Light theme, `#1e3a8a` blue | Dark obsidian ground, single mint accent |
| Blue raster clipart illustration | Drawn mint line scenes (`illustrations.tsx`), one per step |
| Grey filled inputs | `--surface-raised` fields, mint hairline border, mint focus ring |
| Flat blue buttons | Mint gradient primary with hover lift + sweep; outline secondary |
| Green banner alert | Glass toast with mint rim and glow |
| Static left panel | Panel copy and illustration change per step |

## Notes for the dev team

- **Fonts.** Inter and DM Mono load from Google Fonts. **Host Grotesk is not on
  Google Fonts** — self-host it and it picks up automatically via
  `--font-display`; until then display text falls back to Inter.
- **Tokens over literals.** No component hard-codes a colour. Restyle by
  editing `tokens.css` only.
- All buttons are ≥44px tall and hover displacement is neutralised under
  `@media (hover: none)`, per the design system's touch rules.
- Motion collapses under `prefers-reduced-motion: reduce`.
