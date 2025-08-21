import type { ReactElement } from 'react'
import { TableRow, Column } from '../TableRow'
import './styles.pcss'

type TableBodyProps<T extends { [key: string]: any }> = {
	rows: T[]
	columns: Column<T>[]
}

export const TableBody = <T extends { [key: string]: any }>({ rows, columns }: TableBodyProps<T>): ReactElement => (
	<tbody className="table_body">
		{rows.map((row, idx) => (
			<TableRow key={(row as any).messageId || idx} row={row} columns={columns} />
		))}
	</tbody>
)
