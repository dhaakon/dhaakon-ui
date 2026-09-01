import { Breadcrumb, Breadcrumbs } from '@dhaakon/ui';

export default function Demo() {
  return (
    <Breadcrumbs>
      <Breadcrumb href="#">Console</Breadcrumb>
      <Breadcrumb href="#">Container Service</Breadcrumb>
      <Breadcrumb>dhaakon-network</Breadcrumb>
    </Breadcrumbs>
  );
}
