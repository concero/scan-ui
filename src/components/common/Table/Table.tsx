import type { ReactElement } from 'react'
import type { Column } from '../TableRow'
import { TableHeading } from '../TableHeading'
import { TableBody } from '../TableBody/TableBody'
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
        </table>
    </div>
)
