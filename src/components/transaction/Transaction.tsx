import type { ReactElement } from 'react'
import type { TransactionData } from './types'
import { useMemo } from 'react'
import { MessageDetails, TransactionDetails, TransactionTimestamp } from '../common'
import { TransactionSummary } from '../common'
import { TransactionFinality } from '../common'
import './styles.pcss'

type TransactionProps = {
	data: TransactionData
	loading: boolean
}

export const Transaction = ({ data, loading }: TransactionProps): ReactElement => {
	const message = useMemo(() => {
		return <MessageDetails messageId={data.messageId} status={data.status} reason={data.reason} loading={loading} />
	}, [data, loading])

	const divider = useMemo(() => <span className="transaction_divider" />, [])

	const summary = useMemo(() => {
		return (
			<TransactionSummary
				sender={data.from.address}
				receiver={data.to.address}
				type={data.type}
				loading={loading}
			/>
		)
	}, [data, loading])

	const finality = useMemo(() => {
		return <TransactionFinality finality={data.finality} loading={loading} />
	}, [data, loading])

	const time = useMemo(() => {
		return <TransactionTimestamp timestamp={data.timestamp} duration={data.duration} loading={loading} />
	}, [data, loading])

	const details = useMemo(() => {
		return <TransactionDetails from={data.from} to={data.to} loading={loading} />
	}, [data, loading])

	return (
		<div className="transaction">
			<div className="transaction_content">
				{message}
				{divider}
				{summary}
				{divider}
				{finality}
				{divider}
				{time}
				{divider}
				{details}
				{divider}
			</div>
		</div>
	)
}
