import type { ReactElement } from 'react'
import { Tag } from '@concero/ui-kit'
import './styles.pcss'

type MessageStatus = 'Pending' | 'Success' | 'Failed'

const variant: Record<MessageStatus, 'neutral' | 'positive' | 'negative'> = {
	Pending: 'neutral',
	Success: 'positive',
	Failed: 'negative',
}

type MessageDetailsProps = {
	readonly messageId: string | undefined
	readonly status: MessageStatus
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
				<div>
					<Tag size="s" variant={variant[status]}>
						{status}
					</Tag>
				</div>
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
