import type { ReactElement } from 'react'
import { Status } from '@/components/transaction'
import { StatusLabel } from '../StatusLabel'
import { InfoRow } from '../InfoRow'
import './styles.pcss'

type MessageDetailsProps = {
	readonly messageId: string | undefined
	readonly status: Status
	readonly loading: boolean
	readonly reason?: string
}

export const MessageDetails = ({ loading, messageId, status, reason }: MessageDetailsProps): ReactElement | null => {
	const rows = [
		{ label: 'Concero message ID', value: messageId },
		{ label: 'Status', value: <StatusLabel status={status} size="s" /> },
	]

	if (reason) {
		rows.push({ label: 'Reason', value: reason })
	}

	return (
		<div className="message_details">
			{rows.map(({ label, value }) => (
				<InfoRow key={label} label={label} value={value} loading={loading} />
			))}
		</div>
	)
}
