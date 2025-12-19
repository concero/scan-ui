import type { UseBoundStoreWithEqualityFn } from 'zustand/traditional'
import type { StoreApi } from 'zustand/vanilla'

export type Chain = {
	id: number
	name: string
	selector: bigint
	logo: string
	nativeCurrency: {
		name: string
		symbol: string
		decimals: number
	}
	rpcUrls: {
		default: {
			http: string[]
		}
	}
	explorer: string | null
	testnet: boolean
	contracts: {
		message_v2: string
	}
}

export type ChainsState = {
	chains: Record<number, Chain>
	isLoading: boolean
}

export type ChainsActions = {
	setChains: (chains: Chain[]) => void
	setLoading: (isLoading: boolean) => void
}

export type ChainsStore = UseBoundStoreWithEqualityFn<StoreApi<ChainsState & ChainsActions>>
