import type { UseBoundStoreWithEqualityFn } from 'zustand/traditional'
import type { StoreApi } from 'zustand'

export enum NotificationType {
	INFO = 'info',
	SUCCESS = 'success',
	ERROR = 'error',
	WARNING = 'warning',
}

export type Notification = {
	id: string
	message: string
	type?: NotificationType
	duration?: number
}

export type NotificationStateSlice = {
	notifications: Notification[]
}

export type NotificationActions = {
	add: (notification: Omit<Notification, 'id'>) => void
	remove: (id: string) => void
	clear: () => void
}

export type NotificationsState = NotificationStateSlice & NotificationActions
export type NotificationsStore = UseBoundStoreWithEqualityFn<StoreApi<NotificationsState>>
