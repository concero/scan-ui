import type { ReactElement } from 'react'
import type { Address as AddressType } from 'viem'
import { useParams } from 'react-router-dom'
import { Tag } from '@concero/ui-kit'
import './style.pcss'

export const Address = (): ReactElement => {
	const { address } = useParams<{ address: AddressType }>()
	return (
		<section className="address">
			<div className="address_description">
				<div className="address_info">
					<span className="address_subtitle">Address</span>
					<Tag variant="neutral" size="s">
						Mainnet
					</Tag>
				</div>
			</div>
			<span className="address_title">{address}</span>
		</section>
	)
}
