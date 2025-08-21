import type { ReactElement } from 'react';
import type { Column } from '../TableRow';
import { TableHeading } from '../TableHeading';
import { TableBody } from '../TableBody/TableBody';
import './styles.pcss';

interface MessageRow {
  messageId: string;
  type: string;
  age: string;
  from: string;
  to: string;
  status: string;
}

const columns: Column<MessageRow>[] = [
  { header: 'Message ID', accessor: 'messageId' },
  { header: 'Type', accessor: 'type' },
  { header: 'Age', accessor: 'age' },
  { header: 'From', accessor: 'from' },
  { header: 'To', accessor: 'to' },
  { header: 'Status', accessor: 'status' },
];

const rows: MessageRow[] = [
  {
    messageId: '0x1673f72a...',
    type: 'Canonical Bridge',
    age: '1 Second ago',
    from: '1',
    to: 'space/space-1',
    status: 'Success',
  },
  {
    messageId: '0xabcde123...',
    type: 'IOU',
    age: '15 Seconds ago',
    from: 'space/space-2',
    to: 'space/space-2',
    status: 'Pending',
  },
];

export const DataTable = (): ReactElement => (
  <table className="data_table">
    <TableHeading headers={columns.map((col) => col.header)} />
    <TableBody rows={rows} columns={columns} />
  </table>
);
