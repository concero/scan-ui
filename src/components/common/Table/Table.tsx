import type { ReactElement } from 'react'
import type { Column } from '../TableRow'
import { TableHeading } from '../TableHeading'
import { TableBody } from '../TableBody/TableBody'
import { TablePagination } from '../TablePagination/TablePagination'
import { useAddressStore } from '@/hooks'
import './styles.pcss'

type TableProps<T extends { [key: string]: any }> = {
	columns: Column<T>[]
	data: T[]
}

export const Table = <T extends { [key: string]: any }>({ columns, data }: TableProps<T>): ReactElement => {
	const { page, count, setPage } = useAddressStore()

	const ITEMS_PER_PAGE = 9
	const pages = Math.max(1, Math.ceil(count / ITEMS_PER_PAGE))

	const onChange = (pg: number) => {
		if (pg < 1 || pg > pages) return
		setPage(pg)
	}

	return (
		<div className="table">
			<div className="table-wrapper">
				<table className="table">
					<TableHeading headers={columns.map(col => col.header)} />
					<TableBody rows={data} columns={columns} />
				</table>
				<TablePagination current={page} total={pages} onChange={onChange} />
			</div>
		</div>
	)
}
