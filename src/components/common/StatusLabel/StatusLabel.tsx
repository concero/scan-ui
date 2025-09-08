import type { ReactElement } from 'react'
import type { TTagSize } from '@concero/ui-kit'
import { Status } from '@/types'
import { Tag } from '@concero/ui-kit'

const variant: Record<Status, 'neutral' | 'positive' | 'negative'> = {
	[Status.Pending]: 'neutral',
	[Status.Success]: 'positive',
	[Status.Canceled]: 'neutral',
}

type StatusLabelProps = {
	status: Status
	size: TTagSize
}

export const StatusLabel = ({ status, size }: StatusLabelProps): ReactElement => {
	return (
		<div>
			<Tag variant={variant[status]} size={size}>
				{status.charAt(0).toUpperCase() + status.slice(1)}
			</Tag>
		</div>
	)
}
