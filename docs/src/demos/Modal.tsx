import { Button, Field, Input, Modal } from '@dhaakon/ui';

export default function Demo() {
  return (
    <Modal
      trigger={<Button variant="outline">Spawn agent</Button>}
      title="Spawn agent"
      description="The agent joins the team's Gitea org and Zulip stream."
      footer={(close) => (
        <>
          <Button variant="ghost" onClick={close}>Cancel</Button>
          <Button onClick={close}>Spawn</Button>
        </>
      )}
    >
      <Field label="Role"><Input defaultValue="designer" /></Field>
    </Modal>
  );
}
