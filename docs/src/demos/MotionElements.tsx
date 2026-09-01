import { useState } from 'react';
import { motion } from '@dhaakon/motion/react';
import { Button, Card, CardBody } from '@dhaakon/ui';

export default function Demo() {
  const [run, setRun] = useState(0);
  return (
    <div style={{ display: 'grid', gap: '1.25rem' }}>
      <Button variant="outline" size="sm" onClick={() => setRun((n) => n + 1)}>Replay</Button>
      <div key={run} style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        {['Instance', 'Volumes', 'Network'].map((label, i) => (
          <motion.div
            key={label}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 420, delay: i * 70, easing: 'dhaakon' }}
          >
            <Card raised>
              <CardBody style={{ minWidth: 140 }}>
                <div className="dhk-eyebrow">{label}</div>
              </CardBody>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
