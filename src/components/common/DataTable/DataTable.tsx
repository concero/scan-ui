import type { ReactElement } from 'react'
import type { Column } from '../TableRow'
import { Table } from '../Table'
import { TimeData, DirectionData, MessageData } from './Data/Data'
import './styles.pcss'
import { TransactionLabel } from '../TransactionLabel'
import { TransactionType } from '@/pages'
import { StatusLabel } from '../StatusLabel'

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

const rows: MessageRow[] = [
	{
		messageId: <MessageData messageId="0x4e3b2f1a7c8d9e0b6f5a1c2d3e4f567890abcdef1234567890abcdef123456789" />,
		type: <TransactionLabel size='s' type={TransactionType.CanonicalBridge} />,
		age: <TimeData time={'1 second ago'} />, 
		from: <DirectionData chainLogo='https://api.concero.io/static/icons/chains/137.svg' address='0x239d5b78680e9AD600Ab41E56508670BA9E78F51' />,
		to: <DirectionData   chainLogo='https://api.concero.io/static/icons/chains/137.svg' address='0x239d5b78680e9AD600Ab41E56508670BA9E78F51'/>,
		status: <StatusLabel status='Success' size='m'/>,
	},
	// {
	// 	messageId: '0xabcde123...',
	// 	type: <>IOU</>,
	// 	age: '15 Seconds ago',
	// 	from: <>space/space-2</>,
	// 	to: <>space/space-2</>,
	// 	status: <span style={{ color: 'orange' }}>Pending</span>,
	// },
]

export const DataTable = (): ReactElement => {
	return <Table columns={columns} data={rows} />
}
