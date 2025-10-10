import type { TransactionsStore } from './types'
import { createContext } from 'react'

export const TransactionsContext = createContext<TransactionsStore | null>(null)
