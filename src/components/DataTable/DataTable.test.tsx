import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { DataTable, DataTableBody, DataTableHeader, DataColumn } from './DataTable';

describe('DataTableBody', () => {
  it('preserves the underlying renderEmptyState callback', () => {
    render(<DataTable aria-label="Experiments"><DataTableHeader><DataColumn isRowHeader>Name</DataColumn></DataTableHeader><DataTableBody renderEmptyState={() => <span>Start an experiment</span>}>{[]}</DataTableBody></DataTable>);
    expect(screen.getByText('Start an experiment')).toBeInTheDocument();
  });

  it('uses explicit emptyText when both empty APIs are supplied', () => {
    render(<DataTable aria-label="Experiments"><DataTableHeader><DataColumn isRowHeader>Name</DataColumn></DataTableHeader><DataTableBody emptyText="No experiments" renderEmptyState={() => <span>Unused</span>}>{[]}</DataTableBody></DataTable>);
    expect(screen.getByText('No experiments')).toBeInTheDocument();
    expect(screen.queryByText('Unused')).not.toBeInTheDocument();
  });
});
