import type { ReactElement } from 'react'
import type { TTagSize } from '@concero/ui-kit'
import { Status } from '@/types'
import { Tag } from '@concero/ui-kit'
type LocalStatus = Exclude<Status, Status.All>
const displayNames: Record<LocalStatus, string> = {
	[Status.Pending]: 'Pending',
	[Status.Success]: 'Success',
	[Status.Canceled]: 'Failed',
} as const

const variant: Record<LocalStatus, 'neutral' | 'positive' | 'negative'> = {
	[Status.Pending]: 'neutral',
	[Status.Success]: 'positive',
	[Status.Canceled]: 'negative',
} as const

type StatusLabelProps = {
	status: Status
	size: TTagSize
}

export const StatusLabel = ({ status, size }: StatusLabelProps): ReactElement => {
	return (
		<div>
			{/*@ts-expect-error TODO: fix types*/}
			<Tag variant={variant[status]} size={size}>
				{/*@ts-expect-error TODO: fix types*/}
				{displayNames[status]}
			</Tag>
		</div>
	)
}
