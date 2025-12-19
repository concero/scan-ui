import type { TransactionsState } from '@/stores'
import { useContext } from 'react'
import { TransactionsContext } from '@/stores'

export type UseTransactionsStoreResult = {
	txs: TransactionsState['txs']
	initialLoading: TransactionsState['initialLoading']
	dataLoading: TransactionsState['dataLoading']
	pagination: TransactionsState['pagination']

	setTransactions: TransactionsState['setTransactions']
	addTransactions: TransactionsState['addTransactions']
	setInitialLoading: (loading: boolean) => void
	setDataLoading: (loading: boolean) => void
	setPagination: TransactionsState['setPagination']
	resetData: TransactionsState['resetData']
}

export const useTransactionsStore = (): UseTransactionsStoreResult => {
	const useStore = useContext(TransactionsContext)

	if (!useStore) {
		throw new Error('useTransactionsStore must be used inside <TransactionsStoreProvider>.')
	}

	return {
		txs: useStore(state => state.txs),
		initialLoading: useStore(state => state.initialLoading),
		dataLoading: useStore(state => state.dataLoading),
		pagination: useStore(state => state.pagination),

		setTransactions: useStore(state => state.setTransactions),
		addTransactions: useStore(state => state.addTransactions),
		setInitialLoading: useStore(state => (loading: boolean) => state.setLoading(loading, true)),
		setDataLoading: useStore(state => (loading: boolean) => state.setLoading(loading, false)),
		setPagination: useStore(state => state.setPagination),
		resetData: useStore(state => state.resetData),
	}
}
