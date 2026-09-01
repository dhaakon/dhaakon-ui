import { useState } from 'react';
import { stagger } from '@dhaakon/motion';
import { motion } from '@dhaakon/motion/react';
import { Button, Slider } from '@dhaakon/ui';

const ITEMS = ['brain', 'gitserver', 'zulip', 'grafana', 'qdrant', 'verdaccio'];

export default function Demo() {
  const [interval, setInterval] = useState(60);
  const [run, setRun] = useState(0);
  const delayFor = stagger(interval);

  return (
    <div style={{ display: 'grid', gap: '1.25rem' }}>
      <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-end', flexWrap: 'wrap' }}>
        <div style={{ width: 220 }}>
          <Slider label="Interval" value={interval} onChange={(v) => setInterval(v as number)}
            minValue={0} maxValue={200} step={10} />
        </div>
        <Button variant="outline" size="sm" onClick={() => setRun((n) => n + 1)}>Replay</Button>
      </div>
      <div key={run} style={{ display: 'grid', gap: '0.4rem' }}>
        {ITEMS.map((name, i) => (
          <motion.div
            key={name}
            initial={{ x: -24, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 380, delay: delayFor(i) }}
            style={{
              padding: '0.5rem 0.9rem', border: '1px solid var(--dhk-border)',
              background: 'var(--dhk-surface-raised)', fontSize: 'var(--dhk-text-sm)',
            }}
          >
            {name}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
