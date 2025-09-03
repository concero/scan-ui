import type { TransactionState } from './types'
import { createWithEqualityFn } from 'zustand/traditional'

export const CreateTransactionStore = () =>
    createWithEqualityFn<TransactionState>(
        set => ({
            transaction: null,
            loading: false,

            setTransaction: transaction => set({ transaction }),
            setLoading: loading => set({ loading }),
        }),
        Object.is,
    )
