import type { ReactElement } from 'react'
import type { TTagSize } from '@concero/ui-kit'
import { TxType } from '@/types'
import { Tag } from '@concero/ui-kit'
import { TxTypeLabels } from '@/utils/labels'

type TransactionLabelProps = {
	size: TTagSize
	type: TxType
}

export const TransactionLabel = ({ type }: TransactionLabelProps): ReactElement => {
	return (
		<div>
			{/*@ts-expect-error TODO: fix types*/}
			<Tag variant="neutral">{TxTypeLabels[type]}</Tag>
		</div>
	)
}
