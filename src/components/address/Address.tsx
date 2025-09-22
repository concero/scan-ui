import type { ReactElement } from 'react'
import { ButtonGroup, DataTable } from '../common'
import { Transaction } from '@/types'
import './styles.pcss'


type AddressProps = {
	address: string | undefined
	data: Transaction[]
	loading: boolean
	isTestnet: boolean
}

export const Address = ({ address, data }: AddressProps): ReactElement => {
	return (
		<div className="address">
			<div className="address_content">
				<div className="address_description">
					<div className="address_info">
						<span className="address_subtitle">Address</span>
					</div>
					<span className="address_title">{address}</span>
				</div>
				<ButtonGroup labels={['Outgoing', 'Incoming']} />
			</div>
			<DataTable data={data} />
		</div>
	)
}
