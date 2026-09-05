import { Reveal } from '@dhaakon/motion/react';
import { Card, CardBody } from '@dhaakon/ui';

export default function Demo() {
  return (
    <div tabIndex={0} role="region" aria-label="Scroll to reveal service cards" style={{ height: 260, overflowY: 'auto', border: '1px solid var(--dhk-border)', padding: '1rem' }}>
      <p className="dhk-mono" style={{ fontSize: 'var(--dhk-text-xs)', color: 'var(--dhk-text-subtle)' }}>
        Scroll this panel ↓
      </p>
      <div style={{ height: 200 }} />
      {['brain', 'gitserver', 'zulip', 'grafana'].map((name) => (
        <Reveal key={name} amount={0.3} margin="0px 0px -10% 0px" style={{ marginBottom: '0.75rem' }}>
          <Card>
            <CardBody>
              <strong>{name}</strong>
              <span style={{ color: 'var(--dhk-text-muted)' }}> — enters as it crosses the threshold.</span>
            </CardBody>
          </Card>
        </Reveal>
      ))}
      <div style={{ height: 120 }} />
    </div>
  );
}
