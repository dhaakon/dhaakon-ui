# Working on Dhaakon UI

This is an original design system, not a commercial template clone. Read `AUDIT.md` for the baseline findings and `CONTRIBUTING.md` for the verification workflow.

## Boundaries

- `src/components/`: public primitives via `@dhaakon/ui`.
- `src/app/`: application/research composites via `@dhaakon/ui/app`.
- `src/site/`: editorial identity via `@dhaakon/ui/site`.
- `src/styles/dhaakon-ui.css`: runtime token source of truth. Mirror exported data in `src/tokens.ts`; raw Tailwind palette lives in `src/styles/theme.css`.
- `docs/src/lib/registry.ts`: capability metadata and lazy demo loaders. Motion is a companion package, not a kit component count.
- `docs/src/pages/`: separately loaded documentation and showcase routes. Preserve existing hash URLs.
- `scripts/`, `tests/`, `docs/scripts/`: package, component and real-browser regression gates.

## Invariants

- Preserve public exports, controlled/uncontrolled semantics, native form behavior and ref compatibility. Explain any behavior change in the changelog.
- React Aria triggers must use a compatible Button. Labels, descriptions and errors must be associated, not merely drawn. Test the actual accessible name and keyboard outcome.
- Keep IDs instance-safe and SSR-safe. Clear effects, timers, listeners and portal hosts on unmount/StrictMode replay.
- Use semantic tokens for theme-aware text and surfaces. Raw orange is a signal/background; `--dhk-accent-text` is readable accent text. Do not reintroduce paper-on-orange labels.
- Demonstrations are local simulations, never actual host metrics. Working controls must change understandable state. Essential content must remain available under reduced motion.
- Add new CSS imports to `scripts/build-css.mjs`. Add exports, demos, documentation and tests with new public components.
- Do not include tests, stories, source credentials or docs bundles in the published library.
- Consumer work spanning UI and Motion can use the canonical skill at
  `../dhaakon-motion/skills/dhaakon-ui-motion/SKILL.md`; keep its UI reference aligned
  with public exports and this repository's component registry.

## Before handoff

Run `npm run check`, `npm --prefix docs run build`, `npm run build-storybook`, and `npm --prefix docs run check:routes` (starts its own local built-site server). Describe exactly what passed and any remaining manual/assistive-technology verification. Do not change other workspace repositories, publish a package, push branches or upgrade consumers as a side effect of a UI edit.
