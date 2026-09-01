import type { ComponentType } from 'react';

export interface ComponentDoc {
  /** Display name and URL slug source. */
  name: string;
  slug: string;
  category: Category;
  /** One line: what it is. */
  summary: string;
  /** When it is the right choice — and when it is not. */
  guidance?: string;
  /** Named exports the component ships. */
  exports: string[];
  /** Storybook story id for the "full props & controls" link. */
  storybook?: string;
  /** Built on React Aria rather than hand-rolled. */
  aria?: boolean;
  /**
   * Which entry point it ships from. `core` is `@dhaakon/ui` (primitives);
   * `app` is `@dhaakon/ui/app` (composites assembled from them).
   */
  layer?: 'core' | 'app';
  /** File in ../demos, without extension. Defaults to `name`. */
  demo?: string;
}

export type Category =
  | 'Actions'
  | 'Forms'
  | 'Containment'
  | 'Feedback'
  | 'Navigation'
  | 'Data'
  | 'Shell'
  | 'Pages';

export const CATEGORIES: Category[] = [
  'Actions',
  'Forms',
  'Containment',
  'Data',
  'Feedback',
  'Navigation',
  'Shell',
  'Pages',
];

export const LAYERS = [
  { id: 'core', label: 'Components', entry: '@dhaakon/ui', blurb: 'Primitives — the pieces screens are built from.' },
  { id: 'app', label: 'Composites', entry: '@dhaakon/ui/app', blurb: 'Assemblies — shells, headers, metric bands, feeds, whole pages.' },
] as const;

export type Layer = (typeof LAYERS)[number]['id'];

export function entryFor(doc: ComponentDoc): string {
  return doc.layer === 'app' ? '@dhaakon/ui/app' : '@dhaakon/ui';
}

export function byLayer(layer: Layer): ComponentDoc[] {
  return COMPONENTS.filter((c) => (c.layer ?? 'core') === layer);
}

export const COMPONENTS: ComponentDoc[] = [
  {
    name: 'Button',
    slug: 'button',
    category: 'Actions',
    summary: 'The primary action control, in five weights.',
    guidance:
      'One `accent` button per view at most. `primary` is solid ink that turns accent on hover; `outline` for secondary actions; `ghost` inside dense toolbars. Group alternatives with ButtonGroup rather than stacking solid buttons.',
    exports: ['Button', 'ButtonGroup'],
    storybook: 'components-button--variants',
  },
  {
    name: 'Logo',
    slug: 'logo',
    category: 'Shell',
    summary: 'The dhaakon monogram, as a mark or a full lockup.',
    guidance:
      "Colours come from tokens rather than the source SVG's literals, so the square inverts in dark mode instead of vanishing into the ground; the dot stays accent in both. `variant=\"outline\"` drops the square and inherits `currentColor` for coloured or inverted chrome. `HeaderNav` and `LoginPanel` already use it — you only need this directly for footers, splash screens and print.",
    exports: ['Logo', 'LogoMark'],
    storybook: 'components-logo--lockup',
  },
  {
    name: 'Menu',
    slug: 'menu',
    category: 'Actions',
    summary: 'A dropdown of actions attached to a trigger.',
    guidance:
      'For actions, not for choosing a value — reach for Select when the result is a form value. Typeahead, arrow keys, Esc and focus restoration come from React Aria.',
    exports: ['Menu', 'MenuItem', 'MenuGroup', 'MenuSeparator'],
    storybook: 'components-menu--basic',
    aria: true,
  },
  {
    name: 'Input',
    slug: 'input',
    category: 'Forms',
    summary: 'Text fields, with labels, hints and validation wired up.',
    guidance:
      '`Field` links label, hint, error and control by id so screen readers announce them together — always wrap a bare `Input` in one. `mono` for identifiers, tokens and keys.',
    exports: ['Field', 'Input', 'Textarea'],
    storybook: 'components-input--in-a-field',
  },
  {
    name: 'Checkbox',
    slug: 'checkbox',
    category: 'Forms',
    summary: 'Independent on/off choices, singly or in a group.',
    guidance:
      'Use for choices submitted with a form; `Switch` is for settings that apply the moment they are flipped. `isIndeterminate` drives parent rows in a tree.',
    exports: ['Checkbox', 'CheckboxGroup'],
    storybook: 'components-checkbox--group',
    aria: true,
  },
  {
    name: 'Radio',
    slug: 'radio',
    category: 'Forms',
    summary: 'One choice from a small, visible set.',
    guidance:
      'Under about six options that benefit from being read at once. Past that, Select; past filtering distance, ComboBox. Arrow keys move and wrap within the group.',
    exports: ['Radio', 'RadioGroup'],
    storybook: 'components-radiogroup--with-descriptions',
    aria: true,
  },
  {
    name: 'Switch',
    slug: 'switch',
    category: 'Forms',
    summary: 'A setting that takes effect immediately.',
    guidance:
      'No Save button in sight — that is the test. A square knob on a hairline track, because a pill would be the only rounded control in the system.',
    exports: ['Switch'],
    storybook: 'components-switch--states',
    aria: true,
  },
  {
    name: 'Select',
    slug: 'select',
    category: 'Forms',
    summary: 'Single choice from a list, in a popover.',
    guidance:
      'The value must come from the list. Give `SelectItem` a `textValue` when its children are not plain text, or typeahead and the trigger label have nothing to show.',
    exports: ['Select', 'SelectItem'],
    storybook: 'components-select--open',
    aria: true,
  },
  {
    name: 'ComboBox',
    slug: 'combobox',
    category: 'Forms',
    summary: 'A text input that filters a list as you type.',
    guidance:
      'For lists long enough that scanning is worse than typing. `allowsCustomValue` lets the field accept anything; without it the value must come from the list.',
    exports: ['ComboBox'],
    storybook: 'components-combobox--as-search',
    aria: true,
  },
  {
    name: 'Slider',
    slug: 'slider',
    category: 'Forms',
    summary: 'A number picked from a range, one thumb or two.',
    guidance:
      'Good when the approximate value matters more than the exact one. Pass an array for a range. Use `formatOptions` for percent and currency output.',
    exports: ['Slider'],
    storybook: 'components-slider--range',
    aria: true,
  },
  {
    name: 'DateField',
    slug: 'date-field',
    category: 'Forms',
    summary: 'A date or time typed segment by segment.',
    guidance:
      "Segment order and separators follow the locale; arrow keys increment the focused part. Values are `@internationalized/date` objects, not JS `Date` — a calendar date has no timezone, and conflating the two is where date bugs come from.",
    exports: ['DateField', 'TimeField'],
    storybook: 'components-datefield--basic',
    aria: true,
  },
  {
    name: 'Calendar',
    slug: 'calendar',
    category: 'Forms',
    summary: 'A month grid, for one date or a range.',
    guidance:
      'First day of the week, month names and reading direction all follow the locale. `isDateUnavailable` greys out individual days without disabling the control.',
    exports: ['Calendar', 'RangeCalendar'],
    storybook: 'components-calendar--range',
    aria: true,
  },
  {
    name: 'DatePicker',
    slug: 'date-picker',
    category: 'Forms',
    summary: 'A segmented date input with a calendar popover.',
    guidance:
      'Keeps both routes open — type a date you already know, or pick one you are looking for. A calendar-only control is slow for the former.',
    exports: ['DatePicker', 'DateRangePicker'],
    storybook: 'components-datepicker--open',
    aria: true,
  },
  {
    name: 'NumberField',
    slug: 'number-field',
    category: 'Forms',
    summary: 'A numeric input with steppers and locale-aware formatting.',
    guidance:
      'Prefer this to `<Input type="number">`: it parses what the locale actually types, clamps to `minValue`/`maxValue`, and hands back a real number. `formatOptions` takes `Intl.NumberFormat` options.',
    exports: ['NumberField'],
    storybook: 'components-numberfield--formatted',
    aria: true,
  },
  {
    name: 'SearchField',
    slug: 'search-field',
    category: 'Forms',
    summary: 'A search input with a clear button and Escape-to-clear.',
    guidance:
      'Announced as a search field rather than a generic text box. The clear button hides itself while empty. For filtering a known list, `ComboBox` is usually the better fit.',
    exports: ['SearchField'],
    storybook: 'components-searchfield--with-value',
    aria: true,
  },
  {
    name: 'ColorPicker',
    slug: 'color-picker',
    category: 'Forms',
    summary: 'Saturation area, hue and alpha sliders, hex field.',
    guidance:
      'The area is a real two-dimensional slider — arrow keys move it in both axes and the colour is announced, which a canvas-and-mousedown implementation cannot do.',
    exports: ['ColorPicker', 'ColorField', 'ColorSwatch'],
    storybook: 'components-colorpicker--basic',
    aria: true,
  },
  {
    name: 'FileInput',
    slug: 'file-input',
    category: 'Forms',
    summary: 'A file-dialog trigger and a drag-and-drop zone.',
    guidance:
      'Drag and drop alone is unusable by keyboard, so always put a `FileTrigger` inside a `DropZone`. `FileTrigger` keeps a real button and drives the hidden input for it, instead of styling `<input type="file">`.',
    exports: ['FileTrigger', 'DropZone'],
    storybook: 'components-fileinput--zone',
    aria: true,
  },
  {
    name: 'DataTable',
    slug: 'data-table',
    category: 'Data',
    summary: 'Sortable columns, selectable rows, cell-level keyboard nav.',
    guidance:
      'The simpler `Table` renders from data and is right for read-only display. Use `DataTable` when rows are selectable or columns sortable — that is what the extra composition buys.',
    exports: ['DataTable', 'DataTableHeader', 'DataTableBody', 'DataColumn', 'DataRow', 'DataCell', 'SelectionColumn'],
    storybook: 'components-datatable--sortable',
    aria: true,
  },
  {
    name: 'GridList',
    slug: 'grid-list',
    category: 'Data',
    summary: 'A selectable list whose rows can hold their own controls.',
    guidance:
      'Between this and `DataTable`: `GridList` when each row is one thing with actions, `DataTable` when the row is a record with columns worth comparing down the page.',
    exports: ['GridList', 'GridListItem', 'GridListAction'],
    storybook: 'components-gridlist--selectable',
    aria: true,
  },
  {
    name: 'Meter',
    slug: 'meter',
    category: 'Feedback',
    summary: 'A static measurement within a known range.',
    guidance:
      'Not `Progress` — that reports a task advancing towards completion, and screen readers describe the two differently. If it will never finish, it is a meter.',
    exports: ['Meter'],
    storybook: 'components-meter--levels',
    aria: true,
  },
  {
    name: 'Modal',
    slug: 'modal',
    category: 'Containment',
    summary: 'A trigger-driven overlay that animates in and out.',
    guidance:
      '`Dialog` is the native `<dialog>` and stays the default — it gets focus trapping and inertness from the platform. Reach for `Modal` when you want an exit animation, which `<dialog>` cannot do without extra work.',
    exports: ['Modal'],
    storybook: 'components-modal--with-form',
    aria: true,
  },
  {
    name: 'Popover',
    slug: 'popover',
    category: 'Containment',
    summary: 'A non-modal panel anchored to its trigger.',
    guidance:
      'The page behind stays interactive, so use it for optional detail — filters, previews — rather than work that must be completed. Collision-aware placement, outside-click dismissal and focus return are handled.',
    exports: ['Popover'],
    storybook: 'components-popover--filterpanel',
    aria: true,
  },
  {
    name: 'Toolbar',
    slug: 'toolbar',
    category: 'Actions',
    summary: 'A row of controls that behaves as one tab stop.',
    guidance:
      'Tab moves past the whole toolbar; arrow keys move within it. That keeps a dense action bar from swallowing a dozen tab presses, and is what WAI-ARIA expects of one.',
    exports: ['Toolbar', 'ToolbarSeparator'],
    storybook: 'components-toolbar--basic',
    aria: true,
  },
  {
    name: 'Card',
    slug: 'card',
    category: 'Containment',
    summary: 'A bordered block with optional header and footer.',
    guidance:
      '`raised` lifts it off the page; `interactive` when the whole card is a link; `flush` for edge-to-edge tables and media.',
    exports: ['Card', 'CardHeader', 'CardBody', 'CardFooter'],
    storybook: 'components-card--basic',
  },
  {
    name: 'Tabs',
    slug: 'tabs',
    category: 'Containment',
    summary: 'Peer views, one visible at a time.',
    guidance:
      'For content of equal standing; a tab is not a navigation link. Roving tabindex and arrow-key movement are built in.',
    exports: ['Tabs', 'TabList', 'Tab', 'TabPanel'],
    storybook: 'components-tabs--basic',
  },
  {
    name: 'Accordion',
    slug: 'accordion',
    category: 'Containment',
    summary: 'Collapsible sections, single or multiple open.',
    guidance:
      'Good for reference material read selectively — FAQs, spec sheets. Bad for anything the reader must not miss.',
    exports: ['Accordion', 'AccordionItem'],
    storybook: 'components-accordion--basic',
    aria: true,
  },
  {
    name: 'Dialog',
    slug: 'dialog',
    category: 'Containment',
    summary: 'A modal built on the native `<dialog>` element.',
    guidance:
      'Real focus trapping, Esc to close and an inert background come from the platform, not JavaScript. Reserve it for work that must finish before anything else.',
    exports: ['Dialog'],
    storybook: 'components-dialog--with-form',
  },
  {
    name: 'Table',
    slug: 'table',
    category: 'Data',
    summary: 'Columns and rows with numeric alignment and an empty slot.',
    guidance:
      'Mark counts, sizes and dates `numeric` — they right-align and switch to Plex Mono so digits line up. Always give `empty` something useful to say.',
    exports: ['Table'],
    storybook: 'components-table--basic',
  },
  {
    name: 'Badge',
    slug: 'badge',
    category: 'Data',
    summary: 'A small read-only status marker.',
    guidance:
      'Static by definition. The moment a chip can be selected or removed it should be a Tag, which brings keyboard navigation with it.',
    exports: ['Badge'],
    storybook: 'components-badge--tones',
  },
  {
    name: 'Tag',
    slug: 'tag',
    category: 'Data',
    summary: 'Selectable and removable chips.',
    guidance:
      'Filters, recipients, labels. Arrow keys move between tags and Backspace removes — behaviour a plain Badge cannot offer.',
    exports: ['Tag', 'TagGroup', 'TagList'],
    storybook: 'components-tag--removable',
    aria: true,
  },
  {
    name: 'Avatar',
    slug: 'avatar',
    category: 'Data',
    summary: 'A person or agent, as image or initials.',
    guidance:
      'Falls back to initials when the image is missing or fails to load. Without an image the accessible name moves to the container, so the initials are not read letter by letter.',
    exports: ['Avatar', 'AvatarGroup'],
    storybook: 'components-avatar--group',
  },
  {
    name: 'Alert',
    slug: 'alert',
    category: 'Feedback',
    summary: 'An inline message about the surrounding content.',
    guidance:
      'Stays until the situation changes. `danger` and `warning` announce assertively; the rest are polite. For transient confirmations use a toast instead.',
    exports: ['Alert'],
    storybook: 'components-alert--tones',
  },
  {
    name: 'Toast',
    slug: 'toast',
    category: 'Feedback',
    summary: 'Transient notifications, queued and tone-coded.',
    guidance:
      'For results the user does not need to act on. `duration: 0` keeps one until dismissed — use that for errors worth reading.',
    exports: ['ToastProvider', 'useToast'],
    storybook: 'components-toast--basic',
  },
  {
    name: 'Progress',
    slug: 'progress',
    category: 'Feedback',
    summary: 'Determinate bars and rings, plus an indeterminate mode.',
    guidance:
      'Always prefer a real percentage to a spinner. Rings suit compact dashboard tiles; bars suit anything with a label.',
    exports: ['Progress', 'ProgressRing'],
    storybook: 'components-progress--tones',
    aria: true,
  },
  {
    name: 'Spinner',
    slug: 'spinner',
    category: 'Feedback',
    summary: 'Indeterminate activity, and skeleton placeholders.',
    guidance:
      'Skeletons are hidden from assistive tech; put `aria-busy` on the region so it announces once rather than per placeholder.',
    exports: ['Spinner', 'Skeleton'],
    storybook: 'components-spinner-skeleton--spinners',
  },
  {
    name: 'EmptyState',
    slug: 'empty-state',
    category: 'Feedback',
    summary: 'The "nothing here" panel, with a way forward.',
    guidance:
      'Say why it is empty and give one clear action. An empty list with no next step is a dead end.',
    exports: ['EmptyState'],
    storybook: 'components-emptystate--first-run',
  },
  {
    name: 'Tooltip',
    slug: 'tooltip',
    category: 'Feedback',
    summary: 'A short hint on hover or focus.',
    guidance:
      'Never put essential information or interactive content here — tooltips are unreachable by touch and vanish on blur. React Aria handles the warmup delay and touch suppression.',
    exports: ['Tooltip'],
    storybook: 'components-tooltip--placements',
    aria: true,
  },
  {
    name: 'FeaturedIcon',
    slug: 'featured-icon',
    category: 'Feedback',
    summary: 'An icon in a bordered frame.',
    guidance:
      'The lead-in for empty states and feature rows. Decorative by default — give it a role and label if it carries meaning alone.',
    exports: ['FeaturedIcon'],
    storybook: 'components-featuredicon--tones',
  },
  {
    name: 'Breadcrumbs',
    slug: 'breadcrumbs',
    category: 'Navigation',
    summary: 'The trail of ancestor pages.',
    guidance:
      'Leave `href` off the last crumb — the current page is not a link, and React Aria marks it `aria-current="page"`.',
    exports: ['Breadcrumbs', 'Breadcrumb'],
    storybook: 'components-breadcrumbs--basic',
    aria: true,
  },
  {
    name: 'Pagination',
    slug: 'pagination',
    category: 'Navigation',
    summary: 'Page navigation with an elided window.',
    guidance:
      'Renders first, last and a window around the current page rather than every number. `compact` gives prev/next only, for cursor-based sources.',
    exports: ['Pagination'],
    storybook: 'components-pagination--elided',
  },
  /* ---- composites: @dhaakon/ui/app ------------------------------- */
  {
    name: 'AppShell', slug: 'app-shell', category: 'Shell', layer: 'app',
    summary: 'Sticky header, optional sidebar, scrolling main column.',
    guidance: 'The frame every application screen sits in. The sidebar stacks above the main column under 860px rather than becoming a drawer — a drawer needs a trigger and a focus trap, which belong to the app, not the shell.',
    exports: ['AppShell'], storybook: 'composites-shell--full',
  },
  {
    name: 'HeaderNav', slug: 'header-nav', category: 'Shell', layer: 'app',
    summary: 'Top bar: brand, primary links, account slot.',
    guidance: 'The active link carries `aria-current="page"`, so it is announced as the current location rather than only looking different.',
    exports: ['HeaderNav'], storybook: 'composites-shell--full',
  },
  {
    name: 'SidebarNav', slug: 'sidebar-nav', category: 'Shell', layer: 'app',
    summary: 'Grouped sidebar navigation with counts and active state.',
    guidance: 'Items render as links when given an `href` and buttons otherwise. A nav item that only runs JavaScript is not a link, and pretending it is breaks middle-click and open-in-new-tab.',
    exports: ['SidebarNav'], storybook: 'composites-shell--sidebar-only',
  },
  {
    name: 'PageHeader', slug: 'page-header', category: 'Shell', layer: 'app',
    summary: 'Breadcrumbs, title, description, actions and the page tab strip.',
    guidance: 'Keep `actions` to one primary and one or two secondary. A header with five buttons is a menu wearing a disguise.',
    exports: ['PageHeader', 'SectionHeader'], storybook: 'composites-headers--page',
  },
  {
    name: 'TreeView', slug: 'tree-view', category: 'Navigation', layer: 'app',
    summary: 'A nested, expandable tree.',
    guidance: 'Implements the WAI-ARIA tree pattern directly: one tab stop for the whole tree, then ↑↓ between visible rows, → to open or descend, ← to close or go to the parent.',
    exports: ['TreeView'], storybook: 'composites-navigation--tree',
  },
  {
    name: 'CommandMenu', slug: 'command-menu', category: 'Navigation', layer: 'app',
    summary: 'A ⌘K palette — type to filter, Enter to run.',
    guidance: 'Filtering uses React Aria\'s locale-aware `useFilter`, not `String.includes`, so accents and case fold the way the reader\'s language expects. Shortcuts shown are labels; binding them is yours.',
    exports: ['CommandMenu'], storybook: 'composites-navigation--command-open', aria: true,
  },
  {
    name: 'MetricTile', slug: 'metric-tile', category: 'Data', layer: 'app',
    summary: 'One number, with change and trend.',
    guidance: '`invertDelta` matters more than it looks: a rise is not automatically good, and colouring a climbing error rate green is worse than not colouring it at all.',
    exports: ['MetricTile', 'MetricRow', 'Sparkline'], storybook: 'composites-metrics--row',
  },
  {
    name: 'StatList', slug: 'stat-list', category: 'Data', layer: 'app',
    summary: 'Key/value detail as a real definition list.',
    guidance: 'Renders `<dl>`/`<dt>`/`<dd>`, so the pairing survives being read out of order by a screen reader. Collapses to stacked pairs under 560px.',
    exports: ['StatList'], storybook: 'composites-metrics--stats',
  },
  {
    name: 'ActivityFeed', slug: 'activity-feed', category: 'Data', layer: 'app',
    summary: 'A vertical timeline of events.',
    guidance: 'The connecting rail is drawn per item rather than down the whole list, so it stops at the last marker instead of trailing into whitespace.',
    exports: ['ActivityFeed'], storybook: 'composites-feed-steps--activity',
  },
  {
    name: 'DataGrid', slug: 'data-grid', category: 'Data', layer: 'app',
    summary: 'Filter bar, table and pagination as one block.',
    guidance: 'When empty it keeps the toolbar on screen and swaps only the table. Hiding the filters along with the rows leaves no way to undo the filter that emptied it — the most common way a list appears broken.',
    exports: ['DataGrid'], storybook: 'composites-datagrid--assembled',
  },
  {
    name: 'FilterBar', slug: 'filter-bar', category: 'Data', layer: 'app',
    summary: 'Search, filter controls, and chips for what is applied.',
    guidance: 'Always show the applied filters. A table silently filtered to nothing reads as a bug.',
    exports: ['FilterBar'], storybook: 'composites-datagrid--assembled',
  },
  {
    name: 'PaginationBar', slug: 'pagination-bar', category: 'Data', layer: 'app',
    summary: 'Page size, result range and page navigation on one row.',
    guidance: 'Changing the page size resets to page 1 — staying on page 9 after quadrupling rows per page lands the reader somewhere they did not ask to be.',
    exports: ['PaginationBar'], storybook: 'composites-datagrid--assembled',
  },
  {
    name: 'FileList', slug: 'file-list', category: 'Data', layer: 'app',
    summary: 'Selected files with progress and a remove control.',
    guidance: 'The companion to `DropZone`: the zone accepts files, this reports what happened to them. Failures stay in the list with their reason rather than vanishing.',
    exports: ['FileList'], storybook: 'composites-pages--files',
  },
  {
    name: 'FormSection', slug: 'form-section', category: 'Forms', layer: 'app',
    summary: 'A titled block of fields, heading beside the inputs.',
    guidance: 'The two-column split collapses under 760px — an 18rem description column beside a 12rem input is worse than either alone.',
    exports: ['FormSection', 'SettingRow'], storybook: 'composites-forms--sections',
  },
  {
    name: 'SettingRow', slug: 'setting-row', category: 'Forms', layer: 'app',
    summary: 'Label, explanation and one control on a ruled row.',
    guidance: 'The control carries its own accessible name — the title here is layout. Give the control an `aria-label` when it has no visible label of its own.',
    exports: ['SettingRow'], storybook: 'composites-forms--settings',
  },
  {
    name: 'VerificationCodeInput', slug: 'verification-code', category: 'Forms', layer: 'app',
    summary: 'One box per character of a one-time code.',
    guidance: 'Pasting the whole code into any box fills the rest. People paste these far more often than they type them, and a split input that rejects a paste is the classic way this control is done badly.',
    exports: ['VerificationCodeInput'], storybook: 'composites-forms--verification',
  },
  {
    name: 'ProgressSteps', slug: 'progress-steps', category: 'Feedback', layer: 'app',
    summary: 'Where you are in a multi-step flow.',
    guidance: 'Display only — it reports progress, it does not navigate. The current step carries `aria-current="step"` so it is announced, not merely highlighted.',
    exports: ['ProgressSteps'], storybook: 'composites-feed-steps--steps',
  },
  {
    name: 'ConfirmDialog', slug: 'confirm-dialog', category: 'Feedback', layer: 'app',
    summary: 'A confirmation modal, optionally gated on typing a phrase.',
    guidance: '`confirmText` is the difference between "are you sure?" — which people click through without reading — and an action they must demonstrate intent for. Reserve it for what cannot be undone.',
    exports: ['ConfirmDialog'], storybook: 'composites-forms--confirm', aria: true,
  },
  {
    name: 'NotificationList', slug: 'notification-list', category: 'Feedback', layer: 'app',
    summary: 'A read/unread list for a notifications panel.',
    guidance: 'Unread is carried by weight and background as well as the accent dot, and by visually hidden text — a dot alone is invisible to a screen reader and to anyone who cannot pick it out.',
    exports: ['NotificationList'], storybook: 'composites-feed-steps--notifications',
  },
  {
    name: 'InlineCTA', slug: 'inline-cta', category: 'Feedback', layer: 'app',
    summary: 'A banner promoting the next step.',
    guidance: 'Not an `Alert`: an alert reports the state of what is on screen, this asks for something unrelated to it. At most one per page, or they stop being read.',
    exports: ['InlineCTA'], storybook: 'composites-pages--ctas',
  },
  {
    name: 'LoginPanel', slug: 'login-panel', category: 'Pages', layer: 'app',
    summary: 'A sign-in panel: brand, heading, fields, submit.',
    guidance: 'A real `<form>` with a real submit button, so Enter works and password managers recognise it — the two things a div-and-onClick version breaks.',
    exports: ['LoginPanel'], storybook: 'composites-pages--login',
  },
  {
    name: 'ErrorPage', slug: 'error-page', category: 'Pages', layer: 'app',
    summary: 'A full-page failure state.',
    guidance: 'Say what happened in words, not just a number, and give at least one way out. `detail` carries the request id worth pasting into an issue.',
    exports: ['ErrorPage'], storybook: 'composites-pages--server-error',
  },
];

/* ---- demo wiring ------------------------------------------------ */
// Each demo is loaded twice: as a component to render, and as raw text to show.
// One file, so the preview and the snippet cannot drift apart.

const demoModules = import.meta.glob<{ default: ComponentType }>('../demos/*.tsx', { eager: true });
const demoSources = import.meta.glob<string>('../demos/*.tsx', {
  eager: true,
  query: '?raw',
  import: 'default',
});

function demoKey(doc: ComponentDoc) {
  return `../demos/${doc.demo ?? doc.name}.tsx`;
}

export function getDemo(doc: ComponentDoc): ComponentType | null {
  return demoModules[demoKey(doc)]?.default ?? null;
}

export function getDemoSource(doc: ComponentDoc): string | null {
  return demoSources[demoKey(doc)] ?? null;
}

export function findComponent(slug: string): ComponentDoc | undefined {
  return COMPONENTS.find((c) => c.slug === slug);
}

export const STORYBOOK_URL =
  (import.meta.env.VITE_STORYBOOK_URL as string | undefined) ?? 'http://dhaakon-ubuntu:21762';
