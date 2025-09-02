import type { ReactElement } from 'react'
import { Tag } from '@concero/ui-kit'
import { ButtonGroup } from '../common'
import { DataTable } from '../common'
import { AddressData } from '@/pages/address'
import './styles.pcss'

type AddressProps = {
	address: string | undefined
	data: AddressData[]
	loading: boolean
}

export const Address = ({ address, data }: AddressProps): ReactElement => {
	return (
		<div className="address">
			<div className="address_description">
				<div className="address_info">
					<span className="address_subtitle">Address</span>
					<Tag variant="neutral" size="s">
						Mainnet
					</Tag>
				</div>
				<span className="address_title">{address}</span>
			</div>
			<ButtonGroup labels={['Outgoing', 'Incoming']} />
			<DataTable data={data} />
		</div>
	)
}
