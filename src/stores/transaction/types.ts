import type { UseBoundStoreWithEqualityFn } from 'zustand/traditional'
import type { StoreApi } from 'zustand'
import { Transaction } from '@/types'

export type TransactionStateSlice = {
	transaction: Transaction | null
	loading: boolean
}

export type TransactionActions = {
	setTransaction: (transaction: Transaction | null) => void
	setLoading: (loading: boolean) => void
}

export type TransactionState = TransactionStateSlice & TransactionActions
export type TransactionStore = UseBoundStoreWithEqualityFn<StoreApi<TransactionState>>
