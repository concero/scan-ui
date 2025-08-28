import type { NotificationState } from '@/stores'
import { useContext } from 'react'
import { NotificationsContext } from '@/stores'

export type UseNotificationsStoreResult = {
  message: NotificationState['message']
  visible: NotificationState['visible']
  show: NotificationState['show']
  hide: NotificationState['hide']
  clear: NotificationState['clear']
}

export const useNotificationsStore = (): UseNotificationsStoreResult => {
  const useStore = useContext(NotificationsContext)

  if (!useStore) {
    throw new Error('useNotificationsStore must be used inside <NotificationStoreProvider>.')
  }

  return {
    message: useStore(state => state.message),
    visible: useStore(state => state.visible),
    show: useStore(state => state.show),
    hide: useStore(state => state.hide),
    clear: useStore(state => state.clear),
  }
}
