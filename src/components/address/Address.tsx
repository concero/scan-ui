import type { ReactElement } from 'react'
import { DataTable } from '../common'
import { PageHeading } from '../common'
import { useAddressStore } from '@/hooks'
import { useMemo } from 'react'
import './styles.pcss'

type AddressProps = {
	address?: string
}

export const Address = ({ address }: AddressProps): ReactElement => {
	const { txs, dataLoading, pagination, setPagination } = useAddressStore()
	const content = useMemo(() => <PageHeading value={address} type="Address" showActions />, [address])
	const table = useMemo(
		() => <DataTable txs={txs} dataLoading={dataLoading} pagination={pagination} setPagination={setPagination} />,
		[txs, dataLoading, pagination, setPagination],
	)

	return (
		<div className="address">
			{content}
			{table}
		</div>
	)
}
