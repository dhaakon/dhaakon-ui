import { FormSection } from '@dhaakon/ui/app';
import { Field, Input, Select, SelectItem, Textarea } from '@dhaakon/ui';

export default function Demo() {
  return (
    <>
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
    </>
  );
}
