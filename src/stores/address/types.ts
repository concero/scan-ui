import type { UseBoundStoreWithEqualityFn } from 'zustand/traditional'
import type { StoreApi } from 'zustand'
import { Transaction, TxsDirection } from '@/types'

export type Pagination = {
	take: number
	skip: number
}

export type Filters = {
	direction: TxsDirection
}

export type AddressStateSlice = {
	txs: Transaction[] | null
	initialLoading: boolean
	dataLoading: boolean
	dataFilters: Filters
	pagination: Pagination
}

export type AddressActions = {
	setTransactions: (txs: Transaction[] | null) => void
	addTransactions: (txs: Transaction[]) => void
	setDirection: (direction: TxsDirection) => void
	setLoading: (loading: boolean, initial?: boolean) => void
	setPagination: (pagination: Pagination) => void
	resetData: () => void	
}

export type AddressState = AddressStateSlice & AddressActions
export type AddressStore = UseBoundStoreWithEqualityFn<StoreApi<AddressState>>
