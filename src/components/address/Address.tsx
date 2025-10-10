import type { ReactElement } from 'react'
import { DataTable } from '../common'
import { PageHeading } from '../common'
import { useTransactionsStore } from '@/hooks'
import { useMemo } from 'react'
import './styles.pcss'

type AddressProps = {
	address?: string
}

export const Address = ({ address }: AddressProps): ReactElement => {
	const { txs, dataLoading } = useTransactionsStore()
	const content = useMemo(() => <PageHeading value={address} type="Address" showActions/>, [address])
	const table = useMemo(() => <DataTable txs={txs} dataLoading={dataLoading} />, [txs, dataLoading])

	return (
		<div className="address">
			{content}
			{table}
		</div>
	)
}
