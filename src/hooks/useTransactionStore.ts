import type { TransactionState } from '@/stores'
import { useContext } from 'react'
import { TransactionContext } from '@/stores'

export type UseTransactionStoreResult = {
	transaction: TransactionState['transaction']
	loading: TransactionState['loading']
	setTransaction: TransactionState['setTransaction']
	setLoading: TransactionState['setLoading']
}

export const useTransactionStore = (): UseTransactionStoreResult => {
	const useStore = useContext(TransactionContext)

	if (!useStore) {
		throw new Error('useTransactionStore must be used inside <TransactionStoreProvider>.')
	}

	return {
		transaction: useStore(state => state.transaction),
		loading: useStore(state => state.loading),
		setTransaction: useStore(state => state.setTransaction),
		setLoading: useStore(state => state.setLoading),
	}
}
