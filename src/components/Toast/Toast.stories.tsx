import type { Meta, StoryObj } from '@storybook/react-vite';
import { ToastProvider, useToast } from './Toast';
import { Button } from '../Button/Button';

const meta = {
  title: 'Components/Toast',
  component: ToastProvider,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof ToastProvider>;

export default meta;
type Story = StoryObj<typeof ToastProvider>;

function Demo() {
  const { toast } = useToast();
  return (
    <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
      <Button variant="outline" onClick={() => toast({ title: 'Pushed to main', description: 'dhaakon-ui@0.1.0 · adff741' })}>
        Neutral
      </Button>
      <Button variant="outline" onClick={() => toast({ tone: 'success', title: 'Deploy complete', description: 'console is live on :5002' })}>
        Success
      </Button>
      <Button variant="outline" onClick={() => toast({ tone: 'danger', title: 'Build failed', description: 'tsc: 3 errors in Table.tsx', duration: 0 })}>
        Danger (sticky)
      </Button>
    </div>
  );
}

export const Basic: Story = {
  render: () => (
    <ToastProvider>
      <Demo />
    </ToastProvider>
  ),
};
