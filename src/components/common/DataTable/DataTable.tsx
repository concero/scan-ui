import type { ReactElement } from 'react'
import type { Column } from '../TableRow'
import { Table } from '../Table'
import { TimeData, DirectionData, MessageData } from './Data/Data'
import { TransactionLabel } from '../TransactionLabel'
import { Status, TransactionType } from '@/types'
import { StatusLabel } from '../StatusLabel'
import './styles.pcss'

type DirectionInfo = {
	logo: string
	address: string
}

type Data = {
	messageId: string
	type: TransactionType
	timestamp: number
	from: DirectionInfo
	to: DirectionInfo
	status: Status
}

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
	data: Data[]
}

export const DataTable = ({ data }: DataTableProps): ReactElement => {
	const rows: MessageRow[] = data.map(({ messageId, type, timestamp, from, to, status }) => ({
		messageId: <MessageData messageId={messageId} />,
		type: <TransactionLabel size="s" type={type} />,
		age: <TimeData timestamp={timestamp} />,
		from: <DirectionData logo={from.logo} address={from.address} />,
		to: <DirectionData logo={to.logo} address={to.address} />,
		status: <StatusLabel status={status} size="m" />,
	}))

	return <Table columns={columns} data={rows} />
}
