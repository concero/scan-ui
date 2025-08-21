import type { ReactElement } from 'react'
import { useParams } from 'react-router-dom'
import { Tag } from '@concero/ui-kit'
import { ButtonGroup, DataTable } from '@/components/common'
import './styles.pcss'

export const Address = (): ReactElement => {
	const { address } = useParams<{ address: string }>()
	return (
		<section className="address">
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
			<DataTable />
		</section>
	)
}
