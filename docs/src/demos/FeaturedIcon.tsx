import { FeaturedIcon } from '@dhaakon/ui';

export default function Demo() {
  return (
    <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
      <FeaturedIcon>◎</FeaturedIcon>
      <FeaturedIcon tone="accent">↗</FeaturedIcon>
      <FeaturedIcon tone="success">✓</FeaturedIcon>
      <FeaturedIcon tone="danger">!</FeaturedIcon>
      <FeaturedIcon solid>◎</FeaturedIcon>
      <FeaturedIcon solid tone="accent">↗</FeaturedIcon>
      <FeaturedIcon size="lg" circle tone="accent">◎</FeaturedIcon>
    </div>
  );
}
