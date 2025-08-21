import type { ReactElement } from 'react';
import type { Column } from '../TableRow';
import { Table } from '../Table';
import { TimeData, DirectionData, MessageData } from './Data/Data';
import { TransactionLabel } from '../TransactionLabel';
import { TransactionType } from '@/pages';
import { Status, StatusLabel } from '../StatusLabel';
import './styles.pcss';

type DirectionInfo = {
  chainLogo: string;
  address: string;
};

type Data = {
  messageId: string;
  type: TransactionType;
  time: string;
  from: DirectionInfo;
  to: DirectionInfo;
  status: Status;
};

type MessageRow = {
  messageId: ReactElement;
  type: ReactElement;
  age: ReactElement;
  from: ReactElement;
  to: ReactElement;
  status: ReactElement;
};

const columns: Column<MessageRow>[] = [
  { header: 'Message ID', accessor: 'messageId' },
  { header: 'Type', accessor: 'type' },
  { header: 'Age', accessor: 'age' },
  { header: 'From', accessor: 'from' },
  { header: 'To', accessor: 'to' },
  { header: 'Status', accessor: 'status' },
];

type DataTableProps = {
  data: Data[];
};

export const DataTable = ({ data }: DataTableProps): ReactElement => {
  const rows: MessageRow[] = data.map(({ messageId, type, time, from, to, status }) => ({
    messageId: <MessageData messageId={messageId} />,
    type: <TransactionLabel size="s" type={type} />,
    age: <TimeData time={time} />,
    from: <DirectionData chainLogo={from.chainLogo} address={from.address} />,
    to: <DirectionData chainLogo={to.chainLogo} address={to.address} />,
    status: <StatusLabel status={status} size="m" />,
  }));

  return <Table columns={columns} data={rows} />;
};
