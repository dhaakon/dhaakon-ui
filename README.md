# @dhaakon/ui

**The design system and React component library behind [dhaakon.com](https://dhaakon.com/)** — professional interfaces for research, homelab operations, experiments and editorial work, built on warm paper, near-black ink, hairlines, sharp corners and IBM Plex.

[Documentation](https://ui.dhaakon.com) · [npm](https://www.npmjs.com/package/@dhaakon/ui) · [Component atlas](https://ui.dhaakon.com/#/components) · [Storybook](https://ui.dhaakon.com/storybook/) · [Motion companion](https://motion.dhaakon.com) · [Changelog](CHANGELOG.md)

[![npm](https://img.shields.io/npm/v/@dhaakon/ui?color=ff5a1f)](https://www.npmjs.com/package/@dhaakon/ui) ![react](https://img.shields.io/badge/react-18%20%7C%2019-111) ![license](https://img.shields.io/badge/license-MIT-111)

---

## Contents

- [Why this kit](#why-this-kit)
- [Explore the docs](#explore-the-docs)
- [Install](#install)
- [Quick start](#quick-start)
- [Entry points](#entry-points)
- [Design tokens and theming](#design-tokens-and-theming)
- [Capability map](#capability-map)
- [Research instruments](#research-instruments)
- [Accessibility and interaction contracts](#accessibility-and-interaction-contracts)
- [Using it with @dhaakon/motion](#using-it-with-dhaakonmotion)
- [Agent skill: Claude Code and Codex](#agent-skill-claude-code-and-codex)
- [Develop and verify](#develop-and-verify)
- [Project structure](#project-structure)
- [Release boundaries and scope](#release-boundaries-and-scope)
- [Fonts and licensing](#fonts-and-licensing)

## Why this kit

- **One visual language.** Paper/ink surfaces, hairline rules, sharp corners and the full IBM Plex family (Sans, Serif, Mono, Condensed). Orange signals action; acid accents mark technical studies.
- **Three layers, one package.** Primitives (`@dhaakon/ui`), application and research composites (`/app`) and editorial patterns lifted from dhaakon.com (`/site`).
- **Accessible by construction.** Complex interactions use [React Aria](https://react-spectrum.adobe.com/react-aria/); everything else is semantic HTML with tested composition. Light/dark, compact/comfortable density and right-to-left locales are first-class.
- **Executable release checks.** Lint, strict types, unit tests, a packed-artifact/SSR check and a browser gate that walks every documented demo.

Version **0.5.2** is an original system benchmarked against professional UI-kit capabilities — not a claim of complete parity with any commercial kit. See [release boundaries and scope](#release-boundaries-and-scope) for what it does not claim.

## Explore the docs

| Page | What it shows |
| --- | --- |
| [Overview](https://ui.dhaakon.com) | Principles, layers and the component atlas |
| [Install](https://ui.dhaakon.com/#/install) | Package setup, CSS, provider |
| [Foundations](https://ui.dhaakon.com/#/foundations) | Color, type, spacing, density and motion tokens |
| [Components](https://ui.dhaakon.com/#/components) | Every component with live demo, source and props |
| [Research workbench](https://ui.dhaakon.com/#/workbench) | Composites running deterministic experiment fixtures |
| [Editorial practice](https://ui.dhaakon.com/#/editorial) | dhaakon.com's editorial patterns as components |
| [Accessibility lab](https://ui.dhaakon.com/#/accessibility) | Interaction contracts, theme and locale switching |
| [Showcase](https://ui.dhaakon.com/#/showcase) | Full application compositions |
| [Agent skill](https://ui.dhaakon.com/#/agent-skill) | How coding agents compose UI + motion |
| [Storybook](https://ui.dhaakon.com/storybook/) | Isolated states, controls and prop tables |

## Install

```sh
npm install @dhaakon/ui
# or: pnpm add @dhaakon/ui · yarn add @dhaakon/ui
```

**Peer dependencies:** `react` and `react-dom` 18 or 19. `lucide-react` is optional (used for icons in some demos). React Aria, `clsx` and `tailwind-merge` install automatically.

The docs site documents the current source, which can be ahead of the latest npm release — check [the published version](https://www.npmjs.com/package/@dhaakon/ui) before relying on a newly documented API. To try unreleased work, build a tarball from a clone with `npm run build && npm pack` and install that.

## Quick start

```tsx
import '@dhaakon/ui/styles.css';
import { DhaakonProvider, Button, Field, Input, Drawer } from '@dhaakon/ui';
import { CodeSnippet } from '@dhaakon/ui/app';

export function App() {
  return (
    <DhaakonProvider theme="dark" density="comfortable" locale="en-US">
      <Field label="Experiment name" hint="A stable, reproducible identifier.">
        <Input defaultValue="signal-041" />
      </Field>
      <Drawer title="Experiment manifest" trigger={<Button>Inspect</Button>}>
        <CodeSnippet language="json" code={'{"source":"local-simulation"}'} />
      </Drawer>
    </DhaakonProvider>
  );
}
```

`DhaakonProvider` establishes the baseline styles, toast host, locale and a scoped overlay host. It never mutates the document theme:

- omit `theme` to inherit the document/OS setting, or nest explicit `light`/`dark` scopes independently;
- `density="compact"` tightens controls for dense tools;
- `locale="ar-EG"` (or any RTL locale) switches formatting and interaction direction.

## Entry points

| Import | Purpose |
| --- | --- |
| `@dhaakon/ui` | Primitive controls, MultiSelect, Drawer, provider, utilities |
| `@dhaakon/ui/app` | Application and research composites |
| `@dhaakon/ui/site` | Original editorial patterns from dhaakon.com |
| `@dhaakon/ui/styles.css` | **Required** — tokens, component styles and bundled fonts |
| `@dhaakon/ui/theme.css` | Optional Tailwind v4 raw palette/type utilities |
| `@dhaakon/ui/tokens` | Build-time token data, without React |
| `@dhaakon/ui/fonts/*` | Bundled font assets and OFL notice |

## Design tokens and theming

CSS custom properties are the runtime source of truth; `@dhaakon/ui/tokens` exposes the same values for build-time use.

```ts
import { theme, density, motion } from '@dhaakon/ui/tokens';

theme.dark.accentText; // readable accent text, not raw orange
density.compact.md;    // '2rem'
motion.ease;           // 'cubic-bezier(0.16, 1, 0.3, 1)'
```

Use semantic text/surface tokens in theme-aware components. Raw orange is for signals and backgrounds; `--dhk-accent-text` is the readable text variant. Tailwind v4 projects can add `@dhaakon/ui/theme.css` for the raw palette and type utilities.

## Capability map

| Family | Shipped capabilities |
| --- | --- |
| Actions | Button, ButtonGroup, Menu/SubMenu, Toolbar |
| Forms | Field, Input, Textarea, Checkbox/Radio groups, Switch, Select, searchable MultiSelect, ComboBox, Slider, NumberField, SearchField |
| Dates / color / files | DateField, TimeField, Calendar/RangeCalendar, DatePicker/DateRangePicker, ColorPicker/ColorField/ColorSwatch, FileTrigger, DropZone |
| Collections | Table, React Aria DataTable and GridList, Tags, keyboard TreeView |
| Containment | Card, Tabs, Accordion, native Dialog, React Aria Modal/Popover/Drawer |
| Feedback | Alert, Toast, Progress/ring, Meter, Spinner/Skeleton, EmptyState, Tooltip |
| Identity / navigation | Logo, Avatar, FeaturedIcon, Breadcrumbs, Pagination |
| Application composition | AppShell, HeaderNav, SidebarNav, PageHeader, metrics, StatList, ActivityFeed, DataGrid, FilterBar, FileList, forms, OTP, confirmation, notifications, login/error pages |
| Research instruments | TelemetryChart, CodeSnippet, LogViewer, functional fixture workflows |
| Editorial | DisplayHeading, Marker, SectionIntro/SectionMarker, NumberedList, ProgramCard, OfferCard, ProcessStep, Segmented, CapabilityIndex, FieldNote, LogoMarquee, CtaLink, SiteFooter, StatusBar |

Related exports and visual variants are grouped rather than counted as separate capabilities.

## Research instruments

- **MultiSelect** — searchable multiple string-key selection, disabled options, validation, controlled/uncontrolled state and native form data.
- **Drawer** — logical-side modal inspector with contained scrolling, Escape dismissal and focus restoration.
- **TelemetryChart** — deterministic SVG, distinguishable series, keyboard sample inspection and an exact-value data table. Missing or non-finite data creates gaps rather than fabricated zeros.
- **CodeSnippet** — semantic plain-text source, line numbers, exact copy and visible clipboard failure. No HTML injection, no syntax-parser claim.
- **LogViewer** — caller-supplied events, search/level filters, a bounded cloned pause snapshot, resume and reversible order. No backend connection.

The [workbench](https://ui.dhaakon.com/#/workbench) runs, stops, filters, inspects and exports deterministic experiment fixtures. It discloses that it does not contact or change any infrastructure.

## Accessibility and interaction contracts

- Use the kit `Button` (or React Aria's) with Aria triggers. Native `onClick`, `disabled`, form attributes and refs keep working; `onPress` and `isPending` are additive.
- `Field` associates its label, hint, error and required state with the control.
- `Tabs` keeps `value` / `defaultValue` / `onValueChange` while using React Aria behavior.
- `VerificationCodeInput` keeps its digits-string API but renders one native OTP input with visual cells, so selection, deletion and autofill behave normally.

Application content still needs accessible names, meaningful error recovery and assistive-technology testing. Automated checks are not screen-reader certification.

## Using it with @dhaakon/motion

[`@dhaakon/motion`](https://github.com/dhaakon/dhaakon-motion) is the companion animation engine. The kit's motion tokens (`motion.ease`, durations) are shared with motion's CSS-first `cssMotion` API, and the [motion docs](https://motion.dhaakon.com) are built with this kit.

The [agent skill](#agent-skill-claude-code-and-codex) below teaches coding agents to compose both packages.

## Agent skill: Claude Code and Codex

[`skills/dhaakon-ui-motion/`](https://github.com/dhaakon/dhaakon-motion/tree/main/skills/dhaakon-ui-motion) is a version-controlled skill that teaches a coding agent how `@dhaakon/ui` and `@dhaakon/motion` fit together: which layer to choose, who owns each animated property, the accessibility contracts, and how to verify the result. One canonical folder serves both tools — install it with a symlink so documentation and agent behavior cannot drift.

| | Claude Code | Codex |
| --- | --- | --- |
| Personal install | `~/.claude/skills/dhaakon-ui-motion` | `$CODEX_HOME/skills/dhaakon-ui-motion` (default `~/.codex`) |
| Per-project install | `.claude/skills/dhaakon-ui-motion` in the consumer repo | — |
| Invoke | `/dhaakon-ui-motion …`, or automatically when the task matches | `Use $dhaakon-ui-motion to …` |
| Display metadata | `SKILL.md` frontmatter | `agents/openai.yaml` |

```sh
# from a dhaakon-motion checkout
mkdir -p ~/.claude/skills "${CODEX_HOME:-$HOME/.codex}/skills"
ln -s "$PWD/skills/dhaakon-ui-motion" ~/.claude/skills/dhaakon-ui-motion
ln -s "$PWD/skills/dhaakon-ui-motion" "${CODEX_HOME:-$HOME/.codex}/skills/dhaakon-ui-motion"
```

Start a new agent session afterwards so skill discovery refreshes. Using the skill never grants permission to publish, deploy, push or upgrade packages. The full guide is on [ui.dhaakon.com](https://ui.dhaakon.com/#/agent-skill) and [motion.dhaakon.com](https://motion.dhaakon.com/agent-skill).

## Develop and verify

Requirements: **Node 24** and an installed Chromium/Chrome for the browser gate (`CHROME_PATH` overrides its location).

```sh
npm ci
npm --prefix docs ci

npm run storybook                   # Storybook on :6006
npm --prefix docs run dev           # docs site on :5174, resolves current source

npm run check                       # lint, strict types, tests, build, packed artifact/SSR
npm --prefix docs run build         # TypeScript errors fail the build
npm --prefix docs run check:routes  # starts a temporary loopback static server
npm run build-storybook
```

| Script | What it does |
| --- | --- |
| `npm run build` | Type declarations, library bundle and CSS into `dist/` |
| `npm test` | Vitest unit and interaction tests |
| `npm run lint` / `typecheck` | ESLint and strict TypeScript |
| `npm run check:package` | Verifies the packed tarball's exports and SSR import |
| `npm run check:peers` | Verifies peer-dependency ranges |

The browser gate walks the catalogue, verifies actual demos and their source, runs axe accessibility checks and exercises keyboard, workbench, theme/portal and mobile flows. Reports and screenshots land in the ignored `test-results/`. The harness is self-contained — no sibling repository or deployed service is required.

### Building the docs site

The docs site imports the kit from `../src`, so it always documents the working tree. Two build-time variables set its cross-links:

| Variable | Default | Public value |
| --- | --- | --- |
| `VITE_STORYBOOK_URL` | internal Storybook | `https://ui.dhaakon.com/storybook/` |
| `VITE_MOTION_DOCS_URL` | internal motion docs | `https://motion.dhaakon.com` |

`Dockerfile.docs` builds the static site and serves it with nginx; the output in `docs/dist/` can equally be uploaded to any static host. The site uses hash routing, so no rewrite rules are needed.

Documentation modules, demos and source snippets load on demand, and every demo has explicit loading/missing/error behavior. The React Aria portal adapter uses `UNSAFE_PortalProvider`; `react-aria` and `react-aria-components` are pinned as a compatible pair and must be upgraded together.

## Project structure

```
src/
  components/   primitives — one folder per component, with stories and tests
  app/          application and research composites (@dhaakon/ui/app)
  site/         editorial patterns from dhaakon.com (@dhaakon/ui/site)
  styles/       tokens, component CSS and bundled IBM Plex fonts
  tokens.ts     build-time token data (@dhaakon/ui/tokens)
docs/           the documentation site (Vite + React, hash-routed)
scripts/        CSS build, notices, package and peer checks
tests/          browser gate and integration tests
```

## Release boundaries and scope

Versioned commits and tags, docs deployments, npm publishing and consumer upgrades are separate steps — a docs deployment never silently upgrades another application. Tags: `v0.5.0`, `v0.5.1`, `v0.5.2`. To release, update `CHANGELOG.md`, bump the version, commit and tag, then run `npm publish` — `prepublishOnly` runs `npm run check` first and `publishConfig` publishes publicly to npmjs.

Not claimed: a Figma library, rich-text editor, GPU charting, production log ingestion, or a virtualized/editable spreadsheet engine. `DataGrid` is a toolbar/table/footer layout, not that engine. See the [contribution notes](CONTRIBUTING.md) for the development workflow.

## Fonts and licensing

The kit's own code is [MIT licensed](LICENSE). IBM Plex fonts are bundled unchanged under the SIL Open Font License 1.1; the [upstream copyright and license](https://github.com/IBM/plex/blob/master/LICENSE.txt) ship in `dist/fonts/OFL.txt`. Third-party dependencies retain their respective licenses.
