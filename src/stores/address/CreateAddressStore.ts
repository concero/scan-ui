import type { AddressState } from './types'
import { TxsDirection } from '@/types'
import { createWithEqualityFn } from 'zustand/traditional'

export const CreateAddressStore = () =>
	createWithEqualityFn<AddressState>(
		set => ({
			txs: null,
			loading: false,
			direction: TxsDirection.Outgoing,

			setTransactions: txs => set({ txs }),
			setLoading: loading => set({ loading }),
			setFilter: (filter: TxsDirection) => set({ direction: filter }),
		}),
		Object.is,
	)
