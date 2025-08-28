import type { PropsWithChildren } from 'react'
import type { NotificationStore } from './types'
import { useRef } from 'react'
import { CreateNotificationStore } from './CreateNotificationsStore'
import { NotificationsContext } from './NotificationsContext'

export function NotificationStoreProvider({ children }: PropsWithChildren<{}>) {
  const storeRef = useRef<NotificationStore | null>(null)

  if (!storeRef.current) {
    storeRef.current = CreateNotificationStore()
  }

  return (
    <NotificationsContext.Provider value={storeRef.current}>
      {children}
    </NotificationsContext.Provider>
  )
}