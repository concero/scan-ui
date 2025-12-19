import type { ReactElement } from 'react'
import { useTransactionsStore } from '@/hooks'
import { InfoRow } from '@/components/common'
import { Tag } from '@concero/ui-kit'
import './styles.pcss'

export const Finality = (): ReactElement | null => {
	const { txs } = useTransactionsStore()
	const transaction = txs && txs.length > 0 ? txs[0] : null

	if (!transaction) return null

	const finality: boolean = Boolean(transaction.isFinalityRequired)
	const status: string = finality ? 'Yes' : 'No'

	return (
		<>
			<div className="finality">
				<InfoRow
					label="Finality Required"
					value={
						<Tag size="s" variant="neutral">
							{status}
						</Tag>
					}
					copyable={false}
				/>
			</div>
			<span className="divider" />
		</>
	)
}
