import { Logo, LogoMark } from '@dhaakon/ui';

export default function Demo() {
  return (
    <div style={{ display: 'grid', gap: '1.75rem' }}>
      <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', flexWrap: 'wrap' }}>
        <Logo size={16} />
        <Logo size={22} />
        <Logo size={32} />
      </div>
      <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
        <LogoMark size={24} />
        <LogoMark size={40} />
        <LogoMark size={56} />
      </div>
      {/* outline inherits currentColor, for coloured or inverted chrome */}
      <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
        <Logo variant="outline" size={32} />
        <span style={{ background: 'var(--dhk-ink)', color: 'var(--dhk-paper)', padding: '0.75rem' }}>
          <Logo variant="outline" size={32} />
        </span>
      </div>
    </div>
  );
}
