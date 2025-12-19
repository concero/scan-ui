import type { ReactElement } from 'react'
import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SuccessIcon } from '@/assets'
import { useNotificationsStore } from '@/hooks'
import './styles.pcss'

export const Notifications = (): ReactElement => {
	const { notifications, remove } = useNotificationsStore()

	useEffect(() => {
		notifications.forEach(({ id, duration = 3000 }) => {
			if (duration > 0) {
				const timer = setTimeout(() => remove(id), duration)
				return () => clearTimeout(timer)
			}
			return
		})
	}, [notifications, remove])

	return (
		<AnimatePresence>
			{notifications.map(({ id, message }) => (
				<motion.div
					key={id}
					className="notification"
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: -20 }}
					transition={{ duration: 0.25, ease: 'easeInOut' }}
					role="alert"
				>
					<div className="notification_icon">
						<SuccessIcon />
					</div>
					<span className="notification_title">{message}</span>
				</motion.div>
			))}
		</AnimatePresence>
	)
}
