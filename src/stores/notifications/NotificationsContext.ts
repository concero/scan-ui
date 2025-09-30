import type { NotificationsStore } from './types'
import { createContext } from 'react'

export const NotificationsContext = createContext<NotificationsStore | null>(null)
