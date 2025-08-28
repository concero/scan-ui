import { useNotificationsStore } from '@/hooks'
import { Notification } from '../Notification/Notification'

export const NotificationManager = () => {
	const { message, visible } = useNotificationsStore()

	if (!message) return null

	return <Notification message={message} visible={visible} />
}
