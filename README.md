# @dhaakon/ui

The design system and React component library for the **dhaakon-network** —
the console, the dashboard, and the apps teams generate.

Its visual language is taken directly from **dhaakon.com**: warm paper ground,
near-black ink, hairline rules instead of shadows, **sharp corners** (the only
curve in the system is a full circle), **IBM Plex** throughout, uppercase
letter-spaced labels, light body weight, one decisive accent.

Interactive components are built on **React Aria** — keyboard behaviour, focus
management, screen-reader semantics and RTL come from Adobe's primitives, and
everything here is appearance, styled in plain CSS off their `data-*` states.

Two places to look:

| | |
|---|---|
| **Docs site** — guide, foundations, component gallery with live previews | http://localhost:21763 |
| **Storybook** — the workshop: controls, generated prop tables, a11y checks | http://localhost:21762 |

---

## Develop

```sh
npm install
npm run storybook     # http://localhost:6006
```

| Script | Does |
|---|---|
| `npm run storybook` | Storybook dev server (:6006) |
| `npm run build` | build the library → `dist/` (ESM + `.d.ts` + `dhaakon-ui.css` + fonts) |
| `npm run build-storybook` | static Storybook → `storybook-static/` |
| `npm run typecheck` | `tsc --noEmit` |
| `cd docs && npm run dev` | docs site dev server (:5174) — reads the kit from `../src`, so it always shows the working tree |

Both are served in the network stack (`dhaakon-ui` and `dhaakon-ui-docs` in
`dhaakon-network/docker-compose.yml`). Rebuild after a change:

```sh
cd ~/Development/ai/dhaakon-ui
COMPOSE=~/Development/dhaakon-network/docker-compose.yml

# Storybook → :21762
docker build -t dhaakon/dhaakon-ui:latest .
docker compose -f $COMPOSE up -d dhaakon-ui

# Docs site → :21763
docker build -f Dockerfile.docs -t dhaakon/dhaakon-ui-docs:latest \
  --build-arg VITE_STORYBOOK_URL=http://localhost:21762 .
docker compose -f $COMPOSE up -d dhaakon-ui-docs
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

## Components

26 components. Those marked **aria** are built on React Aria; the rest are
plain React where no interaction pattern needed rescuing.

### Actions
| Component | Notes |
|---|---|
| `Button` | `primary` (ink → accent on hover) · `accent` · `outline` · `ghost` · `link`; `sm`/`md`/`lg`; icon slots |
| `ButtonGroup` | joins buttons into one unit, collapsing the shared hairline |
| `Menu` **aria** | `Menu` / `MenuItem` / `MenuGroup` / `MenuSeparator`; typeahead, arrow keys, focus restoration |

### Forms
| Component | Notes |
|---|---|
| `Field` + `Input` + `Textarea` | `Field` wires label / id / `aria-describedby` / `aria-invalid` to one control; `mono` variant |
| `Checkbox` + `CheckboxGroup` **aria** | `isIndeterminate` for parent rows; group-level validation |
| `Radio` + `RadioGroup` **aria** | arrow keys move and wrap; per-option descriptions |
| `Switch` **aria** | square knob on a hairline track; `labelPosition` |
| `Select` + `SelectItem` **aria** | popover listbox, typeahead, collision-aware placement |
| `ComboBox` **aria** | filter-as-you-type; `allowsCustomValue`, `searchIcon`, empty state |
| `Slider` **aria** | one thumb or two; `formatOptions` for percent/currency |

### Containment
| Component | Notes |
|---|---|
| `Card` (`CardHeader` / `CardBody` / `CardFooter`) | `raised`, `interactive`, `flush` |
| `Tabs` (`TabList` / `Tab` / `TabPanel`) | roving tabindex, arrow-key nav, controlled or uncontrolled |
| `Accordion` + `AccordionItem` **aria** | single or `allowsMultipleExpanded`; real heading levels |
| `Dialog` | native `<dialog>` — real focus trap, `Esc`, inert background |

### Data
| Component | Notes |
|---|---|
| `Table` | `columns` + `data`, `numeric` columns, `dense`, `hoverable`, `empty` slot |
| `Badge` | read-only status; `neutral`/`accent`/`info`/`success`/`warning`/`danger`, `solid`, `dot` |
| `Tag` + `TagGroup` + `TagList` **aria** | selectable and removable chips; Backspace to remove |
| `Avatar` + `AvatarGroup` | image with initials fallback, status dot, `+N` overflow |

### Feedback
| Component | Notes |
|---|---|
| `Alert` | inline, tone-coded; assertive for `danger`/`warning`, polite otherwise |
| `Toast` (`ToastProvider` + `useToast`) | queued, tone-coded, auto-dismiss |
| `Progress` + `ProgressRing` **aria** | determinate or indeterminate; ring for dashboard tiles |
| `Spinner` + `Skeleton` | skeletons are `aria-hidden`; put `aria-busy` on the region |
| `EmptyState` | icon, copy and the way out |
| `Tooltip` **aria** | warmup delay, touch suppression, `aria-describedby` |
| `FeaturedIcon` | icon in a bordered frame; tones, `solid`, `circle` |

### Navigation
| Component | Notes |
|---|---|
| `Breadcrumbs` + `Breadcrumb` **aria** | final crumb gets `aria-current="page"` |
| `Pagination` | elided window (1 … 4 5 6 … 20); `compact` for cursor sources |

Every component ships a story with an autodocs page and an a11y check
(`@storybook/addon-a11y`), and a page on the docs site with a live, copyable
example.

### Why React Aria

Untitled UI's central engineering choice, and the same one here. A
`role="listbox"` does nothing on its own — typeahead, roving tabindex, focus
restoration and collision-aware positioning are what make a Select usable, and
they are where hand-rolled components quietly fail.

React Aria ships *unstyled* primitives that expose their state as `data-*`
attributes, so appearance stays here:

```css
.dhk-select-trigger[data-open]  { border-color: var(--dhk-ink); }
.dhk-checkbox[data-selected]    { … }
.dhk-tag[data-focus-visible]    { … }
```

`react-aria-components` is a dependency and stays external in the build, so an
app already using it shares one copy.

## Docs site — `docs/`

A Vite + React app that documents the kit **and is built with it**. It imports
`@dhaakon/ui` through a source alias to `../src`, so the site always reflects
the working tree, and every code sample is the same file that renders the
preview above it — they cannot drift.

```sh
cd docs && npm install && npm run dev    # :5174
```

Pages: overview, install guide, foundations (live token tables), component
gallery, and a page per component with guidance, a live demo, the import line
and a link through to its Storybook prop table.

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
