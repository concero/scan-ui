import type { ReactElement } from 'react'
import type { TTagSize } from '@concero/ui-kit'
import { TransactionType } from '@/components/transaction'
import { Tag } from '@concero/ui-kit'

type TransactionLabelProps = {
	size: TTagSize
	type: TransactionType
}

export const TransactionLabel = ({ type }: TransactionLabelProps): ReactElement => {
	return (
		<div>
			<Tag variant="neutral">{type}</Tag>
		</div>
	)
}
