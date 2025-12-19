import type { NotificationsState } from './types'
import { createWithEqualityFn } from 'zustand/traditional'

export const CreateNotificationsStore = () =>
	createWithEqualityFn<NotificationsState>(
		(set, get) => ({
			notifications: [],

			add: notification => {
				const id = crypto.randomUUID()
				set(state => ({
					notifications: [...state.notifications, { ...notification, id }],
				}))

				if (notification.duration && notification.duration > 0) {
					setTimeout(() => {
						const { notifications } = get()
						const exists = notifications.find(n => n.id === id)
						if (exists) {
							get().remove(id)
						}
					}, notification.duration)
				}
			},

			remove: id =>
				set(state => ({
					notifications: state.notifications.filter(n => n.id !== id),
				})),

			clear: () => set({ notifications: [] }),
		}),
		Object.is,
	)
