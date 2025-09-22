import type { ReactElement } from 'react'
import type { Column } from '../TableRow'
import type { Transaction } from '@/types'
import { Table } from '../Table'
import { TimeData, DirectionData, MessageData } from './Data/Data'
import { TransactionLabel } from '../TransactionLabel'
import { StatusLabel } from '../StatusLabel'
import './styles.pcss'

type MessageRow = {
	messageId: ReactElement
	type: ReactElement
	age: ReactElement
	from: ReactElement
	to: ReactElement
	status: ReactElement
}

const columns: Column<MessageRow>[] = [
	{ header: 'Message ID', accessor: 'messageId' },
	{ header: 'Type', accessor: 'type' },
	{ header: 'Age', accessor: 'age' },
	{ header: 'From', accessor: 'from' },
	{ header: 'To', accessor: 'to' },
	{ header: 'Status', accessor: 'status' },
]

type DataTableProps = {
	data: Transaction[]
}

export const DataTable = ({ data }: DataTableProps): ReactElement => {
	const rows: MessageRow[] = data.map(({ id, type, from, to, status }) => ({
		messageId: <MessageData messageId={id} />,
		type: <TransactionLabel size="s" type={type} />,
		age: <TimeData timestamp={from.timestamp} />,
		from: <DirectionData chainId={from.chain.id} address={from.address} />,
		to: <DirectionData chainId={to.chain.id} address={to.address} />,
		status: <StatusLabel status={status} size="m" />,
	}))

	return <Table columns={columns} data={rows} />
}
