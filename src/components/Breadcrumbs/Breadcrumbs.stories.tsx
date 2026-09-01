import type { Meta, StoryObj } from '@storybook/react-vite';
import { Breadcrumbs, Breadcrumb } from './Breadcrumbs';

const meta: Meta<typeof Breadcrumbs> = {
  title: 'Components/Breadcrumbs',
  component: Breadcrumbs as never,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj;

export const Basic: Story = {
  render: () => (
    <Breadcrumbs>
      <Breadcrumb href="#">Console</Breadcrumb>
      <Breadcrumb href="#">Container Service</Breadcrumb>
      <Breadcrumb>dhaakon-network</Breadcrumb>
    </Breadcrumbs>
  ),
};

export const ChevronSeparator: Story = {
  render: () => (
    <Breadcrumbs>
      <Breadcrumb href="#" separator="›">Teams</Breadcrumb>
      <Breadcrumb href="#" separator="›">Skunkworks</Breadcrumb>
      <Breadcrumb>briar-the-planner-app</Breadcrumb>
    </Breadcrumbs>
  ),
};

export const TwoLevel: Story = {
  render: () => (
    <Breadcrumbs>
      <Breadcrumb href="#">Registry</Breadcrumb>
      <Breadcrumb>@dhaakon/ui</Breadcrumb>
    </Breadcrumbs>
  ),
};
