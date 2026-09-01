import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Dialog } from './Dialog';
import { Button } from '../Button/Button';
import { Field } from '../Field/Field';
import { Input } from '../Input/Input';

const meta = {
  title: 'Components/Dialog',
  component: Dialog,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof Dialog>;

export const Basic: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Delete team</Button>
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          title="Delete skunkworks-dev-team?"
          description="This removes the Gitea org and all 6 repositories. It cannot be undone."
          footer={
            <>
              <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
              <Button variant="accent" onClick={() => setOpen(false)}>Delete</Button>
            </>
          }
        />
      </>
    );
  },
};

export const WithForm: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button variant="outline" onClick={() => setOpen(true)}>New agent</Button>
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          title="Spawn agent"
          footer={
            <>
              <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
              <Button onClick={() => setOpen(false)}>Spawn</Button>
            </>
          }
        >
          <div style={{ display: 'grid', gap: '1.25rem' }}>
            <Field label="Role"><Input defaultValue="designer" /></Field>
            <Field label="Model" hint="Overrides the team default."><Input placeholder="claude-sonnet-5" /></Field>
          </div>
        </Dialog>
      </>
    );
  },
};
