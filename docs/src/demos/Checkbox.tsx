import { Checkbox, CheckboxGroup } from '@dhaakon/ui';

export default function Demo() {
  return (
    <CheckboxGroup label="Stack services" defaultValue={['brain']}>
      <Checkbox value="brain">Brain API</Checkbox>
      <Checkbox value="gitea" description="Per-team orgs and template repos">Gitea</Checkbox>
      <Checkbox value="zulip">Zulip</Checkbox>
      <Checkbox value="legacy" isDisabled>Legacy bridge</Checkbox>
    </CheckboxGroup>
  );
}
