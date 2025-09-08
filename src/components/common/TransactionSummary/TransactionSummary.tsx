import type { ReactElement } from 'react'
import { TransactionLabel } from '../TransactionLabel/TransactionLabel'
import { TransactionType } from '@/types'
import { InfoRow } from '../InfoRow'
import './styles.pcss'

type TransactionSummaryProps = {
	readonly type: TransactionType
	readonly sender: string
	readonly receiver: string
}

export const TransactionSummary = ({ type, sender, receiver }: TransactionSummaryProps): ReactElement => {
	const isMessageType = type === TransactionType.Message

	return (
		<div className="transaction_summary">
			<InfoRow label="Type" value={<TransactionLabel size="s" type={type} />} copyable={false} />

			{!isMessageType && (
				<>
					<InfoRow label="Sender" value={sender} copyable={true} message="Sender Address Copied" />
					<InfoRow label="Receiver" value={receiver} copyable={true} message="Receiver Address Copied" />
				</>
			)}
		</div>
	)
}
