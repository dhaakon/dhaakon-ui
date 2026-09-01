import { SettingRow } from '@dhaakon/ui/app';
import { Select, SelectItem, Switch } from '@dhaakon/ui';

export default function Demo() {
  return (
    <>
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
    </>
  );
}
