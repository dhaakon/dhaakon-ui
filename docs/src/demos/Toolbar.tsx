import { Button, ButtonGroup, Toolbar, ToolbarSeparator } from '@dhaakon/ui';

export default function Demo() {
  return (
    <Toolbar aria-label="Container actions">
      <ButtonGroup>
        <Button variant="outline" size="sm">Start</Button>
        <Button variant="outline" size="sm">Stop</Button>
        <Button variant="outline" size="sm">Restart</Button>
      </ButtonGroup>
      <ToolbarSeparator />
      <Button variant="ghost" size="sm">Logs</Button>
      <Button variant="ghost" size="sm">Shell</Button>
    </Toolbar>
  );
}
