import { Button, Tooltip } from '@dhaakon/ui';

export default function Demo() {
  return (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <Tooltip content="Rebuilds the image and recreates the container." delay={0}>
        <Button variant="outline">Redeploy</Button>
      </Tooltip>
      <Tooltip placement="bottom" content="Placed below." delay={0}>
        <Button variant="ghost">Bottom</Button>
      </Tooltip>
    </div>
  );
}
