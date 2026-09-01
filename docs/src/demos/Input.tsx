import { Field, Input, Textarea } from '@dhaakon/ui';

export default function Demo() {
  return (
    <div style={{ display: 'grid', gap: '1.5rem', maxWidth: 380 }}>
      <Field label="Team name" hint="Lowercase — used as the Gitea org slug.">
        <Input placeholder="skunkworks" />
      </Field>
      <Field label="Service token" required>
        <Input mono placeholder="dccd-shared-service-token" />
      </Field>
      <Field label="Replicas" error="Must be between 1 and 8.">
        <Input type="number" defaultValue={12} />
      </Field>
      <Field label="Notes">
        <Textarea rows={3} placeholder="Describe the change…" />
      </Field>
    </div>
  );
}
