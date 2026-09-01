import type { Meta, StoryObj } from '@storybook/react-vite';
import { Modal } from './Modal';
import { Button } from '../Button/Button';
import { Field } from '../Field/Field';
import { Input } from '../Input/Input';

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
};
export default meta;
type Story = StoryObj<typeof Modal>;

export const Basic: Story = {
  render: () => (
    <Modal
      trigger={<Button variant="outline">Delete team</Button>}
      title="Delete skunkworks-dev-team?"
      description="This removes the Gitea org and all 6 repositories. It cannot be undone."
      footer={(close) => (
        <>
          <Button variant="ghost" onClick={close}>Cancel</Button>
          <Button variant="accent" onClick={close}>Delete</Button>
        </>
      )}
    />
  ),
};

export const WithForm: Story = {
  render: () => (
    <Modal
      trigger={<Button>New agent</Button>}
      title="Spawn agent"
      footer={(close) => (
        <>
          <Button variant="ghost" onClick={close}>Cancel</Button>
          <Button onClick={close}>Spawn</Button>
        </>
      )}
    >
      <div style={{ display: 'grid', gap: '1.25rem' }}>
        <Field label="Role"><Input defaultValue="designer" /></Field>
        <Field label="Model" hint="Overrides the team default."><Input placeholder="claude-sonnet-5" /></Field>
      </div>
    </Modal>
  ),
};

export const NotDismissable: Story = {
  render: () => (
    <Modal
      trigger={<Button variant="outline">Confirm migration</Button>}
      isDismissable={false}
      title="Migration in progress"
      description="Closing by clicking outside is disabled — choose an option."
      hideClose
      footer={(close) => <Button onClick={close}>Acknowledge</Button>}
    />
  ),
};
