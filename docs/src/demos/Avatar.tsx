import { Avatar, AvatarGroup } from '@dhaakon/ui';

export default function Demo() {
  return (
    <div style={{ display: 'grid', gap: '1.25rem' }}>
      <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
        {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((s) => (
          <Avatar key={s} size={s} name="David Poyner" />
        ))}
      </div>
      <div style={{ display: 'flex', gap: '0.75rem' }}>
        <Avatar name="Agent One" status="online" />
        <Avatar name="Agent Two" status="busy" />
        <Avatar name="Agent Three" status="away" />
        <Avatar name="Agent Four" square />
      </div>
      <AvatarGroup max={4}>
        {['Ada Lovelace', 'Grace Hopper', 'Alan Turing', 'Katherine Johnson', 'Barbara Liskov'].map((n) => (
          <Avatar key={n} name={n} />
        ))}
      </AvatarGroup>
    </div>
  );
}
