import type { ReactElement } from 'react'
import type { Column } from '../TableRow'
import { TableHeading } from '../TableHeading'
import { TableBody } from '../TableBody/TableBody'
import { TablePagination } from '../TablePagination/TablePagination'
import './styles.pcss'

type TableProps<T extends { [key: string]: any }> = {
	columns: Column<T>[]
	data: T[]
}

export const Table = <T extends { [key: string]: any }>({ columns, data }: TableProps<T>): ReactElement => (
	<div className="table-wrapper">
		<table className="table">
			<TableHeading headers={columns.map(col => col.header)} />
			<TableBody rows={data} columns={columns} />
			<TablePagination current={2} total={5} onChange={page => console.log(page)} />
		</table>
	</div>
)
