import type { ChainsState, ChainsActions, Chain } from './types'
import { createWithEqualityFn } from 'zustand/traditional'

export const CreateChainsStore = () =>
	createWithEqualityFn<ChainsState & ChainsActions>(
		set => ({
			chains: {},
			isLoading: false,

			setChains: (chains: Chain[]) =>
				set(() => ({
					chains: chains.reduce(
						(acc, chain) => {
							acc[chain.id] = chain
							return acc
						},
						{} as Record<number, Chain>,
					),
				})),

			setLoading: (isLoading: boolean) => set({ isLoading }),
		}),
		Object.is,
	)
