import { ReactElement } from 'react'
import { useMemo } from 'react'
import { MessageDetails } from '../common'

export enum Status {
	Pending = 'pending',
	Success = 'success',
	Canceled = 'canceled',
}

type TransactionData = {
	messageId: string
	status: Status
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
