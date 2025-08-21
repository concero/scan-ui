import type { ReactElement } from 'react'
import type { Status } from '../StatusLabel'
import { StatusLabel } from '../StatusLabel'
import './styles.pcss'

type MessageDetailsProps = {
	readonly messageId: string | undefined
	readonly status: Status
	readonly reason?: string
}

export const MessageDetails = ({ messageId, status, reason }: MessageDetailsProps): ReactElement | null => {
	if (!messageId) return null

	return (
		<div className="message_details">
			<div className="message_details_row">
				<span className="message_details_label">Concero message ID</span>
				<span className="message_details_value">{messageId}</span>
			</div>

			<div className="message_details_row">
				<span className="message_details_label">Status</span>
				<StatusLabel status={status} size="s" />
			</div>

			{reason && (
				<div className="message_details_row">
					<span className="message_details_label">Reason</span>
					<span className="message_details_value">{reason}</span>
				</div>
			)}
		</div>
	)
}
