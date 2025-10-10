import type { UseBoundStoreWithEqualityFn } from 'zustand/traditional'
import type { StoreApi } from 'zustand'
import { Transaction } from '@/types'

export type Pagination = {
    take: number
    skip: number
}

export type TransactionsStateSlice = {
    txs: Transaction[] | null
    initialLoading: boolean
    dataLoading: boolean
    pagination: Pagination
}

export type TransactionsActions = {
    setTransactions: (txs: Transaction[] | null) => void
    addTransactions: (txs: Transaction[]) => void
    setLoading: (loading: boolean, initial?: boolean) => void
    setPagination: (pagination: Pagination) => void
    resetData: () => void
}


export type TransactionsState = TransactionsStateSlice & TransactionsActions
export type TransactionsStore = UseBoundStoreWithEqualityFn<StoreApi<TransactionsState>>
