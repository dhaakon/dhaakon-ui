# Changelog

## 0.5.2 - Slider thumb alignment - 2026-11-13

- Slider thumbs now sit on the centre line of the track. They were drawn half their own height (7.2px at the default size) above it, for single and range sliders alike. Values, keyboard behavior and the rest of the slider's appearance are unchanged.
- The docs browser gate measures thumb alignment on the Slider page, so the offset cannot return unnoticed.

## 0.5.1 - Slider contrast - 2026-09-08

- Slider fills, thumbs and thumb borders now use the semantic text token. This retains the existing light appearance and makes the resting slider visible in dark and nested theme scopes. Hover, focus, disabled and keyboard behavior are unchanged.
- Private network patch release; no public-registry publication or automatic consumer upgrades.

## 0.5.0 — Research system — 2026-09-05

### New capabilities

- Searchable React Aria MultiSelect with controlled/uncontrolled string keys, disabled options, native form data and associated validation.
- Inspector Drawer with logical-side placement, contained scroll and modal focus management.
- TelemetryChart with deterministic SVG, distinguishable series, keyboard sample inspection and exact-value table; missing values remain gaps.
- CodeSnippet with semantic text, line numbers, exact copy and visible failure handling.
- LogViewer with search/level filters, bounded pause snapshots and reversible ordering.
- Provider density and locale controls, independent nested themes and matching body-level portal scopes.

### Repaired interaction foundations

- Button now consumes React Aria trigger context: Modal, ConfirmDialog, Menu, Popover, FileTrigger and Tooltip compositions activate correctly. Native events, refs and form attributes are retained; onPress/isPending are additive.
- Associated labels/descriptions/errors across form families; omitted invalid state preserves native validation. Conditional/blank error nodes are absent, numeric zero remains content, and clearing errors restores descriptions. Field propagates required state and resolves explicit IDs consistently.
- CommandMenu filtering and keyboard collection linkage; enabled-tab navigation and defaults; TreeView active descendant/hierarchy metadata.
- Instance-safe Dialog IDs and description-only headers; Modal accessible names and descriptions; DataTableBody caller empty renderer.
- OTP selection/deletion/paste/autofill; Toast cleanup and hover/focus/visibility pause; Meter and Progress semantics.
- Readable semantic text/action/status colors, solid badges and unstyled links in both themes; forced-colors and reduced-motion treatment.

### Documentation and developer workflow

- Original editorial overview, functioning research workbench, editorial practice and interaction-contract/theme/locale lab routes.
- Workbench run/stop/filter/inspect/export actions produce deterministic local fixtures, never implied live telemetry. Deployment composition has working simulated stages and logs.
- Responsive, searchable navigation, skip link, named landmarks, route focus/titles and explicit not-found behavior.
- Lazy page modules, individual examples and source snippets; the full editorial entry is documented. Initial built overview JS reduced from 1,284,941 to approximately 415,000 decoded bytes.
- Working TypeScript-aware lint, non-masking docs build, component regression tests, real-browser route/source/accessibility/interaction checks, packed-artifact/SSR smoke and isolated React peer verification.
- Audit baseline, agent ownership/invariants, contributor workflow, build identity and bundled IBM Plex license notices.
- Vite development access limited to the docs and sibling kit source, restoring actual Plex font rendering without allowing the entire workspace.

### Compatibility and adoption notes

- Existing public entry points remain. Tabs preserves value/defaultValue/onValueChange, but renders React Aria tab elements; use role/state selectors rather than assuming every tab is a native button. Inactive panels follow React Aria mounting behavior.
- VerificationCodeInput retains its digits-string value API; its DOM is now one native OTP input plus visual cells. Update tests/selectors that previously targeted one input per digit.
- Explicit Field.id is authoritative; otherwise a direct child's ID is adopted. Required fields now actually participate in native validation. Applications relying on broken/missing validation should review submission flows.
- AppShell defaults to main. Embedded compositions can use contentAs="section" and contentLabel to avoid nested main landmarks.
- Semantic text shades changed for contrast. Orange action backgrounds now use ink text. Use accent-text for readable orange text and update foreground/background pairs together when customizing themes.
- React Aria and React Aria Components are pinned as a matched pair because portal/locale contexts must be shared. The portal provider adapter currently uses the upstream UNSAFE API and needs review when upgrading the pair.
- Number fields respect the numeral system already entered while supporting locale parsing; changing locale does not discard the user's draft merely to force different digits.
- Publishing the npm package and upgrading consumers are separate, explicit release steps. The docs build identifies its source version; it does not imply the same version is already in the registry.

### Scope

No claim of full commercial template/Figma parity, complete assistive-technology certification, backend observability, rich-text editing, GPU charting or an editable/virtualized spreadsheet engine. These are explicit follow-up areas, not hidden behind component counts.

## 0.4.1 — Baseline

Existing package version at c1d9254. The immutable starting assessment is retained on audit/ui-system-2026-09-05 in AUDIT.md. Earlier project history remains on main.
