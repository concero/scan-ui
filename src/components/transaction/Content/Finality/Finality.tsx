import type { ReactElement } from 'react'
import { useTransactionStore } from '@/hooks'
import { InfoRow } from '@/components/common'
import { Tag } from '@concero/ui-kit'
import './styles.pcss'

export const Finality = (): ReactElement | null => {
	const { transaction } = useTransactionStore()

	if (!transaction?.isFinalityRequired) return null

	const finality: boolean = Boolean(transaction?.isFinalityRequired)
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
