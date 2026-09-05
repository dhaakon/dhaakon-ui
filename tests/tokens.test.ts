import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { color, theme } from '../src/tokens';

function rgb(value: string, background: number[] = [255, 255, 255]): number[] {
  if (value.startsWith('#')) return [1, 3, 5].map((i) => parseInt(value.slice(i, i + 2), 16));
  const values = value.match(/[\d.]+/g)!.map(Number);
  const alpha = values[3] ?? 1;
  return values.slice(0, 3).map((channel, i) => channel * alpha + background[i] * (1 - alpha));
}
function luminance(channels: number[]) {
  const [r, g, b] = channels.map((v) => v / 255).map((v) => v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4);
  return r * 0.2126 + g * 0.7152 + b * 0.0722;
}
function contrast(foreground: string, background: string) {
  const bg = rgb(background);
  const values = [luminance(rgb(foreground, bg)), luminance(bg)].sort((a, b) => b - a);
  return (values[0] + 0.05) / (values[1] + 0.05);
}

describe('semantic tokens', () => {
  for (const [name, palette] of Object.entries(theme)) {
    for (const surface of ['bg', 'surface', 'surfaceRaised'] as const) {
      for (const foreground of ['text', 'textMuted', 'textSubtle', 'accentText', 'info', 'success', 'warning', 'danger'] as const) {
        it(`${name} ${foreground} on ${surface} meets 4.5:1`, () => {
          expect(contrast(palette[foreground], palette[surface])).toBeGreaterThanOrEqual(4.5);
        });
      }
    }
    it(`${name} action text remains readable on brand orange and hover`, () => {
      expect(contrast(palette.textOnAccent, color.orange)).toBeGreaterThanOrEqual(4.5);
      expect(contrast(palette.textOnAccent, name === 'light' ? color.orangeDeep : '#ff7a48')).toBeGreaterThanOrEqual(4.5);
    });
  }
  it('ships every theme data value in the CSS source of truth', () => {
    const css = readFileSync('src/styles/dhaakon-ui.css', 'utf8').toLowerCase();
    for (const palette of Object.values(theme)) for (const value of Object.values(palette)) expect(css).toContain(value.toLowerCase());
  });
});
