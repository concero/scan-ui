import type { AddressState } from '@/stores'
import { useContext } from 'react'
import { AddressContext } from '@/stores'

export type UseAddressStoreResult = {
    txs: AddressState['txs']
    loading: AddressState['loading']
    direction: AddressState['direction']
    setTransactions: AddressState['setTransactions']
    setLoading: AddressState['setLoading']
    setFilter: AddressState['setFilter']
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
        setTransactions: useStore(state => state.setTransactions),
        setLoading: useStore(state => state.setLoading),
        setFilter: useStore(state => state.setFilter),
    }
}
