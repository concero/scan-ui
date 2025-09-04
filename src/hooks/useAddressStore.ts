import type { AddressState } from '@/stores'
import { useContext } from 'react'
import { AddressContext } from '@/stores'

export type UseAddressStoreResult = {
    txs: AddressState['txs']
    filters: AddressState['filters']
    loading: AddressState['loading']
    setTransactions: AddressState['setTransactions']
    setFilters: AddressState['setFilters']
    resetFilters: AddressState['resetFilters']
    setLoading: AddressState['setLoading']
}

export const useAddressStore = (): UseAddressStoreResult => {
    const useStore = useContext(AddressContext)

    if (!useStore) {
        throw new Error('useSettingsStore must be used inside <SettingsStoreProvider>.')
    }

    return {
        txs: useStore(state => state.txs),
        filters: useStore(state => state.filters),
        loading: useStore(state => state.loading),
        setTransactions: useStore(state => state.setTransactions),
        setFilters: useStore(state => state.setFilters),
        resetFilters: useStore(state => state.resetFilters),
        setLoading: useStore(state => state.setLoading)
    }
}