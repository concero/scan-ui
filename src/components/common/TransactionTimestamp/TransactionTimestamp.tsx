import type { ReactElement } from 'react'
import './styles.pcss'

type TransactionTimestampProps = {
    date: string
	time: string
    duration: string
}

export const TransactionTimestamp = ({ date, time, duration }: TransactionTimestampProps): ReactElement => {
	return (
		<div className="transaction_timestamp">
			<div className="transaction_timestamp_row">
				<span className="transaction_timestamp_label">Timestamp</span>
				<span className="transaction_timestamp_value">{date}<span className='transaction_timestamp_time'>{time}</span></span>
			</div>
			<div className="transaction_timestamp_row">
				<span className="transaction_timestamp_label">Duration</span>
				<span className="transaction_timestamp_value">{duration}</span>
			</div>
		</div>
	)
}
