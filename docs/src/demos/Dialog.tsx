import { useState } from 'react';
import { Button, Dialog, Field, Input } from '@dhaakon/ui';

export default function Demo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="outline" onClick={() => setOpen(true)}>Spawn agent</Button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        title="Spawn agent"
        description="The agent joins the team's Gitea org and Zulip stream."
        footer={
          <>
            <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={() => setOpen(false)}>Spawn</Button>
          </>
        }
      >
        <Field label="Role"><Input defaultValue="designer" /></Field>
      </Dialog>
    </>
  );
}
