import type { ReactElement } from 'react'
import { ButtonGroup, NetworkLabel, DataTable } from '../common'
import { AddressData } from '@/pages/address'
import './styles.pcss'

type AddressProps = {
	address: string | undefined
	data: AddressData[]
	loading: boolean
	isTestnet: boolean	
}

export const Address = ({ address, data, isTestnet }: AddressProps): ReactElement => {
	return (
		<div className="address">
			<div className='address_content'>
			<div className="address_description">
				<div className="address_info">
					<span className="address_subtitle">Address</span>
					<NetworkLabel isTestnet={isTestnet} />
				</div>
				<span className="address_title">{address}</span>
			</div>
			<ButtonGroup labels={['Outgoing', 'Incoming']} />

			</div>

			<DataTable data={data} />
		</div>
	)
}
