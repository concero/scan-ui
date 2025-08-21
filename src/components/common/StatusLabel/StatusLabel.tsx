import type { ReactElement } from 'react'
import type { TTagSize } from '@concero/ui-kit'
import { Tag } from '@concero/ui-kit'

export type Status = 'Pending' | 'Success' | 'Failed'

const variant: Record<Status, 'neutral' | 'positive' | 'negative'> = {
	Pending: 'neutral',
	Success: 'positive',
	Failed: 'negative',
}

type StatusLabelProps = {
	status: Status
	size: TTagSize
}

export const StatusLabel = ({ status, size }: StatusLabelProps): ReactElement => {
	return (
		<div>
			<Tag variant={variant[status]} size={size}>
				{status}
			</Tag>
		</div>
	)
}
