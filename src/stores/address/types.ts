import type { UseBoundStoreWithEqualityFn } from 'zustand/traditional'
import type { StoreApi } from 'zustand'
import { Transaction } from '@/types'

export type AddressStateSlice = {
	txs: Transaction[] | null
	loading: boolean
}

export type AddressActions = {
	setTransactions: (txs: Transaction[] | null) => void
	setLoading: (loading: boolean) => void
}

export type AddressState = AddressStateSlice & AddressActions
export type AddressStore = UseBoundStoreWithEqualityFn<StoreApi<AddressState>>
