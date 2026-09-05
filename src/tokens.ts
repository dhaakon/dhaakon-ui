/**
 * Design tokens as data. The CSS custom properties in `styles.css` are the
 * runtime source of truth; this module mirrors them for build-time use
 * (charts, canvas, emails, RN, docs tables). Keep the two in sync.
 */

export const color = {
  // raw palette
  paper: '#f0eee8',
  paperBright: '#faf9f5',
  ink: '#101010',
  inkSoft: '#1b1b1b',
  white: '#ffffff',
  orange: '#ff5a1f',
  orangeDeep: '#e6480f',
  blue: '#2d62ff',
  blueDeep: '#1843cf',
  violet: '#8a5cff',
  acid: '#d9ff43',
  lineOnLight: 'rgba(16, 16, 16, 0.2)',
  lineOnDark: 'rgba(240, 238, 232, 0.22)',
  // semantic aliases (light theme; the CSS custom properties swap for dark)
  accent: '#ff5a1f',
  accentHover: '#e6480f',
  focus: '#2d62ff',
  info: '#2452dc',
  success: '#1f7a4d',
  warning: '#8d5104',
  danger: '#c22b1c',
} as const;

export const font = {
  sans: "'IBM Plex Sans', ui-sans-serif, system-ui, sans-serif",
  serif: "'IBM Plex Serif', ui-serif, Georgia, serif",
  mono: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, monospace",
  condensed: "'IBM Plex Sans Condensed', 'IBM Plex Sans', sans-serif",
} as const;

export const weight = { light: 300, regular: 400, semibold: 600 } as const;

export const fontSize = {
  '2xs': '0.625rem',
  xs: '0.75rem',
  sm: '0.875rem',
  base: '1rem',
  lg: '1.15rem',
  xl: '1.5rem',
  '2xl': '2rem',
  '3xl': '2.4rem',
  title: 'clamp(1.2rem, 2vw, 1.8rem)',
  display: 'clamp(4rem, 9vw, 10rem)',
} as const;

export const tracking = {
  display: '-0.055em',
  tight: '-0.02em',
  normal: '0',
  label: '0.06em',
  labelWide: '0.12em',
} as const;

export const leading = { tight: 1.05, snug: 1.3, normal: 1.5 } as const;

export const space = {
  1: '0.25rem',
  2: '0.5rem',
  3: '0.75rem',
  4: '1rem',
  5: '1.5rem',
  6: '2rem',
  8: '3rem',
  10: '4rem',
  12: '6rem',
} as const;

export const radius = { none: '0px', full: '999px' } as const;

export const motion = {
  ease: 'cubic-bezier(0.16, 1, 0.3, 1)',
  durationFast: '120ms',
  duration: '200ms',
  durationSlow: '360ms',
} as const;

export const layout = {
  headerHeight: '5rem',
  gutter: 'clamp(1.25rem, 3vw, 3.75rem)',
} as const;

/** Theme-aware data equivalents for canvas/chart consumers; CSS remains authoritative. */
export const theme = {
  light: {
    bg: '#f0eee8', surface: '#f0eee8', surfaceRaised: '#faf9f5', text: '#101010',
    textMuted: 'rgba(16, 16, 16, 0.66)', textSubtle: 'rgba(16, 16, 16, 0.62)',
    textOnAccent: '#101010', accentText: '#a8320c', info: '#2452dc',
    success: '#1f7a4d', warning: '#8d5104', danger: '#c22b1c', focus: '#2d62ff',
  },
  dark: {
    bg: '#0d0d0c', surface: '#141412', surfaceRaised: '#1b1b18', text: '#f0eee8',
    textMuted: 'rgba(240, 238, 232, 0.66)', textSubtle: 'rgba(240, 238, 232, 0.64)',
    textOnAccent: '#0d0d0c', accentText: '#ff956f', info: '#8da9ff',
    success: '#4fd18b', warning: '#e0a75c', danger: '#f2705f', focus: '#6f93ff',
  },
} as const;

export const density = {
  comfortable: { sm: '1.75rem', md: '2.25rem', lg: '2.75rem' },
  compact: { sm: '1.5rem', md: '2rem', lg: '2.5rem' },
} as const;

export const elevation = { dropdown: 1000, overlay: 1100, toast: 1200 } as const;

export const tokens = {
  color,
  font,
  weight,
  fontSize,
  tracking,
  leading,
  space,
  radius,
  motion,
  layout,
  theme,
  density,
  elevation,
} as const;

export default tokens;
