import type { UseBoundStoreWithEqualityFn } from 'zustand/traditional'
import type { StoreApi } from 'zustand'
import { Transaction, TxsDirection } from '@/types'

export type AddressStateSlice = {
	txs: Transaction[] | null
	direction: TxsDirection
	count: number
	page: number
	loading: boolean
}

export type AddressActions = {
	setTransactions: (txs: Transaction[] | null) => void
	setDirection: (direction: TxsDirection) => void
	setCount: (count: number) => void	
	setPage: (page: number) => void
	setLoading: (loading: boolean) => void
}

export type AddressState = AddressStateSlice & AddressActions
export type AddressStore = UseBoundStoreWithEqualityFn<StoreApi<AddressState>>
