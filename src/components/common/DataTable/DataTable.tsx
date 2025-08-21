import type { ReactElement } from 'react'
import type { Column } from '../TableRow'
import { Table } from '../Table'
import './styles.pcss'

type MessageRow = {
	messageId: string
	type: ReactElement
	age: string
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

const rows: MessageRow[] = [
	{
		messageId: '0x1673f72a...',
		type: <>Canonical Bridge</>,
		age: '1 Second ago',
		from: <>Canonical Bridge</>,
		to: <>space/space-1</>,
		status: <span style={{ color: 'green' }}>Success</span>,
	},
	{
		messageId: '0xabcde123...',
		type: <>IOU</>,
		age: '15 Seconds ago',
		from: <>space/space-2</>,
		to: <>space/space-2</>,
		status: <span style={{ color: 'orange' }}>Pending</span>,
	},
]

export const DataTable = (): ReactElement => {
	return <Table columns={columns} data={rows} />
}
