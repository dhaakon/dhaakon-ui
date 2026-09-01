import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { FormSection, SettingRow } from './Form';
import { VerificationCodeInput } from './VerificationCodeInput';
import { ConfirmDialog } from './ConfirmDialog';
import { Field } from '../components/Field/Field';
import { Input } from '../components/Input/Input';
import { Textarea } from '../components/Textarea/Textarea';
import { Switch } from '../components/Switch/Switch';
import { Select, SelectItem } from '../components/Select/Select';
import { Button } from '../components/Button/Button';

const meta: Meta = {
  title: 'Composites/Forms',
  parameters: { layout: 'padded', controls: { disable: true } },
};
export default meta;
type Story = StoryObj;

export const Sections: Story = {
  render: () => (
    <div style={{ maxWidth: 900 }}>
      <FormSection title="General" description="How this team appears across Gitea, Zulip and the board.">
        <Field label="Team name" hint="Lowercase — used as the Gitea org slug.">
          <Input defaultValue="skunkworks" />
        </Field>
        <Field label="Description">
          <Textarea rows={3} placeholder="What this team works on…" />
        </Field>
      </FormSection>
      <FormSection title="Defaults" description="Applied to every agent this team spawns.">
        <Field label="Model">
          <Select aria-label="Model" defaultSelectedKey="sonnet">
            <SelectItem id="opus">claude-opus-5</SelectItem>
            <SelectItem id="sonnet">claude-sonnet-5</SelectItem>
          </Select>
        </Field>
      </FormSection>
    </div>
  ),
};

export const Settings: Story = {
  render: () => (
    <div style={{ maxWidth: 720 }}>
      <SettingRow
        title="Auto-restart containers"
        description="Recreate a container when its health check fails three times running."
        control={<Switch aria-label="Auto-restart containers" defaultSelected />}
      />
      <SettingRow
        title="Anonymous metrics"
        description="Sends aggregate counts only. Never repository contents or prompts."
        control={<Switch aria-label="Anonymous metrics" />}
      />
      <SettingRow
        title="Log retention"
        description="How long container logs are kept before rotation."
        control={
          <div style={{ minWidth: 140 }}>
            <Select aria-label="Log retention" defaultSelectedKey="30">
              <SelectItem id="7">7 days</SelectItem>
              <SelectItem id="30">30 days</SelectItem>
              <SelectItem id="90">90 days</SelectItem>
            </Select>
          </div>
        }
      />
      <SettingRow
        title="Delete this team"
        description="Removes the Gitea org, the Zulip stream and every repository."
        control={
          <ConfirmDialog
            trigger={<Button variant="outline">Delete…</Button>}
            title="Delete skunkworks-dev-team?"
            description="This removes the Gitea org and all 6 repositories."
            warning="Repositories, issues and history are removed permanently."
            confirmText="skunkworks-dev-team"
            confirmLabel="Delete team"
          />
        }
      />
    </div>
  ),
};

export const Verification: Story = {
  render: function Verification() {
    const [code, setCode] = useState('');
    const [error, setError] = useState<string | undefined>();
    return (
      <div style={{ display: 'grid', gap: '1.5rem', maxWidth: 340 }}>
        <VerificationCodeInput
          value={code}
          onChange={(v) => { setCode(v); setError(undefined); }}
          onComplete={(v) => setError(v === '123456' ? undefined : 'That code is not right.')}
          errorMessage={error}
        />
        <span className="dhk-control-desc">Try pasting a 6-digit code into any box.</span>
      </div>
    );
  },
};

export const Confirm: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
      <ConfirmDialog
        trigger={<Button variant="outline">Restart service</Button>}
        title="Restart brain?"
        description="In-flight requests will be dropped."
        confirmLabel="Restart"
        destructive={false}
      />
      <ConfirmDialog
        trigger={<Button variant="accent">Drop volume</Button>}
        title="Drop postgres-data?"
        description="The volume and everything in it is removed."
        warning="There is no snapshot of this volume."
        confirmText="postgres-data"
        confirmLabel="Drop volume"
      />
    </div>
  ),
};
