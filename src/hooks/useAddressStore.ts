import type { AddressState } from '@/stores'
import { useContext } from 'react'
import { AddressContext } from '@/stores'

export type UseAddressStoreResult = {
	txs: AddressState['txs']
	initialLoading: AddressState['initialLoading']
	dataLoading: AddressState['dataLoading']
	dataFilters: AddressState['dataFilters']
	pagination: AddressState['pagination']

	setTransactions: AddressState['setTransactions']
	addTransactions: AddressState['addTransactions']
	setInitialLoading: (loading: boolean) => void
	setDataLoading: (loading: boolean) => void
	setDirection: AddressState['setDirection']
	setPagination: AddressState['setPagination']
	resetData: AddressState['resetData']
}

export const useAddressStore = (): UseAddressStoreResult => {
	const useStore = useContext(AddressContext)

	if (!useStore) {
		throw new Error('useAddressStore must be used inside <AddressStoreProvider>.')
	}

	return {
		txs: useStore(state => state.txs),
		initialLoading: useStore(state => state.initialLoading),
		dataLoading: useStore(state => state.dataLoading),
		dataFilters: useStore(state => state.dataFilters),
		pagination: useStore(state => state.pagination),

		setTransactions: useStore(state => state.setTransactions),
		addTransactions: useStore(state => state.addTransactions),
		setInitialLoading: useStore(state => (loading: boolean) => state.setLoading(loading, true)),
		setDataLoading: useStore(state => (loading: boolean) => state.setLoading(loading, false)),
		setDirection: useStore(state => state.setDirection),
		setPagination: useStore(state => state.setPagination),
		resetData: useStore(state => state.resetData),
	}
}
