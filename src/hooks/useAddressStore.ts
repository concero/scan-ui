import type { AddressState } from '@/stores'
import { useContext } from 'react'
import { AddressContext } from '@/stores'

export type UseAddressStoreResult = {
	txs: AddressState['txs']
	loading: AddressState['loading']
	direction: AddressState['direction']
	page: AddressState['page']
	count: AddressState['count']
	setTransactions: AddressState['setTransactions']
	setLoading: AddressState['setLoading']
	setDirection: AddressState['setDirection']
	setPage: AddressState['setPage']
	setCount: AddressState['setCount']
}

export const useAddressStore = (): UseAddressStoreResult => {
	const useStore = useContext(AddressContext)

	if (!useStore) {
		throw new Error('useSettingsStore must be used inside <SettingsStoreProvider>.')
	}

	return {
		txs: useStore(state => state.txs),
		loading: useStore(state => state.loading),
		count: useStore(state => state.count),
		direction: useStore(state => state.direction),
		page: useStore(state => state.page),
		setTransactions: useStore(state => state.setTransactions),
		setCount: useStore(state => state.setCount),
		setLoading: useStore(state => state.setLoading),
		setDirection: useStore(state => state.setDirection),
		setPage: useStore(state => state.setPage),
	}
}
