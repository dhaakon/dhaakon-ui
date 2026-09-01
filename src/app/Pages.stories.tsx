import type { Meta, StoryObj } from '@storybook/react-vite';
import { LoginPanel } from './LoginPanel';
import { ErrorPage } from './ErrorPage';
import { InlineCTA } from './InlineCTA';
import { FileList } from './FileList';
import { Field } from '../components/Field/Field';
import { Input } from '../components/Input/Input';
import { Button } from '../components/Button/Button';
import { Checkbox } from '../components/Checkbox/Checkbox';
import { Alert } from '../components/Alert/Alert';
import { FeaturedIcon } from '../components/FeaturedIcon/FeaturedIcon';

const meta: Meta = {
  title: 'Composites/Pages',
  parameters: { layout: 'fullscreen', controls: { disable: true } },
};
export default meta;
type Story = StoryObj;

export const Login: Story = {
  render: () => (
    <LoginPanel
      brand="Dhaakon"
      mark="◆"
      title="Sign in"
      description="Use your dhaakon-network account."
      submit={<Button type="submit" block>Sign in</Button>}
      secondary={
        <>
          <Checkbox>Remember me</Checkbox>
          <a href="#" style={{ fontSize: 'var(--dhk-text-xs)' }}>Forgot password?</a>
        </>
      }
      footer={<>No account? <a href="#">Ask an admin</a></>}
    >
      <Field label="Email"><Input type="email" autoComplete="username" placeholder="you@dhaakon.local" /></Field>
      <Field label="Password"><Input type="password" autoComplete="current-password" /></Field>
    </LoginPanel>
  ),
};

export const LoginWithError: Story = {
  render: () => (
    <LoginPanel
      brand="Dhaakon"
      mark="◆"
      error={<Alert tone="danger" title="Sign-in failed">That email and password do not match.</Alert>}
      submit={<Button type="submit" block>Sign in</Button>}
    >
      <Field label="Email"><Input type="email" defaultValue="admin@dhaakon.local" /></Field>
      <Field label="Password"><Input type="password" /></Field>
    </LoginPanel>
  ),
};

export const NotFound: Story = {
  render: () => (
    <ErrorPage
      code="404"
      title="That page has moved on."
      description="The link may be stale, or the resource was removed from this project."
      actions={<><Button variant="outline">Go back</Button><Button>Console home</Button></>}
    />
  ),
};

export const ServerError: Story = {
  render: () => (
    <ErrorPage
      icon={<FeaturedIcon size="lg" tone="danger">!</FeaturedIcon>}
      code="Error 502"
      title="Could not reach the Brain API."
      description="http://brain:21700 did not respond within 3s. The container may still be starting."
      actions={<Button>Retry</Button>}
      detail={'req-9f2c41a8 · upstream connect error\n  at BrainClient.fetch (api/brain.ts:88)'}
    />
  ),
};

export const CTAs: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div style={{ display: 'grid', gap: '1rem', maxWidth: 720 }}>
      <InlineCTA
        icon={<FeaturedIcon tone="accent">↑</FeaturedIcon>}
        title="@dhaakon/ui 0.4.0 is available"
        description="25 application composites, published to the network registry."
        actions={<Button size="sm" variant="outline">Release notes</Button>}
      />
      <InlineCTA
        variant="ink"
        title="Finish setting up this team"
        description="Two of five steps remain: connect a repository and invite a reviewer."
        actions={<Button size="sm" variant="accent">Continue setup</Button>}
      />
    </div>
  ),
};

export const Files: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div style={{ maxWidth: 520 }}>
      <FileList
        onRemove={() => {}}
        files={[
          { id: '1', name: 'brain-2026-09-01.log', size: 2_400_000 },
          { id: '2', name: 'openproject-crash.log', size: 812_000, progress: 62 },
          { id: '3', name: 'core-dump.bin', size: 480_000_000, error: 'Larger than the 20 MB limit.' },
        ]}
      />
    </div>
  ),
};
