import type { ReactElement } from 'react'
import { Status } from '@/types'
import { StatusLabel } from '../StatusLabel'
import { InfoRow } from '../InfoRow'
import './styles.pcss'

type MessageDetailsProps = {
	readonly messageId: string | undefined
	readonly status: Status
	readonly reason?: string
}

export const MessageDetails = ({ messageId, status, reason }: MessageDetailsProps): ReactElement | null => {
	const rows = [
		{ label: 'Concero message ID', value: messageId, copyable: true, message: 'Message ID Copied' },
		{ label: 'Status', value: <StatusLabel status={status} size="s" />, copyable: false },
	]

	if (reason) {
		rows.push({ label: 'Reason', value: reason, copyable: true, message: 'Fail Reason Copied' })
	}

	if (rows.length === 0) {
		return null
	}

	return (
		<div className="message_details">
			{rows.map(({ label, value, copyable }) => (
				<InfoRow key={label} label={label} value={value} copyable={copyable} />
			))}
		</div>
	)
}
