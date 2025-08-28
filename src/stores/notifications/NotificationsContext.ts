import type { NotificationStore } from './types'
import { createContext } from 'react'

export const NotificationsContext = createContext<NotificationStore | null>(null)
