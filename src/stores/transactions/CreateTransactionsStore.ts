import type { TransactionsState } from './types'
import { createWithEqualityFn } from 'zustand/traditional'

export const CreateTransactionsStore = () =>
    createWithEqualityFn<TransactionsState>(
        set => ({
            txs: null,
            initialLoading: false,
            dataLoading: false,
            pagination: { take: 10, skip: 0 },

            setTransactions: (txs) => set({ txs }),
            addTransactions: (newTxs) =>
                set(state => ({
                    txs: state.txs ? [...state.txs, ...newTxs] : newTxs,
                })),
            setLoading: (loading, initial = false) =>
                set(initial ? { initialLoading: loading } : { dataLoading: loading }),
            setPagination: (pagination) => set({ pagination }),
            resetData: () =>
                set({
                    txs: null,
                    initialLoading: false,
                    dataLoading: false,
                    pagination: { take: 10, skip: 0 },
                }),
        }),
        Object.is,
    )
