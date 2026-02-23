import type { ReactElement } from 'react'
import { TableRow, Column } from '../TableRow'
import './styles.pcss'

type TableBodyProps<T extends { [key: string]: unknown }> = {
	rows: T[]
	columns: Column<T>[]
}

export const TableBody = <T extends { [key: string]: unknown }>({ rows, columns }: TableBodyProps<T>): ReactElement => (
	<tbody className="table_body">
		{rows.map((row, idx) => {
			const keyValue = (row as any).messageId
			const key = typeof keyValue === 'string' || typeof keyValue === 'number' ? keyValue : idx

			return <TableRow key={String(key)} row={row} columns={columns} />
		})}
	</tbody>
)
