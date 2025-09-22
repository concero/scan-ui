import type { AddressState } from './types'
import { createWithEqualityFn } from 'zustand/traditional'

export const CreateAddressStore = () =>
	createWithEqualityFn<AddressState>(
		set => ({
			txs: null,
			loading: false,

			setTransactions: txs => set({ txs }),
			setLoading: loading => set({ loading }),
		}),
		Object.is,
	)
