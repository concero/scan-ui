import type { NotificationsState } from '@/stores'
import { useContext } from 'react'
import { NotificationsContext } from '@/stores'

export type UseNotificationsStoreResult = {
	notifications: NotificationsState['notifications']
	add: NotificationsState['add']
	remove: NotificationsState['remove']
	clear: NotificationsState['clear']
}

export const useNotificationsStore = (): UseNotificationsStoreResult => {
	const useStore = useContext(NotificationsContext)

	if (!useStore) {
		throw new Error('useNotificationsStore must be used inside <NotificationsStoreProvider>.')
	}

	return {
		notifications: useStore(state => state.notifications),
		add: useStore(state => state.add),
		remove: useStore(state => state.remove),
		clear: useStore(state => state.clear),
	}
}
