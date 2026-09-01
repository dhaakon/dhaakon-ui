import { useState } from 'react';
import { MotionConfig, motion, useReducedMotion } from '@dhaakon/motion/react';
import { Badge, Button, Switch } from '@dhaakon/ui';

function Row({ label }: { label: string }) {
  const reduced = useReducedMotion();
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
      <motion.div
        initial={{ x: -30, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        style={{ padding: '0.5rem 0.9rem', border: '1px solid var(--dhk-border)', fontSize: 'var(--dhk-text-sm)' }}
      >
        {label}
      </motion.div>
      <Badge tone={reduced ? 'warning' : 'neutral'}>{reduced ? 'reduced' : 'full motion'}</Badge>
    </div>
  );
}

export default function Demo() {
  const [reduce, setReduce] = useState(false);
  const [run, setRun] = useState(0);
  return (
    <div style={{ display: 'grid', gap: '1.25rem' }}>
      <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
        <Switch isSelected={reduce} onChange={setReduce}>Force reduced motion</Switch>
        <Button variant="outline" size="sm" onClick={() => setRun((n) => n + 1)}>Replay</Button>
      </div>
      {/* "user" honours the OS setting; "always" is how you test the reduced path. */}
      <MotionConfig transition={{ duration: 500, easing: 'dhaakon' }} reducedMotion={reduce ? 'always' : 'user'}>
        <div key={`${run}-${reduce}`} style={{ display: 'grid', gap: '0.5rem' }}>
          <Row label="Inherits the shared transition" />
        </div>
      </MotionConfig>
    </div>
  );
}
