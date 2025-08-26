import { ReactElement } from 'react'
import { useMemo } from 'react'
import { MessageDetails } from '../common'
import { TransactionSummary } from '../common'
import './styles.pcss'

export enum Status {
	Pending = 'pending',
	Success = 'success',
	Canceled = 'canceled',
}

export enum TransactionType {
	Message = 'Message',
	LBFBridge = 'LBF Bridge',
	CanonicalBridge = 'Canonical Bridge',
	IOUBridge = 'IOU Bridge',
}

type TransactionData = {
	messageId: string
	status: Status
	type: TransactionType
	sender: string
	receiver: string
	reason?: string
}

type TransactionProps = {
	data: TransactionData
	loading: boolean
}

export const Transaction = ({ data, loading }: TransactionProps): ReactElement => {
	const details = useMemo(() => {
		return <MessageDetails messageId={data.messageId} status={data.status} reason={data.reason} loading={loading} />
	}, [data, loading])

	const divider = useMemo(() => <span className="transaction_divider" />, [])

	return (
		<div className="transaction">
			<div className="transaction_content">
				{details}
				{divider}
			</div>
		</div>
	)
}
