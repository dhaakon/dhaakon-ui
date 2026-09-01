import { useState } from 'react';
import { PaginationBar } from '@dhaakon/ui/app';

export default function Demo() {
  const [page, setPage] = useState(9);
  const [pageSize, setPageSize] = useState(20);
  return (
    <PaginationBar
      page={page}
      pageCount={Math.ceil(480 / pageSize)}
      onPageChange={setPage}
      pageSize={pageSize}
      onPageSizeChange={setPageSize}
      totalItems={480}
      itemNoun="containers"
    />
  );
}
