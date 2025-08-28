import type { ReactElement } from 'react'
import { SuccessIcon } from '@/assets'
import './styles.pcss'

type NotificationProps = {
	message: string
	visible: boolean
}

export const Notification = ({ message, visible }: NotificationProps): ReactElement => {
	const animationClass = visible ? 'notification_show' : 'notification_hide'

	return (
		<div className={`notification ${animationClass}`}>
			<div className="notification_icon">
				<SuccessIcon />
			</div>
			<span className="notification_title">{message}</span>
		</div>
	)
}
