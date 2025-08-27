import type { ReactElement } from 'react'
import { TransactionLabel } from '../TransactionLabel/TransactionLabel'
import { TransactionType } from '@/components/transaction'
import { Skeleton } from '../Skeleton'
import './styles.pcss'

type TransactionSummaryProps = {
	readonly loading: boolean
	readonly type: TransactionType
	readonly sender: string
	readonly receiver: string
}

export const TransactionSummary = ({ loading, type, sender, receiver }: TransactionSummaryProps): ReactElement => {
	return (
		<div className="transaction_summary">
			<div className="transaction_summary_row">
				<span className="transaction_summary_label">
					{loading ? <Skeleton width={120} height={24} /> : 'Type'}
				</span>

				<span className="transaction_summary_value">
					{loading ? <Skeleton width={'100%'} height={24} /> : <TransactionLabel size="s" type={type} />}
				</span>
			</div>

			{type !== TransactionType.Message && (
				<>
					<div className="transaction_summary_row">
						<span className="transaction_summary_label">
							{loading ? <Skeleton width={120} height={24} /> : 'Sender'}
						</span>

						<span className="transaction_summary_value">
							{loading ? <Skeleton width={'100%'} height={24} /> : sender}
						</span>
					</div>
					<div className="transaction_summary_row">
						<span className="transaction_summary_label">
							{loading ? <Skeleton width={120} height={24} /> : 'Receiver'}
						</span>

						<span className="transaction_summary_value">
							{loading ? <Skeleton width={'100%'} height={24} /> : receiver}
						</span>
					</div>
				</>
			)}
		</div>
	)
}
