import type { PropsWithChildren } from 'react'
import type { TransactionsStore } from './types'
import { useRef } from 'react'
import { TransactionsContext } from './TransactionsContext'
import { CreateTransactionsStore } from './CreateTransactionsStore'

export function TransactionsStoreProvider({ children }: PropsWithChildren) {
	const storeRef = useRef<TransactionsStore | null>(null)

	if (!storeRef.current) {
		storeRef.current = CreateTransactionsStore()
	}

	return <TransactionsContext.Provider value={storeRef.current}>{children}</TransactionsContext.Provider>
}
