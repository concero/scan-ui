import type { ReactElement } from 'react'
import type { Direction } from '@/components/transaction'
import { TransactionInfo } from '../TransactionInfo'
import './styles.pcss'

type TransactionDetailsProps = {
	from: Direction
	to: Direction
	loading: boolean
}

export const TransactionDetails = ({ from, to, loading }: TransactionDetailsProps): ReactElement => (
	<div className="transaction_details">
		<div className="transaction_details_row">
			<span className="transaction_details_label">From</span>
			<TransactionInfo details={from} loading={loading} />
		</div>
		<div className="transaction_details_row">
			<span className="transaction_details_label">To</span>
			<TransactionInfo details={to} loading={loading} />
		</div>
	</div>
)
