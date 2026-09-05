# UI system audit — 2026-09-05

Baseline: `@dhaakon/ui@0.4.1`, commit `c1d9254`. Audit branch: `audit/ui-system-2026-09-05`.

## Assessment

The kit has a distinctive visual foundation and broad coverage, but the baseline is not yet a reliable professional workbench. We benchmark capabilities, not commercial template counts. There are 44 primitive implementation modules, 21 application modules and 14 editorial/site modules. Re-exports, story variants and companion motion APIs are not separate kit capabilities.

The intended identity is a creative technologist's working instrument: research, homelab operations and reproducible experiments. Preserve Plex Sans/Serif/Mono, warm paper, ink, square corners, hairlines and orange signals. Use dense technical surfaces, deterministic vector diagrams and restrained acid highlights where they communicate actual state.

## Verified baseline defects

| Priority | Finding | Evidence / acceptance requirement |
| --- | --- | --- |
| P1 | React Aria overlay triggers do not activate | Kit Button is native and does not consume the trigger context. Deployed Modal and ConfirmDialog clicks open zero dialogs. Test mouse and keyboard activation, Escape and focus return. |
| P1 | Visible form labels are disconnected | Select, SearchField, ComboBox, number/date/color controls and groups use plain spans instead of React Aria label/description/error slots. Test accessible names and actual ID references. |
| P1 | Command search does not filter | Typing `dashboard` leaves all six items visible. Bare Input is not consuming Autocomplete's field context. Test filtering and keyboard action. |
| P1 | Mobile docs are unusable | At 390px the document is 628px wide and main content begins at y=3499 after the entire sidebar. Require no horizontal page overflow and collapsible navigation. |
| P1 | Small text and accent contrast fail | Subtle ink on paper is about 2.89:1; paper on orange about 2.69:1. Correct semantic tokens without discarding brand colors. |
| P1 | Lint does not parse TypeScript | `npm run lint`: 230 parsing errors. Root typecheck and docs typecheck pass, but docs build explicitly masks type errors with `|| true`. |
| P2 | Tabs, tree and verification input have broken interaction | Tabs may have no tab stop and navigate disabled tabs. Tree changes only visual focus. Typing into an empty fourth OTP cell populates the first. Cover keyboard and positional editing. |
| P2 | Overlay and feedback lifecycle gaps | Dialog uses shared IDs and can reference missing description. Toast timers survive unmount and do not pause during interaction. |
| P2 | Field and DataTable composition lose caller intent | Field can leave dangling hint references and conflicting child IDs; DataTableBody overrides caller empty-state renderer. |
| P2 | Themes are incomplete | Nested explicit light surfaces and portals need reliable theme inheritance. Contrast and reduced-motion behavior need executable checks. |
| P2 | Docs bundle and checks conceal missing coverage | Initial JS is 1,284,941 decoded bytes. All demos and source snippets are eager. Missing demos return null; route checks only require the sidebar. Site exports are absent from the catalogue. |
| P2 | Regression and package verification are absent | No component test command. Storybook's accessibility addon is not a regression suite. Verify packed entry points, CSS assets and documented workflows. |

Measurements were taken from the deployed baseline at `http://dhaakon-ubuntu:21763`, with local source inspection and real Chrome interaction. Automated checks complement, not replace, assistive-technology testing.

## Capability benchmark

| Capability | Baseline | Release direction |
| --- | --- | --- |
| Forms, actions, collections and overlays | Broad, but composition defects | Repair behavior; searchable MultiSelect and inspector drawer |
| Professional telemetry | Metrics and decorative sparkline | Labeled SVG chart with data-table alternative |
| Developer/research surfaces | Documentation-only code, generic feeds | Public code snippet and searchable/pauseable log viewer |
| Application patterns | Shell and animated dashboard | Functional research workbench, inspection and reproducible local fixtures |
| Editorial identity | Existing site entry, missing docs | Dedicated editorial showcase and honest entry-point coverage |
| Production confidence | Typecheck, manual stories | Interaction tests, accessibility checks, all-route browser checks and package smoke |

`DataGrid` is a layout wrapper, not a grid engine. A sparkline is not a charting system. React Aria supplies interaction primitives, not every visualization or editor. Native semantic components are valid; direct React Aria import counts are not accessibility scores.

## Scope and honest exclusions

This release will not claim complete Untitled UI parity, screen-reader certification, a Figma asset library, a rich-text editor, GPU charting, backend monitoring, production log ingestion or advanced editable/virtualized/resizable grids. These remain explicit roadmap candidates. Demonstration telemetry must be identified as simulated. Existing entry points and consumer APIs should remain compatible wherever possible; any changed behavior must be documented.

## Reference material

- [Untitled UI React catalogue](https://www.untitledui.com/react/components): capability breadth across forms, application patterns, charts, drawers and developer surfaces.
- [React Aria](https://react-aria.adobe.com/): interaction, focus, keyboard and internationalization foundations.
- [React Aria Select](https://react-aria.adobe.com/Select): installed library supports multiple selection; no replacement select dependency is necessary.
- [React Aria Tree](https://react-aria.adobe.com/Tree): collection semantics and navigation reference.
- [Untitled charts](https://www.untitledui.com/react/components/line-bar-charts) and [code snippets](https://www.untitledui.com/react/components/code-snippets): benchmark outcomes, not a claim that these are supplied by React Aria.
- [dhaakon.com](https://dhaakon.com/): original identity and editorial/technical composition.
- [Dhaakon motion cue sheet](http://dhaakon-ubuntu:21764/svg-cue-sheet): inspectable vector motion and production controls.

Implementation results and remaining limitations will be recorded in the changelog and verification documentation on the release branch.
