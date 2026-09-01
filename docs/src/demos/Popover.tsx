import { Button, Checkbox, CheckboxGroup, Popover } from '@dhaakon/ui';

export default function Demo() {
  return (
    <Popover trigger={<Button variant="outline">Filter</Button>} aria-label="Filters">
      {(close) => (
        <div style={{ display: 'grid', gap: '1rem', width: 210 }}>
          <CheckboxGroup label="Status" defaultValue={['running']}>
            <Checkbox value="running">Running</Checkbox>
            <Checkbox value="stopped">Stopped</Checkbox>
            <Checkbox value="unhealthy">Unhealthy</Checkbox>
          </CheckboxGroup>
          <Button size="sm" onClick={close}>Apply</Button>
        </div>
      )}
    </Popover>
  );
}
