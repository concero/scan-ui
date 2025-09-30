import type { Column } from '../TableRow'
import { ReactElement, useRef } from 'react'
import { TableHeading } from '../TableHeading'
import { TableBody } from '../TableBody/TableBody'
import { useAddressStore } from '@/hooks'
import { useInfiniteScroll } from '@/hooks'
import './styles.pcss'


type TableProps<T extends { [key: string]: any }> = {
  columns: Column<T>[]
  data: T[]
}

export const Table = <T extends { [key: string]: any }>({
  columns,
  data,
}: TableProps<T>): ReactElement => {
  const { pagination, setPagination } = useAddressStore()
  const containerRef = useRef<HTMLDivElement>(null)

  useInfiniteScroll(containerRef, pagination, setPagination, 0)

  return (
    <div className="table" ref={containerRef}>
      <table className="table_content">
        <TableHeading headers={columns.map(col => col.header)} />
        <TableBody rows={data} columns={columns} />
      </table>
    </div>
  )
}
