import type { ReactElement } from 'react'
import { Tag } from '@concero/ui-kit'
import './styles.pcss'

type TransactionFinalityProps = {
	readonly hasFinality: boolean
}

export const TransactionFinality = ({ hasFinality }: TransactionFinalityProps): ReactElement => {
	const status: string = hasFinality ? 'Yes' : 'No'

	return (
		<div className="transaction_finality">
			<div className="transaction_finality_row">
				<span className="transaction_finality_label">Finality Required</span>
				<div>
					<Tag size="s" variant="neutral">
						{status}
					</Tag>
				</div>
			</div>
		</div>
	)
}
