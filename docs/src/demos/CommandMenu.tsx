import { useState } from 'react';
import { CommandMenu } from '@dhaakon/ui/app';
import { Button } from '@dhaakon/ui';

export default function Demo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="outline" onClick={() => setOpen(true)}>Open command menu (⌘K)</Button>
      <CommandMenu
        isOpen={open}
        onOpenChange={setOpen}
        commands={[
          { id: 'dash', group: 'Navigate', label: 'Go to dashboard', shortcut: 'G D' },
          { id: 'svc', group: 'Navigate', label: 'Go to container service', shortcut: 'G C' },
          { id: 'teams', group: 'Navigate', label: 'Go to teams', shortcut: 'G T' },
          { id: 'restart', group: 'Actions', label: 'Restart a container' },
          { id: 'deploy', group: 'Actions', label: 'Redeploy dhaakon-ui' },
          { id: 'theme', group: 'Preferences', label: 'Toggle dark mode' },
        ]}
      />
    </>
  );
}
