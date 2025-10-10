import type { Column } from '../TableRow'
import { ReactElement, useRef, useState, useEffect } from 'react'
import { TableHeading } from '../TableHeading'
import { TableBody } from '../TableBody/TableBody'
import { useInfiniteScroll } from '@/hooks'
import './styles.pcss'

type TableProps<T extends { [key: string]: any }> = {
    columns: Column<T>[]
    data: T[]
    pagination: {
        take: number
        skip: number
    }
    setPagination: (pagination: { take: number; skip: number }) => void
}

export const Table = <T extends { [key: string]: any }>({
    columns,
    data,
    pagination,
    setPagination,
}: TableProps<T>): ReactElement => {
    const containerRef = useRef<HTMLDivElement>(null)
    const [showShadow, setShowShadow] = useState<boolean>(false)

    useInfiniteScroll(containerRef, pagination, setPagination, 0)

    useEffect(() => {
        const el = containerRef.current
        if (!el) return

        const checkShadow = () => {
            setShowShadow(el.scrollLeft < el.scrollWidth - el.clientWidth)
        }

        el.addEventListener('scroll', checkShadow)
        window.addEventListener('resize', checkShadow)

        checkShadow()

        return () => {
            el.removeEventListener('scroll', checkShadow)
            window.removeEventListener('resize', checkShadow)
        }
    }, [])

    return (
        <div className="table_wrapper">
            <div className="table" ref={containerRef}>
                <table className="table_content">
                    <TableHeading headers={columns.map(col => col.header)} />
                    <TableBody rows={data} columns={columns} />
                </table>
            </div>
            <div className="table_shadow_bottom" />
            {showShadow && <div className="table_shadow_right" />}
        </div>
    )
}
