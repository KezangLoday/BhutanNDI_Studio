# NGOTAG Studio — Bhutan NDI auth redesign

The Studio auth flow rebuilt to match the Bhutan NDI website's shipped design
system. Functionality and step order match the existing Studio screens; only
the visual layer changed.

Built on the **same stack as the website** — Next.js 16 (App Router), React 19,
Tailwind v4 (CSS-first, no config file) — so these components drop into the
Studio without translation.

## Run

```bash
npm install
npm run dev        # http://localhost:3000
npm run build
npm run typecheck
```

## Structure

```
src/app/globals.css            tokens + @theme bridge — copied from the website's globals.css
src/app/layout.tsx             Host Grotesk / Inter / DM Mono via next/font, Atmosphere
src/styles/ndi-effects.css     the auth-relevant subset of the website's ndi-effects.css
src/components/layout/         Atmosphere, AuthHeader (glass pill), AuthShell + StepHeader
src/components/ui/             GradientButton, ShinyButton, HairlineButton, formStyles, icons, Eyebrow, scenes
src/features/auth/             the four steps + AuthFlow orchestrator
public/media/logos/            ndi-mark.png (cropped from the official lockup), ndi-horizontal-white.png
```

`AuthFlow` owns the step state (`login-email` → `login-method`,
`signup-name` → `signup-method`) and the email value. Each step is
presentational and takes callbacks, so wiring the real API means replacing the
`onNext` / `onSelect` / `onContinue` handlers in `AuthFlow.tsx` and nothing else.

## What came from the website, verbatim

| Concern | Source |
|---|---|
| Every token, and the `@theme inline` bridge | `src/app/(frontend)/globals.css` |
| `.ndi-field`, `.ndi-chip`, `.ndi-check`, `.ndi-sweepbtn`, sweep/glow, `.ndi-wave-text`, glass panel + lens rim, `.shiny-cta` | `src/styles/ndi-effects.css` |
| `FIELD_CLASS`, `LABEL_CLASS`, `FIELD_BLOCK_CLASS` | `src/components/ui/formStyles.ts` |
| `GradientButton` ramp, `ShinyButton` | `src/components/ui/*.tsx` |
| Header pill geometry and glass | `src/components/layout/SiteHeader.tsx` |
| `Atmosphere` ground + edge pools | `src/components/layout/Atmosphere.tsx` |
| Eyebrow, heading scale, `PageSection` widths | `SectionHeader.tsx`, `PageHero.tsx` |

## Where this deviates, and why

Three places the website had no precedent, so the treatment is extrapolated
from its existing vocabulary — flag these if you'd rather they changed:

- **`HairlineButton`** — the website ships no outline/secondary button. This
  applies the chip's checked state and the mobile sheet's social-tile hover
  (1px mint border over a 2% white fill, hover to mint 8% + `--glow-sm`).
- **Disabled CTA** — the website's only disabled submit uses
  `disabled:opacity-70` mid-submit. A permanently disabled Next button at
  reduced opacity still read as pressable, so disabled drops the gradient for
  a flat `--surface-raised` fill.
- **Status line, not a toast** — the website has no toast component; status is
  inline `role="status"` with an icon. The success notice follows that.

The left-rail illustrations (`scenes.tsx`) and headline copy are new — the
originals were generic blue stock art, and the site has no auth pages to
borrow from. Worth a review pass.

## Notes for the dev team

- **No colour is hard-coded in a component.** Restyle by editing
  `globals.css` only.
- **Tailwind v4 is CSS-first** — there is deliberately no `tailwind.config`,
  matching the website. Utilities like `bg-raised`, `text-muted`,
  `border-grid`, `font-display` come from the `@theme` blocks.
- **`ndi-effects.css` is a subset.** Pulling in another website effect
  (spotlight cards, circuit field, reveal-on-scroll) means copying that
  section across plus its one-line hook.
- `@property` registration for `--gradient-angle` is load-bearing for
  `ShinyButton`; without it the conic angle jumps instead of interpolating.
- 44px+ touch targets, hover displacement neutralised under
  `@media (hover: none)`, motion collapsed under `prefers-reduced-motion`.
- The logo is `ndi-mark.png`, cropped from the official
  `ndi-horizontal-white.png`. If you have the mark as SVG, swap it in — it
  will scale better than a 400px raster at 34px.
