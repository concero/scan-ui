import type { TransactionStore } from './types'
import { createContext } from 'react'

export const TransactionContext = createContext<TransactionStore | null>(null)
