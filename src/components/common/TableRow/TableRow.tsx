import type { ReactElement } from 'react';
import './styles.pcss';

export type Column<T> ={
  header: string;
  accessor: keyof T;
  cellRenderer?: (value: T[keyof T], row: T) => ReactElement | string;
}

type TableRowProps<T> = {
  row: T;
  columns: Column<T>[];
};

export const TableRow = <T extends { [key: string]: any }>({
  row,
  columns,
}: TableRowProps<T>): ReactElement => (
  <tr className="table_row">
    {columns.map(({ accessor, cellRenderer }) => (
      <td key={String(accessor)} className="table_cell">
        {cellRenderer ? cellRenderer(row[accessor], row) : String(row[accessor])}
      </td>
    ))}
  </tr>
);
