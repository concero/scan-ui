import type { ReactElement } from 'react'
import { useTransactionStore } from '@/hooks'
import { InfoRow } from '@/components/common'
import './styles.pcss'

export const Timestamp = (): ReactElement | null => {
	const timestamp = useTransactionStore().transaction?.from?.timestamp

	if (!timestamp) return null

	const date = new Date(timestamp * 1000)
	const day = date.getUTCDate()
	const month = date.toLocaleString('en-US', { month: 'short', timeZone: 'UTC' })
	const year = date.getUTCFullYear()
	const hours = date.getUTCHours().toString().padStart(2, '0')
	const minutes = date.getUTCMinutes().toString().padStart(2, '0')

	const formattedDate: string = `${day} ${month} ${year}`
	const formattedTime: string = `(${hours}:${minutes} UTC)`

	return (
		<div className="timestamp">
			<InfoRow
				label="Timestamp"
				value={
					<>
						{formattedDate} <span className="timestamp_time">{formattedTime}</span>
					</>
				}
				copyable={false}
			/>
		</div>
	)
}
