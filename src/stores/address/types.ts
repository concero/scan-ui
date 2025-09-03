import type { UseBoundStoreWithEqualityFn } from 'zustand/traditional'
import type { StoreApi } from 'zustand'
import { Status, TransactionType } from '@/components'

export type AddressTxDirection = {
	logo: string
	address: string
}

export type AddressTx = {
	messageId: string
	type: TransactionType
	timestamp: number
	status: Status
	from: AddressTxDirection
	to: AddressTxDirection
}

export type AddressTxFilters = {
	fromTime?: number
	toTime?: number
	status?: Status
	type?: TransactionType
}

export type AddressStateSlice = {
	txs: AddressTx[] | null
	filters: AddressTxFilters
	loading: boolean
}

export type AddressActions = {
	setTransactions: (txs: AddressTx[]) => void
	setFilters: (filters: Partial<AddressTxFilters>) => void
	resetFilters: () => void
	setLoading: (loading: boolean) => void
}

export type AddressState = AddressStateSlice & AddressActions
export type AddressStore = UseBoundStoreWithEqualityFn<StoreApi<AddressState>>
