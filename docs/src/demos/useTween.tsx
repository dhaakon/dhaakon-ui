import { useTween } from '@dhaakon/motion/react';
import { Button, ButtonGroup } from '@dhaakon/ui';
import { MetricRow, MetricTile } from '@dhaakon/ui/app';

export default function Demo() {
  // Rerenders each frame — right when the value feeds React, not a style.
  const { value, controls } = useTween(0, 21.4, { duration: 1400, easing: 'easeOutCubic' });

  return (
    <div style={{ display: 'grid', gap: '1rem' }}>
      <MetricRow>
        <MetricTile label="Memory" value={value.toFixed(1)} unit="GiB" caption="of 30 GiB" />
      </MetricRow>
      <ButtonGroup>
        <Button variant="outline" size="sm" onClick={() => { controls.current?.seek(0); controls.current?.play(); }}>Count up</Button>
        <Button variant="outline" size="sm" onClick={() => controls.current?.reverse()}>Reverse</Button>
      </ButtonGroup>
    </div>
  );
}
