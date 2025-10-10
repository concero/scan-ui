import type { ReactElement } from 'react'
import { DataTable } from '../common'
import { PageHeading } from '../common'
import { useMemo } from 'react'
import './styles.pcss'

type AddressProps = {
	address?: string
}

export const Address = ({ address }: AddressProps): ReactElement => {
	const content = useMemo(() => <PageHeading value={address} type="Address" showActions/>, [address])
	const table = useMemo(() => <DataTable />, [])

	return (
		<div className="address">
			{content}
			{table}
		</div>
	)
}
