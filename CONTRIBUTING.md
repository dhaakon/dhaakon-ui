# Development and verification

Use Node 24 (Node 22.12+ is supported by the build tools). Install with `npm ci` and `npm --prefix docs ci`. The docs resolve this repository's source, not a previously published package. Storybook and the gallery serve different purposes: isolated props/state exploration versus working compositions.

```sh
npm run storybook                       # isolated component workshop :6006
npm --prefix docs run dev               # documentation + workbench :5174
npm run check                          # lint, strict types, tests, build, packed artifact
npm run check:peers                    # isolated React 18/19 declarations + SSR; registry access required
npm --prefix docs run build             # fails on TypeScript errors
npm --prefix docs run check:routes      # built-site Chrome regression checks
npm run build-storybook
```

`CHROME_PATH` selects an installed Chromium executable for browser checks. The checker uses a temporary browser profile and a loopback-only server; it does not require a deployed homelab or a sibling repository. Generated reports/screenshots belong in ignored `test-results/`.

## Adding a capability

1. Define its actual behavior and public API. Distinguish reusable capability from visual variant.
2. Prefer existing React Aria patterns for collections, focus, selection and overlays. Native HTML remains appropriate for semantic content and simple forms.
3. Cover names, descriptions, keyboard interaction, disabled/empty/error states, controlled state and teardown. Use real-browser checks for layout, focus, CSS/portal inheritance and contrast.
4. Export through the appropriate existing entry point; keep runtime dependencies external. New styles must be copied by the CSS build.
5. Add a lazy gallery example, composition guidance and Storybook story where useful. Do not eagerly load all examples or source snippets.
6. Run the gates above and record results. Automated accessibility checks are not screen-reader certification; test keyboard and representative assistive technology before adopting critical workflows.

## Version discipline

The baseline audit is preserved on `audit/ui-system-2026-09-05`; implementation is on `feat/ui-research-system-v0.5.0`. Use additive minor versions for new capability and record fixes/behavior changes in `CHANGELOG.md`. Keep package and lockfile versions synchronized. Create an explicit release commit/tag after verification. Pushing, registry publishing and upgrading consumers are separate release decisions; a docs deployment does not imply a package has been published.

## Scope of the research kit

Telemetry, logs and experiments in the gallery use deterministic fixtures. Components accept consumer data; they do not contact infrastructure. DataGrid arranges a collection toolbar/table/footer and does not promise a virtualized spreadsheet engine. The original editorial identity and inspectable technical workflows take priority over matching a commercial catalogue's template count.
