# Private patch verification - 0.5.1

Date: 2026-09-08. Scope: use semantic text colors for slider fill, thumb and thumb border, so resting sliders remain visible in dark and nested themes.

- `npm run check`: lint, strict types, 148 tests, production build and packed artifact/SSR checks passed.
- `npm --prefix docs run build` and `npm run build-storybook` passed. Storybook retains its existing large-chunk warning.
- `npm --prefix docs run check:routes`: 102 routes and 10 interaction gates passed with zero failures, including theme, portal, mobile, fonts and reduced-motion checks. The first invocation timed out at the initial Chrome Page.navigate; the full retry passed.
- Real Chrome computed-style checks against the built styles passed for light, dark and both nested theme combinations. Resting slider thumb contrast is 16.40:1 on light and 16.76:1 on dark; fill and thumb border match the thumb.
- Compared the build with the private registry's published 0.5.0 tarball: every runtime artifact is byte-identical except `dist/controls.css`.

This patch is released only to the existing private registry at `http://dhaakon-ubuntu:21760/`. It does not deploy library documentation/services or upgrade consumers. The earlier assistive-technology and browser coverage limits below still apply.

---

# Release verification — 0.5.0

Date: 2026-09-05. Baseline: `c1d9254` / 0.4.1. The baseline assessment is preserved in `AUDIT.md` on `audit/ui-system-2026-09-05`; implementation lives on `feat/ui-research-system-v0.5.0`.

## Reproducible gates

```sh
npm run check
npm run check:peers
npm --prefix docs run build
npm --prefix docs run check:routes
npm run build-storybook
```

Local verification uses Node 24.20.0, npm 11.19.0 and Chrome 152.0.7977.64. Build scripts fail on type errors. The browser runner owns its temporary profile and local static server; generated reports/screenshots are ignored under `test-results/`.

| Gate | Release result |
| --- | --- |
| Lint, strict root types and library build | Pass |
| Component/integration suite | 148 tests in 20 files passed |
| Actual package extraction | 47 files; four ESM/declaration entries; CSS, 13 fonts, license and SSR checks passed |
| Isolated React consumers | React/React DOM 18.3.1 and 19.2.0: strict declarations, correct dependency resolution and core/app/site SSR passed |
| Docs production build | TypeScript and Vite passed |
| Full built-site browser suite | 101 routes, 202 light/dark route scans, ten additional gates; zero route/workflow failures and zero pages with axe violations |
| Initial overview JavaScript | 415,015 decoded bytes |
| Font loading | All 13 Plex faces loaded successfully |
| Storybook production build | Passed; 206 stories and 45 documentation entries indexed |
| Dependency advisory checks | Root and docs `npm audit` each reported zero known vulnerabilities at verification time |
| Whitespace / patch integrity | `git diff --check` passed |

Storybook emits large-chunk warnings for its preview/docs/accessibility tooling; these are not suppressed. The docs overview is independently budgeted. Advisory checks do not constitute an operating-system/container security audit.

The development server was checked separately: Vite serves the intended sibling kit fonts with HTTP 200, Chrome reports actual custom Plex glyphs rather than fallback fonts, and files outside the allowed docs/source directories remain blocked.

## What the checks cover

- Unit/integration tests exercise trigger composition, names/descriptions, conditional and native validation, keyboard selection, OTP editing, lifecycle cleanup, nested provider state and the new research components.
- The packed-artifact check extracts the actual npm tarball, imports all four public ESM/declaration entries, resolves CSS/font assets and server-renders representative components. The peer matrix installs that tarball into isolated React 18.3.1 and 19.2.0 consumers and checks strict declarations with `skipLibCheck: false` plus SSR.
- Real Chrome visits every one of the 101 documented routes: eight top-level pages and 93 examples. The examples comprise 81 kit entries and 12 explicitly separate companion-motion entries. This is a documentation-entry count, not a count of independent primitives.
- Every route receives light and dark axe checks against WCAG A/AA, WCAG 2.1 AA and best-practice tags. Every example must render and load its source; missing demos, uncaught runtime exceptions, nested interactive elements and desktop overflow fail the check.
- Ten additional gates cover the initial JavaScript budget, successful loading of all 13 IBM Plex font faces, modal keyboard activation/Escape/focus return, command search and execution, accessible field associations, a complete local experiment, dark workbench rendering, nested themes/density/RTL portals, mobile navigation/layout and reduced-motion content.
- The mobile check uses a 390 × 844 viewport and ten representative routes. It checks that navigation collapses and main content begins above 180px, instead of below the entire catalogue.

## Performance and presentation

The baseline overview loaded 1,284,941 decoded JavaScript bytes. The redesigned built overview loads 415,015 bytes, about 68% less, through lazy page/example/source modules. The executable regression ceiling is 650,000 bytes; it is not a Lighthouse or real-user latency claim.

The mobile baseline was 628px wide in a 390px viewport, with main content beginning at y=3499. The redesigned overview fits 390px and starts its main content at y=60. Desktop, dark and mobile compositions were visually inspected in addition to automated layout checks.

## Build identity and rollout

Docs and Storybook include `/build-info.json` with the source package version and `UI_BUILD_REVISION`, plus `/licenses/IBM-Plex-OFL.txt`. A local build without an explicit revision reports `working-tree`; deployment builds use the release commit hash. Check these endpoints to distinguish a served release from a stale browser or container.

The two in-scope services are the docs at `http://dhaakon-ubuntu:21763` and Storybook at `http://dhaakon-ubuntu:21762`. Pre-release container images are retained locally as `dhaakon/dhaakon-ui-docs:pre-0.5.0-20260905` and `dhaakon/dhaakon-ui:pre-0.5.0-20260905`. Rollback consists of retagging those exact images as their corresponding `latest` tags and recreating only the `dhaakon-ui-docs` and `dhaakon-ui` Compose services with `--no-deps`.

The npm registry is not published by these checks or a docs deployment. Other applications and the motion service are not upgraded. Pushing branches/tags and changing consumers remain separate release actions.

## Remaining validation and limits

- Automated axe/keyboard results are not complete accessibility certification. NVDA, VoiceOver, TalkBack, Safari, Firefox, touch-device behavior and operating-system forced-colors need representative manual acceptance before critical deployment.
- The browser suite visits all docs, not every Storybook variant or every combinatorial prop state. Storybook build success is not a claim that every story passes an accessibility audit.
- Research telemetry/logs and deployment stages are local simulations. No backend ingestion, production host monitoring, authentication or infrastructure changes are implied.
- DataGrid remains a composition wrapper, not an editable, virtualized, resizable spreadsheet. Rich-text editing, a Figma library, complete commercial-template parity and GPU-scale visualization are not included.
- `UNSAFE_PortalProvider` is an upstream compatibility boundary. Keep the pinned React Aria pair together and rerun nested-theme/locale/portal checks when upgrading it.
