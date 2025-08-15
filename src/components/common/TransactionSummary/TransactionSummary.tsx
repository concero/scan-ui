import type { ReactElement } from 'react'
import type { Hex } from 'viem'
import { Tag } from '@concero/ui-kit'
import { TransactionType } from '@/pages'
import './styles.pcss'

type TransactionSummaryProps = {
	readonly type: TransactionType
	readonly sender: Hex
	readonly receiver: Hex
}

export const TransactionSummary = ({ type, sender, receiver }: TransactionSummaryProps): ReactElement => {
	return (
		<div className="transaction_summary">
			<div className="transaction_summary_row">
				<span className="transaction_summary_label">Type</span>
				<div>
					<Tag size="s" variant="neutral">
						{type}
					</Tag>
				</div>
			</div>

			{type !== TransactionType.Message && (
				<>
					<div className="transaction_summary_row">
						<span className="transaction_summary_label">Sender</span>
						<span className="transaction_summary_value">{sender}</span>
					</div>

					<div className="transaction_summary_row">
						<span className="transaction_summary_label">Receiver</span>
						<span className="transaction_summary_value">{receiver}</span>
					</div>
				</>
			)}
		</div>
	)
}
