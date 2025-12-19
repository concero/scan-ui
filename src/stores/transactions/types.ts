import type { UseBoundStoreWithEqualityFn } from 'zustand/traditional'
import type { StoreApi } from 'zustand'
import { Transaction } from '@/types'

export type TransactionPagination = {
	take: number
	skip: number
}

export type TransactionsStateSlice = {
	txs: Transaction[] | null
	initialLoading: boolean
	dataLoading: boolean
	pagination: TransactionPagination
}

export type TransactionsActions = {
	setTransactions: (txs: Transaction[] | null) => void
	addTransactions: (txs: Transaction[]) => void
	setLoading: (loading: boolean, initial?: boolean) => void
	setPagination: (pagination: TransactionPagination) => void
	resetData: () => void
}

export type TransactionsState = TransactionsStateSlice & TransactionsActions
export type TransactionsStore = UseBoundStoreWithEqualityFn<StoreApi<TransactionsState>>
