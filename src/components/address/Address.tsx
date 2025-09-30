import type { ReactElement } from 'react'
import { DataTable } from '../common'
import { Content } from './Content'
import { useMemo } from 'react'
import './styles.pcss'

type AddressProps = {
	address?: string
}

export const Address = ({ address }: AddressProps): ReactElement => {
	const content = useMemo(() => <Content address={address} />, [address])
	const table = useMemo(() => <DataTable />, [])

	return (
		<div className="address">
			{content}
			{table}
		</div>
	)
}
