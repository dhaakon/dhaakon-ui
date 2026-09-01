# @dhaakon/ui

The design system and React component library for the **dhaakon-network** —
the console, the dashboard, and the apps teams generate.

Its visual language is taken directly from **dhaakon.com**: warm paper ground,
near-black ink, hairline rules instead of shadows, **sharp corners** (the only
curve in the system is a full circle), **IBM Plex** throughout, uppercase
letter-spaced labels, light body weight, one decisive accent.

Workshopped in **Storybook**; published to the network Verdaccio; versioned in
Gitea and iterated on as dhaakon.com and the apps evolve.

---

## Develop

```sh
npm install
npm run storybook     # http://localhost:6006
```

| Script | Does |
|---|---|
| `npm run storybook` | Storybook dev server |
| `npm run build` | build the library → `dist/` (ESM + `.d.ts` + `dhaakon-ui.css` + fonts) |
| `npm run build-storybook` | static Storybook → `storybook-static/` |
| `npm run typecheck` | `tsc --noEmit` |

Storybook is also served in the network stack at
**http://localhost:21762** (`dhaakon-ui` service in
`dhaakon-network/docker-compose.yml`). Rebuild that image after a change:

```sh
docker build -t dhaakon/dhaakon-ui:latest ~/Development/ai/dhaakon-ui
docker compose -f ~/Development/dhaakon-network/docker-compose.yml up -d dhaakon-ui
```

## Consume

```sh
npm install @dhaakon/ui        # resolves via .npmrc → Verdaccio at :21760
```

```tsx
// once, at the app entry
import '@dhaakon/ui/styles.css';

import { DhaakonProvider, Button, Card, CardBody, Field, Input, useToast } from '@dhaakon/ui';

function App() {
  return (
    <DhaakonProvider>
      <Card>
        <CardBody>
          <Field label="Team name"><Input placeholder="skunkworks" /></Field>
          <Button variant="accent">Engage</Button>
        </CardBody>
      </Card>
    </DhaakonProvider>
  );
}
```

`DhaakonProvider` establishes the `.dhk-root` baseline (Plex, paper ground,
`box-sizing`) and mounts the toast host. Pass `theme="dark"` to force a theme;
omit it to follow `data-theme` on `<html>` or the OS setting.

### Entry points

| Import | Contents |
|---|---|
| `@dhaakon/ui` | app components + `cn` + `tokens` |
| `@dhaakon/ui/site` | the editorial page patterns from dhaakon.com (see below) |
| `@dhaakon/ui/styles.css` | tokens, `@font-face` (IBM Plex), all component CSS — **required**, one import |
| `@dhaakon/ui/theme.css` | optional Tailwind v4 `@theme` (`bg-paper`, `text-ink`, `font-mono`, …) |
| `@dhaakon/ui/tokens` | tokens as data, no React |

### Tailwind v4 apps

```css
@import 'tailwindcss';
@import '@dhaakon/ui/theme.css';
```

### Tokens as data

```ts
import { tokens } from '@dhaakon/ui';
tokens.color.accent;   // '#ff5a1f'
tokens.motion.ease;    // 'cubic-bezier(0.16, 1, 0.3, 1)'
```

## Components (v0.1)

Foundations — colour, typography, spacing, motion — plus:

| Component | Notes |
|---|---|
| `Button` | `primary` (ink → accent on hover) · `accent` · `outline` · `ghost` · `link`; `sm`/`md`/`lg`; icon slots |
| `Field` + `Input` + `Textarea` | `Field` wires `label` / `id` / `aria-describedby` / `aria-invalid` to one control; `mono` variant |
| `Card` (`CardHeader` / `CardBody` / `CardFooter`) | `raised`, `interactive`, `flush` |
| `Badge` | `neutral` / `accent` / `info` / `success` / `warning` / `danger`; `solid`, `dot` |
| `Tabs` (`TabList` / `Tab` / `TabPanel`) | roving tabindex, arrow-key nav, controlled or uncontrolled |
| `Table` | `columns` + `data`, `numeric` columns, `dense`, `hoverable`, `empty` slot |
| `Dialog` | native `<dialog>` — real focus trap, `Esc`, inert background; controlled `open` |
| `Toast` (`ToastProvider` + `useToast`) | queued, tone-coded, auto-dismiss |

Every component ships a story with an autodocs page and an a11y check
(`@storybook/addon-a11y`).

## Site patterns — `@dhaakon/ui/site`

The recurring editorial blocks from **dhaakon.com**, rebuilt as components.
`Site/Landing Page` in Storybook recomposes the whole homepage from them.

| Component | dhaakon.com pattern |
|---|---|
| `StatusBar` | `Listening · Brooklyn, NY · Remote / N. America` top strip |
| `Marker` | the glyph vocabulary — `↗ ↘ ↔ ◎ + − ↳ ≠` |
| `SectionMarker` / `SectionIntro` | `[ 01 ] The approach ↘` → statement → serif subtitle → lead |
| `DisplayHeading` | oversized Plex line with scattered, staggered mono annotations |
| `NumberedList` / `NumberedItem` | the collapsible `01 … Adoption ≠ impact −` failure-signal list |
| `LogoMarquee` | the infinite client wall (pauses on hover) |
| `ProgramCard` | `02 / 04 · 8–16 weeks` header, `↳` points, "You get" payoff |
| `OfferCard` | `[ 01 ] Diagnostic & Keynote`, `+` list, CTA |
| `ProcessStep` | `01 Listen … Output — workflow map` transfer sequence |
| `Segmented` | numbered pill switcher + `01 / 03` counter |
| `CapabilityIndex` | `08 capabilities` numbered grid |
| `FieldNote` | `[Field note 02.1]` serif margin aside |
| `CtaLink` | underlined uppercase "Let's engage and discuss details ↗" |
| `SiteFooter` | email + nav + copyright |

## Design tokens

The CSS custom properties in `styles.css` (prefixed `--dhk-`) are the runtime
source of truth. `src/tokens.ts` mirrors them for build-time use (charts,
canvas, email). Keep the two in sync.

| Group | Highlights |
|---|---|
| Ground / ink | `--dhk-paper #f0eee8`, `--dhk-paper-bright #faf9f5`, `--dhk-ink #101010` |
| Accents | `--dhk-orange #ff5a1f` (accent), `--dhk-blue #2d62ff` (focus / info), `--dhk-violet`, `--dhk-acid` |
| Type | IBM Plex Sans / Serif / Mono / Sans Condensed · weights 300 / 400 / 600 |
| Shape | `--dhk-radius: 0` — sharp. `--dhk-radius-full` for circles only |
| Motion | one curve, `cubic-bezier(0.16, 1, 0.3, 1)`; 120 / 200 / 360 ms |

Dark theme: set `data-theme="dark"` on `<html>` or add `.dhk-dark` to a subtree
(or `<DhaakonProvider theme="dark">`). Without either, it follows
`prefers-color-scheme`.

## Publishing

```sh
npm run build
npm publish            # → http://localhost:21760/ (Verdaccio)
```

Bump the version, tag, and push. Consumers pick it up on their next `npm install`.

## Fonts

IBM Plex woff2 (Light / Regular / SemiBold per family, plus Serif Light Italic)
are vendored in `src/styles/fonts/` and shipped in `dist/fonts/`. IBM Plex is
licensed under the SIL Open Font License 1.1.
