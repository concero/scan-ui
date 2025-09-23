import type { AddressState } from './types'
import { TxsDirection } from '@/types'
import { createWithEqualityFn } from 'zustand/traditional'

export const CreateAddressStore = () =>
	createWithEqualityFn<AddressState>(
		set => ({
			txs: null,
			loading: false,
			direction: TxsDirection.Outgoing,
			count: 0,
			page: 1,

			setTransactions: txs => set({ txs }),
			setLoading: loading => set({ loading }),
			setCount: (count: number) => set({ count }),
			setDirection: (direction: TxsDirection) => set({ direction: direction }),
			setPage: (page: number) => set({ page }),
		}),
		Object.is,
	)
