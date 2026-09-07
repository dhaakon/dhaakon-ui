# @dhaakon/ui

Coding agents can use the version-controlled `$dhaakon-ui-motion` skill from the
sibling `dhaakon-motion/skills/dhaakon-ui-motion/` checkout to compose this kit with
`@dhaakon/motion` while preserving accessibility, token, execution-path, lifecycle,
and verification contracts.

The creative technology toolkit for the dhaakon-network: professional interfaces for research, homelab operations, experiments and editorial work.

Version **0.5.0** combines Dhaakon’s paper/ink/Plex identity with a working research instrument, repaired interaction foundations and executable release checks. It is an original system, benchmarked against professional UI-kit capabilities—not a claim of complete Untitled UI parity.

[Baseline audit](AUDIT.md) · [Changes](CHANGELOG.md) · [Development contracts](CONTRIBUTING.md) · [Verification](VERIFICATION.md)

## Explore

- [Documentation and component atlas](http://dhaakon-ubuntu:21763)
- [Research workbench](http://dhaakon-ubuntu:21763/#/workbench)
- [Editorial practice](http://dhaakon-ubuntu:21763/#/editorial)
- [Interaction contracts and theme/locale lab](http://dhaakon-ubuntu:21763/#/accessibility)
- [Storybook: isolated states, controls and prop tables](http://dhaakon-ubuntu:21762)
- [Companion motion graphics](http://dhaakon-ubuntu:21764/svg-cue-sheet)

The public practice at [dhaakon.com](https://dhaakon.com/) supplies the visual language: warm paper, near-black ink, hairlines, sharp corners and IBM Plex Sans/Serif/Mono/Condensed. Orange signals action; acid accents distinguish the technical studies. Complex interactions use React Aria; semantic HTML and tested composition handle the rest.

## Use

```sh
npm install @dhaakon/ui
```

The package is configured for the network registry at :21760. A source/docs release does not automatically publish a registry version. For a local build, use `npm run build && npm pack` and install the resulting tarball.

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

The provider establishes the baseline, toast host, locale and scoped overlay host. Explicit light/dark scopes nest independently. Omit theme to inherit the document/OS setting; use `density="compact"` for dense controls and `locale="ar-EG"` for right-to-left formatting/interaction. It does not mutate the document theme.

## Entry points

| Import | Purpose |
| --- | --- |
| `@dhaakon/ui` | Primitive controls, MultiSelect, Drawer, provider, utilities |
| `@dhaakon/ui/app` | Application and research composites |
| `@dhaakon/ui/site` | Original editorial patterns |
| `@dhaakon/ui/styles.css` | Required tokens, component styles and bundled fonts |
| `@dhaakon/ui/theme.css` | Optional Tailwind v4 raw palette/type utilities |
| `@dhaakon/ui/tokens` | Build-time token data, without React |
| `@dhaakon/ui/fonts/*` | Bundled font assets and OFL notice |

```ts
import { theme, density, motion } from '@dhaakon/ui/tokens';

theme.dark.accentText; // readable accent text, not raw orange
density.compact.md;    // '2rem'
motion.ease;           // 'cubic-bezier(0.16, 1, 0.3, 1)'
```

CSS is the runtime source of truth. Use semantic text/surface tokens in theme-aware components. Raw orange remains appropriate for signals and backgrounds; `--dhk-accent-text` is designed for readable text.

## Capability map

| Family | Shipped capabilities |
| --- | --- |
| Actions | Button, ButtonGroup, Menu/SubMenu, Toolbar |
| Forms | Field, Input, Textarea, Checkbox/Radio groups, Switch, Select, searchable MultiSelect, ComboBox, Slider, NumberField, SearchField |
| Dates/color/files | DateField, TimeField, Calendar/RangeCalendar, DatePicker/DateRangePicker, ColorPicker/ColorField/ColorSwatch, FileTrigger, DropZone |
| Collections | Table, React Aria DataTable and GridList, Tags, keyboard TreeView |
| Containment | Card, Tabs, Accordion, native Dialog, React Aria Modal/Popover/Drawer |
| Feedback | Alert, Toast, Progress/ring, Meter, Spinner/Skeleton, EmptyState, Tooltip |
| Identity/navigation | Logo, Avatar, FeaturedIcon, Breadcrumbs, Pagination |
| Application composition | AppShell, HeaderNav, SidebarNav, PageHeader, metrics, StatList, ActivityFeed, DataGrid, FilterBar, FileList, forms, OTP, confirmation, notifications, login/error pages |
| Research instruments | TelemetryChart, CodeSnippet, LogViewer, functional fixture workflows |
| Editorial | DisplayHeading, Marker, SectionIntro/SectionMarker, NumberedList, ProgramCard, OfferCard, ProcessStep, Segmented, CapabilityIndex, FieldNote, LogoMarquee, CtaLink, SiteFooter, StatusBar |

Related exports and visual variants are grouped rather than counted as separate capabilities. The catalogue distinguishes three UI layers from the separate motion package.

### Research instruments

- **MultiSelect:** searchable, multiple string-key selection, disabled options, validation, controlled/uncontrolled state and native form data.
- **Drawer:** logical-side modal inspector with contained scrolling, Escape dismissal and focus restoration.
- **TelemetryChart:** deterministic SVG, distinguishable series, keyboard sample inspection and exact-value data table. Missing/nonfinite data creates gaps rather than fabricated zeros.
- **CodeSnippet:** semantic plain-text source, line numbers, exact copy and visible clipboard failure. No HTML injection or syntax-parser claim.
- **LogViewer:** caller-supplied events, search/level filters, bounded cloned pause snapshot, resume and reversible order. No backend connection.

The workbench runs, stops, filters, inspects and exports deterministic experiment fixtures. The motion composition simulates deployment stages. Both clearly disclose that they do not contact or change infrastructure.

### Interaction contracts

Use the kit Button or React Aria Button with Aria triggers. Existing native `onClick`, `disabled`, form attributes and refs remain supported; `onPress` and `isPending` are additive. Field labels/errors/required state associate with their control. Tabs retain `value/defaultValue/onValueChange` while using React Aria behavior. VerificationCodeInput retains its digits-string API but now uses one native OTP input with visual cells, supporting normal selection/deletion and autofill.

Application content still needs accessible names, meaningful error recovery and assistive-technology testing. Automated checks are not screen-reader certification.

## Develop and verify

Use Node 24 and an installed Chromium/Chrome. `CHROME_PATH` overrides its location.

```sh
npm ci
npm --prefix docs ci
npm run storybook                  # :6006
npm --prefix docs run dev          # :5174, resolves current source

npm run check                     # lint, strict types, tests, build, packed artifact/SSR
npm --prefix docs run build        # TypeScript errors fail the build
npm --prefix docs run check:routes # starts a temporary loopback static server
npm run build-storybook
```

The browser gate walks the catalogue, verifies actual demos and their source, runs accessibility checks and exercises keyboard, workbench, theme/portal and mobile flows. Reports/screenshots are generated in ignored `test-results/`. The harness is self-contained; no sibling repository or deployed homelab is required.

Documentation modules, demos and source snippets load on demand. Every demo has explicit loading/missing/error behavior. The React Aria portal adapter currently uses `UNSAFE_PortalProvider`; `react-aria` and `react-aria-components` are deliberately pinned as a compatible pair and must be upgraded together.

## Release boundaries

The audit is preserved on `audit/ui-system-2026-09-05`. Implementation is on `feat/ui-research-system-v0.5.0`. Versioned commits/tags, docs deployments, registry publishing and consumer upgrades are separate steps. Nothing in a docs deployment silently upgrades another application.

No claims of a Figma library, rich-text editor, GPU charting, production log ingestion or a virtualized/editable spreadsheet engine. DataGrid is a toolbar/table/footer layout, not that engine. See the audit and verification record for scope and remaining manual checks.

## Fonts and licensing

IBM Plex fonts are bundled unchanged under the SIL Open Font License 1.1. The [upstream copyright and license](https://github.com/IBM/plex/blob/master/LICENSE.txt) ship in `dist/fonts/OFL.txt`. The kit's package declares MIT for its own code; third-party dependencies retain their respective licenses.
