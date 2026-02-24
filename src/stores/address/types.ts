import type { UseBoundStoreWithEqualityFn } from 'zustand/traditional'
import type { StoreApi } from 'zustand'
import { Status, Transaction, TxsDirection, TxType } from '@/types'

export type AddressPagination = {
	take: number
	skip: number
}

export type Filters = {
	direction: TxsDirection
	fromChainIds?: string[]
	toChainIds?: string[]
	fromTimestamp?: string
	toTimestamp?: string
	status?: Status
	type?: TxType
}

export type AddressStateSlice = {
	txs: Transaction[] | null
	initialLoading: boolean
	dataLoading: boolean
	dataFilters: Filters
	pagination: AddressPagination
}

export type AddressActions = {
	setTransactions: (txs: Transaction[] | null) => void
	addTransactions: (txs: Transaction[]) => void
	setDirection: (direction: TxsDirection) => void
	setLoading: (loading: boolean, initial?: boolean) => void
	setPagination: (pagination: AddressPagination) => void
	resetData: () => void
	// Filters actions
	setFromChainIds: (ids: string[] | undefined) => void
	setToChainIds: (ids: string[] | undefined) => void
	setStatus: (status: Status | undefined) => void
	setType: (type: TxType | undefined) => void
	setToTimestamp: (timestamp: string | undefined) => void
	setFromTimestamp: (timestamp: string | undefined) => void
}

export type AddressState = AddressStateSlice & AddressActions
export type AddressStore = UseBoundStoreWithEqualityFn<StoreApi<AddressState>>
