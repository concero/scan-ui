import type { UseBoundStoreWithEqualityFn } from 'zustand/traditional'
import type { StoreApi } from 'zustand'

export type NotificationStateSlice = {
	message: string | null
	visible: boolean
}

export type NotificationActions = {
	show: (message: string) => void
	hide: () => void
	clear: () => void
}

export type NotificationState = NotificationStateSlice & NotificationActions

export type NotificationStore = UseBoundStoreWithEqualityFn<StoreApi<NotificationState>>
