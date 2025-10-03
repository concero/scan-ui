import type { PropsWithChildren } from 'react'
import type { NotificationsStore } from './types'
import { useRef } from 'react'
import { NotificationsContext } from './NotificationsContext'
import { CreateNotificationsStore } from './CreateNotificationsStore'

export function NotificationsStoreProvider({ children }: PropsWithChildren) {
    const storeRef = useRef<NotificationsStore | null>(null)

    if (!storeRef.current) {
        storeRef.current = CreateNotificationsStore()
    }

    return <NotificationsContext.Provider value={storeRef.current}>{children}</NotificationsContext.Provider>
}
