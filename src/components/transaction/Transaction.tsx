import { ReactElement } from 'react'
import { useMemo } from 'react'
import { MessageDetails, TransactionTimestamp } from '../common'
import { TransactionSummary } from '../common'
import { TransactionFinality } from '../common'
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
	finality: boolean
	timestamp: number
	duration: number
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

	const summary = useMemo(() => {
		return <TransactionSummary sender={data.sender} receiver={data.receiver} type={data.type} loading={loading} />
	}, [data, loading])

	const finality = useMemo(() => {
		return <TransactionFinality finality={data.finality} loading={loading} />
	}, [data, loading])

	const time = useMemo(() => {
		return <TransactionTimestamp timestamp={data.timestamp} duration={data.duration} loading={loading} />
	}, [data, loading])


	return (
		<div className="transaction">
			<div className="transaction_content">
				{details}
				{divider}
				{summary}
				{divider}
				{finality}
				{divider}
				{time}
				{divider}
			</div>
		</div>
	)
}
