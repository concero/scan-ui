import type { AddressState } from './types'
import { createWithEqualityFn } from 'zustand/traditional'

export const CreateAddressStore = () =>
	createWithEqualityFn<AddressState>(
		set => ({
			txs: null,
			filters: {},
			loading: false,

			setTransactions: txs => set({ txs }),
			setFilters: filters => set(state => ({ filters: { ...state.filters, ...filters } })),
			resetFilters: () => set({ filters: {} }),
			setLoading: loading => set({ loading }),
		}),
		Object.is,
	)
