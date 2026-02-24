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
	setPagination: AddressState['setPagination']
	resetData: AddressState['resetData']
	//Filters
	setDirection: AddressState['setDirection']
	setFromChainIds: AddressState['setFromChainIds']
	setToChainIds: AddressState['setToChainIds']
	setStatus: AddressState['setStatus']
	setType: AddressState['setType']
	setFromTimestamp: AddressState['setFromTimestamp']
	setToTimestamp: AddressState['setToTimestamp']
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
		setPagination: useStore(state => state.setPagination),
		resetData: useStore(state => state.resetData),

		//Setters Filters
		setDirection: useStore(state => state.setDirection),
		setFromChainIds: useStore(state => state.setFromChainIds),
		setToChainIds: useStore(state => state.setToChainIds),
		setStatus: useStore(state => state.setStatus),
		setType: useStore(state => state.setType),
		setFromTimestamp: useStore(state => state.setFromTimestamp),
		setToTimestamp: useStore(state => state.setToTimestamp),
	}
}
