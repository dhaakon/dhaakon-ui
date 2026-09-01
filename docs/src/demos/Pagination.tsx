import { useState } from 'react';
import { Pagination } from '@dhaakon/ui';

export default function Demo() {
  const [page, setPage] = useState(9);
  return (
    <Pagination
      page={page}
      pageCount={24}
      onPageChange={setPage}
      summary={`${(page - 1) * 20 + 1}–${page * 20} of 480 containers`}
    />
  );
}
