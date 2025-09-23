import type { AddressState } from '@/stores'
import { useContext } from 'react'
import { AddressContext } from '@/stores'

export type UseAddressStoreResult = {
	txs: AddressState['txs']
	loading: AddressState['loading']
	direction: AddressState['direction']
	page: AddressState['page']	
	setTransactions: AddressState['setTransactions']
	setLoading: AddressState['setLoading']
	setDirection: AddressState['setDirection']
	setPage: AddressState['setPage']	
}

export const useAddressStore = (): UseAddressStoreResult => {
	const useStore = useContext(AddressContext)

	if (!useStore) {
		throw new Error('useSettingsStore must be used inside <SettingsStoreProvider>.')
	}

	return {
		txs: useStore(state => state.txs),
		loading: useStore(state => state.loading),
		direction: useStore(state => state.direction),
		page: useStore(state => state.page),
		setTransactions: useStore(state => state.setTransactions),
		setLoading: useStore(state => state.setLoading),
		setDirection: useStore(state => state.setDirection),
		setPage: useStore(state => state.setPage),
	}
}
