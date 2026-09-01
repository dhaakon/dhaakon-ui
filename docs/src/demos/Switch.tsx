import { Switch } from '@dhaakon/ui';

export default function Demo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', alignItems: 'flex-start' }}>
      <Switch defaultSelected>Auto-restart containers</Switch>
      <Switch>Anonymous metrics</Switch>
      <Switch isDisabled>Locked by policy</Switch>
    </div>
  );
}
