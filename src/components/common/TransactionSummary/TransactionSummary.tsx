import type { ReactElement } from 'react'
import { TransactionLabel } from '../TransactionLabel/TransactionLabel'
import { TransactionType } from '@/components/transaction'
import { InfoRow } from '../InfoRow'
import './styles.pcss'

type TransactionSummaryProps = {
	readonly loading: boolean
	readonly type: TransactionType
	readonly sender: string
	readonly receiver: string
}

export const TransactionSummary = ({ loading, type, sender, receiver }: TransactionSummaryProps): ReactElement => {
	const isMessageType = type === TransactionType.Message

	return (
		<div className="transaction_summary">
			<InfoRow
				label="Type"
				value={<TransactionLabel size="s" type={type} />}
				loading={loading}
				copyable={false}
			/>

			{!isMessageType && (
				<>
					<InfoRow label="Sender" value={sender} loading={loading} copyable={true} message='Sender Address Copied'/>
					<InfoRow label="Receiver" value={receiver} loading={loading} copyable={true} message='Receiver Address Copied'/>
				</>
			)}
		</div>
	)
}
