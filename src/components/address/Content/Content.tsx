import type { ReactElement } from 'react'
import { ButtonGroup } from '@/components/common'
import { useMemo } from 'react'
import './styles.pcss'

type ContentProps = {
	address?: string
}

export const Content = ({ address }: ContentProps): ReactElement => {
	const actions = useMemo(() => <ButtonGroup labels={['Outgoing', 'Incoming']} />, [])

	return (
		<div className="address_content">
			<div className="address_description">
				<div className="address_info">
					<span className="address_subtitle">Address</span>
				</div>
				<span className="address_title">{address}</span>
			</div>
			{actions}
		</div>
	)
}
