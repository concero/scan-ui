import type { ReactElement } from 'react'
import { TransactionLabel } from '../TransactionLabel/TransactionLabel'
import { TransactionType } from '@/components/transaction'
import './styles.pcss'

type TransactionSummaryProps = {
	readonly type: TransactionType
	readonly sender: string
	readonly receiver: string
}

export const TransactionSummary = ({ type, sender, receiver }: TransactionSummaryProps): ReactElement => {
	return (
		<div className="transaction_summary">
			<div className="transaction_summary_row">
				<span className="transaction_summary_label">Type</span>
				<TransactionLabel size="s" type={type} />
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
