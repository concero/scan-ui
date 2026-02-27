import type { ReactElement } from 'react'
import type { Column } from '../TableRow'
import type { Transaction } from '@/types'
import { Table } from '../Table'
import { TimeData, DirectionData, MessageData } from './Data/Data'
import { TransactionLabel } from '../TransactionLabel'
import { StatusLabel } from '../StatusLabel'
import { Skeleton } from '../Skeleton'
import './styles.pcss'
import { AgeHeader } from './headers/AgeHeader/AgeHeader'
import { TypeHeader } from './headers/TypeHeader/TypeHeader'
import { StatusHeader } from './headers/StatusHeader/StatusHeader'
import { ChainToHeader } from './headers/ChainToHeader/ChainToHeader'
import { ChainFromHeader } from './headers/ChainFromHeader/ChainFromHeader'

type Columns = {
	id: ReactElement
	type: ReactElement
	age: ReactElement
	from: ReactElement
	to: ReactElement
	status: ReactElement
}

const LOADING_ROWS = 20

type Pagination = {
	take: number
	skip: number
}

type DataTableProps = {
	txs: Transaction[] | null
	dataLoading: boolean
	pagination: Pagination
	setPagination: (pagination: Pagination) => void
}

export const DataTable = ({ txs, dataLoading, pagination, setPagination }: DataTableProps): ReactElement => {
	const columns: Column<Columns>[] = [
		{ header: 'Message ID', accessor: 'id' },
		{ header: <TypeHeader />, accessor: 'type' },
		{ header: <AgeHeader />, accessor: 'age' },
		{ header: <ChainFromHeader />, accessor: 'from' },
		{ header: <ChainToHeader />, accessor: 'to' },
		{ header: <StatusHeader />, accessor: 'status' },
	]

	const data: Columns[] =
		txs?.map(({ id, type, from, to, status }) => ({
			id: <MessageData messageId={id} />,
			type: <TransactionLabel size="s" type={type} />,
			age: <TimeData timestamp={from.timestamp} />,
			from: <DirectionData chainId={from.chain.id} address={from.address} />,
			to: <DirectionData chainId={to.chain.id} address={to.address} />,
			status: <StatusLabel status={status} size="m" />,
		})) ?? []

	const skeletons: Columns[] = Array.from({ length: LOADING_ROWS }).map((_, index) => ({
		id: <Skeleton key={`skeleton-id-${index}`} width="100%" height="24px" />,
		type: <Skeleton key={`skeleton-type-${index}`} width="128px" height="24px" />,
		age: <Skeleton key={`skeleton-age-${index}`} width="100px" height="24px" />,
		from: <Skeleton key={`skeleton-from-${index}`} width="207px" height="24px" />,
		to: <Skeleton key={`skeleton-to-${index}`} width="207px" height="24px" />,
		status: <Skeleton key={`skeleton-status-${index}`} width="87px" height="24px" />,
	}))

	const rows = dataLoading ? [...data, ...skeletons] : data

	return <Table columns={columns} data={rows} pagination={pagination} setPagination={setPagination} />
}
