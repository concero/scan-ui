import type { AddressState } from './types'
import { TxsDirection } from '@/types'
import { createWithEqualityFn } from 'zustand/traditional'

export const CreateAddressStore = () =>
  createWithEqualityFn<AddressState>(
    set => {
      const defaultState = {
        txs: null,
        initialLoading: false,
        dataLoading: false,
        dataFilters: { direction: TxsDirection.Outgoing },
        pagination: { take: 20, skip: 0 },
      }

      return {
        ...defaultState,

        setTransactions: txs => set({ txs }),

        addTransactions: newTxs =>
          set(state => ({
            txs: state.txs ? [...state.txs, ...newTxs] : [...newTxs],
          })),

        setDirection: direction =>
          set(() => ({
            dataFilters: { direction },
          })),

        setLoading: (loading, initial = false) =>
          set(() => (initial ? { initialLoading: loading } : { dataLoading: loading })),

        setPagination: pagination => set({ pagination }),

        resetData: () => set({ ...defaultState }),
      }
    },
    Object.is,
  )
