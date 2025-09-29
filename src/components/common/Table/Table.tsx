import type { ReactElement } from 'react'
import type { Column } from '../TableRow'
import { TableHeading } from '../TableHeading'
import { TableBody } from '../TableBody/TableBody'
import { useInfiniteScroll } from '@/hooks'
import './styles.pcss'

type TableProps<T extends { [key: string]: any }> = {
	columns: Column<T>[]
	data: T[]
	scrollOptions?: Omit<Parameters<typeof useInfiniteScroll>[0], 'onLoadMore'> & { onLoadMore: () => void }
}

export const Table = <T extends { [key: string]: any }>({
	columns,
	data,
	scrollOptions,
}: TableProps<T>): ReactElement => {
	const { ref } = scrollOptions ? useInfiniteScroll(scrollOptions) : { ref: null }

	return (
		<div className="table_wrapper" ref={ref ?? undefined}>
			<table className="table">
				<TableHeading headers={columns.map(col => col.header)} />
				<TableBody rows={data} columns={columns} />
			</table>
		</div>
	)
}
