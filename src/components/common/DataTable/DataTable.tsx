import type { ReactElement } from 'react'
import { TableHeading } from '../TableHeading'
import './styles.pcss'

const COLUMN_HEADERS = ['Message ID', 'Type', 'Age', 'From', 'To', 'Status']

interface TableRow {
	messageId: string
	type: string
	age: string
	from: string
	to: string
	status: string
}

const rows: TableRow[] = [
	{
		messageId: '0x1673f72a...',
		type: 'Canonical Bridge',
		age: '1 Second ago',
		from: 'space/space-1',
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
]

export const DataTable = (): ReactElement => (
	<table className="data_table">
        <TableHeading headers={COLUMN_HEADERS} />
		<tbody>
			{rows.map((row, idx) => (
				<tr key={row.messageId || idx} className="data_table_row">
					<td className="data_table_cell">{row.messageId}</td>
					<td className="data_table_cell">{row.type}</td>
					<td className="data_table_cell">{row.age}</td>
					<td className="data_table_cell">{row.from}</td>
					<td className="data_table_cell">{row.to}</td>
					<td className="data_table_cell">{row.status}</td>
				</tr>
			))}
		</tbody>
	</table>
)
