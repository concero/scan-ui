import type { ReactElement } from 'react'
import { useTransactionStore } from '@/hooks'
import { TxTypeLabels } from '@/utils/labels'
import './styles.pcss'

export const Title = (): ReactElement => {
	const { transaction } = useTransactionStore()
	const type = transaction?.type

	return (
		<span className="tx_title">
			{type !== undefined && type in TxTypeLabels ? TxTypeLabels[type as keyof typeof TxTypeLabels] : 'Unkown'}
		</span>
	)
}
