import { Button, ButtonGroup } from '@dhaakon/ui';

export default function Demo() {
  return (
    <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
      <Button variant="primary">Primary</Button>
      <Button variant="accent">Accent</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
      <ButtonGroup label="Range">
        <Button variant="outline">1h</Button>
        <Button variant="outline">24h</Button>
        <Button variant="outline">7d</Button>
      </ButtonGroup>
    </div>
  );
}
