import type { ReactElement } from 'react'
import { useTransactionsStore } from '@/hooks'
import { InfoRow } from '@/components/common'
import './styles.pcss'

export const Timestamp = (): ReactElement | null => {
	const { txs } = useTransactionsStore()
	const transaction = txs && txs.length > 0 ? txs[0] : null
	const fromTimestamp = transaction?.from?.timestamp
	const toTimestamp = transaction?.to?.timestamp

	if (!fromTimestamp) return null

	const fromDate = new Date(fromTimestamp * 1000)
	const day = fromDate.getUTCDate()
	const month = fromDate.toLocaleString('en-US', { month: 'short', timeZone: 'UTC' })
	const year = fromDate.getUTCFullYear()
	const hours = fromDate.getUTCHours().toString().padStart(2, '0')
	const minutes = fromDate.getUTCMinutes().toString().padStart(2, '0')

	const formattedDate = `${day} ${month} ${year}`
	const formattedTime = `(${hours}:${minutes} UTC)`

	let durationDisplay: string | null = null
	if (toTimestamp) {
		const diffMs = (toTimestamp - fromTimestamp) * 1000
		if (diffMs >= 0) {
			const totalSeconds = Math.floor(diffMs / 1000)
			const seconds = totalSeconds % 60
			const minutesDur = Math.floor((totalSeconds / 60) % 60)
			const hoursDur = Math.floor(totalSeconds / 3600)

			durationDisplay =
				(hoursDur > 0 ? `${hoursDur} hrs. ` : '') +
				(minutesDur > 0 || hoursDur > 0 ? `${minutesDur} min. ` : '') +
				`${seconds} sec.`
		}
	}

	return (
		<>
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
				{durationDisplay && <InfoRow label="Duration" value={<>{durationDisplay}</>} copyable={false} />}
			</div>
			<span className="divider" />
		</>
	)
}
