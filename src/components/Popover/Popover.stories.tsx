import type { Meta, StoryObj } from '@storybook/react-vite';
import { Popover } from './Popover';
import { Button } from '../Button/Button';
import { Checkbox, CheckboxGroup } from '../Checkbox/Checkbox';

const meta: Meta<typeof Popover> = {
  title: 'Components/Popover',
  component: Popover,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
};
export default meta;
type Story = StoryObj<typeof Popover>;

export const FilterPanel: Story = {
  render: () => (
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
  ),
};

export const Detail: Story = {
  render: () => (
    <Popover
      trigger={<Button variant="ghost">brain</Button>}
      aria-label="Service detail"
      placement="right"
    >
      <div style={{ width: 220, fontSize: 'var(--dhk-text-sm)' }}>
        <div className="dhk-eyebrow" style={{ marginBottom: '0.5rem' }}>Orchestration API</div>
        <p style={{ margin: 0, color: 'var(--dhk-text-muted)', lineHeight: 1.6 }}>
          Tasks, teams, workflows and agent dispatch. 104 MiB resident on :21700.
        </p>
      </div>
    </Popover>
  ),
};
