import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Pagination } from './Pagination';

const meta: Meta<typeof Pagination> = {
  title: 'Components/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj<typeof Pagination>;

export const Basic: Story = {
  render: function Basic() {
    const [page, setPage] = useState(1);
    return <Pagination page={page} pageCount={8} onPageChange={setPage} />;
  },
};

export const Elided: Story = {
  render: function Elided() {
    const [page, setPage] = useState(9);
    return (
      <Pagination
        page={page}
        pageCount={24}
        onPageChange={setPage}
        summary={`${(page - 1) * 20 + 1}–${page * 20} of 480 containers`}
      />
    );
  },
};

export const Compact: Story = {
  render: function Compact() {
    const [page, setPage] = useState(3);
    return <Pagination compact page={page} pageCount={99} onPageChange={setPage} summary="Cursor-based results" />;
  },
};
