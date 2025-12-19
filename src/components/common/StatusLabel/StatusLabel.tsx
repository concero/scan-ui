import type { ReactElement } from 'react'
import type { TTagSize } from '@concero/ui-kit'
import { Status } from '@/types'
import { Tag } from '@concero/ui-kit'

const displayNames: Record<Status, string> = {
    [Status.Pending]: 'Pending',
    [Status.Success]: 'Success', 
    [Status.Canceled]: 'Failed',
} as const

const variant: Record<Status, 'neutral' | 'positive' | 'negative'> = {
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
            <Tag variant={variant[status]} size={size}>
                {displayNames[status]}
            </Tag>
        </div>
    )
}
