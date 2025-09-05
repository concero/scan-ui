import type { ReactElement } from 'react'
import { Tag } from '@concero/ui-kit'
import { InfoRow } from '../InfoRow'
import './styles.pcss'

type TransactionFinalityProps = {
	readonly finality: boolean
}

export const TransactionFinality = ({ finality }: TransactionFinalityProps): ReactElement => {
	const status: string = finality ? 'Yes' : 'No'

	return (
		<div className="transaction_finality">
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
	)
}
