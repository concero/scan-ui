import type { PropsWithChildren } from 'react'
import type { TransactionStore } from './types'
import { useRef } from 'react'
import { TransactionContext } from './TransactionContext'
import { CreateTransactionStore } from './CreateTransactionStore'

export function TransactionStoreProvider({ children }: PropsWithChildren) {
    const storeRef = useRef<TransactionStore | null>(null)

    if (!storeRef.current) {
        storeRef.current = CreateTransactionStore()
    }

    return <TransactionContext.Provider value={storeRef.current}>{children}</TransactionContext.Provider>
}
