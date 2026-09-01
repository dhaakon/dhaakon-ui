import { ColorPicker, ColorSwatch } from '@dhaakon/ui';

export default function Demo() {
  return (
    <div style={{ display: 'grid', gap: '1.25rem' }}>
      <ColorPicker label="Accent" defaultValue="#ff5a1f" />
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        {['#f0eee8', '#101010', '#ff5a1f', '#2d62ff', '#8a5cff', '#d9ff43'].map((c) => (
          <ColorSwatch key={c} color={c} />
        ))}
      </div>
    </div>
  );
}
