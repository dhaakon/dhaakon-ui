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
  /** File in ../demos, without extension. Defaults to `name`. */
  demo?: string;
}

export type Category = 'Actions' | 'Forms' | 'Containment' | 'Feedback' | 'Navigation' | 'Data';

export const CATEGORIES: Category[] = [
  'Actions',
  'Forms',
  'Containment',
  'Data',
  'Feedback',
  'Navigation',
];

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
  (import.meta.env.VITE_STORYBOOK_URL as string | undefined) ?? 'http://localhost:21762';
