import type { ReactElement, FC } from 'react'
import { useNavigation } from '@/hooks'
import { getRelativeTime } from '@/utils/time'
import { routes } from '@/configuration'
import './styles.pcss'

type MessageDataProps = {
	messageId: string
}

type TimeDataProps = {
	timestamp: number
}

type DirectionDataProps = {
	chainId: number
	address: string
}

export const MessageData: FC<MessageDataProps> = ({ messageId }): ReactElement => {
	const { to } = useNavigation()

	return (
		<span
			className="message_data"
			role="link"
			tabIndex={0}
			onClick={() => to(routes.transaction())}
			style={{ cursor: 'pointer' }}
			aria-label={`Navigate to message ${messageId}`}
		>
			{messageId}
		</span>
	)
}

export const TimeData: FC<TimeDataProps> = ({ timestamp }): ReactElement => {
	const time: string = getRelativeTime(timestamp)
	return (
		<span className="time_data" role="text">
			{time}
		</span>
	)
}

export const DirectionData: FC<DirectionDataProps> = ({ chainId, address }): ReactElement => {
	const url = chainId
		? `https://dev.concero.io/static/chains/${chainId}.svg`
		: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="gray"%3E%3Crect width="100%" height="100%"%3E%3C/rect%3E%3C/svg%3E'
	return (
		<div className="direction_data">
			<img src={url} alt="Chain Logo" className="direction_data_img" />
			<span className="direction_data_address" title={address}>
				{address.slice(0, 8)}...{address.slice(-8)}
			</span>
		</div>
	)
}
