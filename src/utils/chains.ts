import { fallback, FallbackTransportConfig, http, HttpTransport, isAddress } from 'viem'
import { defineChain } from 'viem'
import { Transport } from 'wagmi'

const API_BASE_URL = 'https://dev.concero.io'
const CHAIN_LOGO_BASE_URL = 'https://dev.concero.io/static/chains'

export enum DeploymentType {
	usdc_e = 'usdc_e',
	usdc = 'usdc',
	bridge_lbf = 'bridge_lbf',
	bridge_v2 = 'bridge_v2',
	message_v2 = 'message_v2',
	orchestrator = 'orchestrator',
	message_v1 = 'message_v1',
}

export type ApiChain = {
	id: number
	is_testnet: boolean
	allow_usage: boolean
	name: string
	ccip_selector: string | null
	concero_selector: string | null
	native_currency_decimals: number
	native_currency_name: string
	native_currency_symbol: string
	explorer: string | null
	rpcs: string[]
}

export type ApiChainDeployment = {
	chain_id: number
	type: DeploymentType
	address: string
}

export type ChainConfig = {
	chain: ApiChain
	deployments: ApiChainDeployment[]
}

export type ConceroChain = {
	id: number
	name: string
	selector: bigint
	logo: string
	nativeCurrency: {
		name: string
		symbol: string
		decimals: number
	}
	rpcUrls: { default: { http: string[] } }
	explorer: string | null
	testnet: boolean
	contracts: {
		message_v2: string
	}
}

export const parseChainName = (chainName: string): string => {
	return chainName
		.replace(/([a-z])([A-Z])/g, '$1 $2')
		.replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2')
		.replace(/^./, match => match.toUpperCase())
		.trim()
}

export const getChains = async (isTestnet = true) => {
	const url = new URL('/api/v1/chains/configuration', API_BASE_URL)
	url.searchParams.set('is_testnet', String(isTestnet))

	const response = await fetch(url.toString())

	if (!response.ok) {
		throw new Error(`[Concero] Failed to fetch chain configuration: ${response.status} ${response.statusText}`)
	}

	return response.json()
}

const findDeploymentAddress = (deployments: ApiChainDeployment[], type: DeploymentType): string | undefined => {
	return deployments.find(d => d.type === type)?.address
}

const sanitizeRpcUrls = (rpcs: string[]): string[] => {
	return Array.isArray(rpcs) ? rpcs.filter(Boolean) : []
}

export const toConceroChain = (config: ChainConfig): ConceroChain | null => {
	const messagingV2 = findDeploymentAddress(config.deployments, DeploymentType.message_v2)
	const validRpcs = sanitizeRpcUrls(config.chain.rpcs)

	if (!messagingV2 || validRpcs.length === 0) return null
	if (!isAddress(messagingV2)) return null

	const displayName = parseChainName(config.chain.name)

	return {
		id: Number(config.chain.id),
		name: displayName,
		selector: config.chain.concero_selector ? BigInt(config.chain.concero_selector) : 0n,
		logo: `${CHAIN_LOGO_BASE_URL}/${config.chain.id}.svg`,
		nativeCurrency: {
			name: config.chain.native_currency_name,
			symbol: config.chain.native_currency_symbol,
			decimals: config.chain.native_currency_decimals,
		},
		rpcUrls: {
			default: { http: validRpcs },
		},
		explorer: config.chain.explorer,
		testnet: config.chain.is_testnet,
		contracts: {
			message_v2: messagingV2,
		},
	}
}

export const toConceroChains = (configs: ChainConfig[]): ConceroChain[] => {
	return configs.reduce<ConceroChain[]>((validChains, config) => {
		const chain = toConceroChain(config)
		if (chain) {
			validChains.push(chain)
		}
		return validChains
	}, [])
}

export const convertToViemChain = (chain: ConceroChain) => {
	return {
		id: chain.id,
		name: chain.name,
		nativeCurrency: {
			name: chain.nativeCurrency.name,
			symbol: chain.nativeCurrency.symbol,
			decimals: chain.nativeCurrency.decimals,
		},
		rpcUrls: {
			default: {
				http: chain.rpcUrls.default.http.filter(Boolean),
			},
		},
		testnet: chain.testnet,
	}
}

export const convertToViemChains = (chains: ConceroChain[]): ReturnType<typeof defineChain>[] => {
	return chains.map(chain =>
		defineChain({
			id: chain.id,
			name: chain.name,
			nativeCurrency: {
				name: chain.nativeCurrency.name,
				symbol: chain.nativeCurrency.symbol,
				decimals: chain.nativeCurrency.decimals,
			},
			rpcUrls: {
				default: {
					http: chain.rpcUrls.default.http.filter(Boolean),
				},
			},
			testnet: chain.testnet,
		}),
	)
}

const createHTTP = (url: string): HttpTransport => {
	return http(url, {
		batch: true,
	})
}

const createFallback = (urls: string[], options?: Partial<FallbackTransportConfig>): Transport => {
	return fallback(
		urls.map(url => createHTTP(url)),
		{
			retryCount: 10,
			retryDelay: 1000,
			...options,
		},
	)
}

export const createTransports = (chains: ConceroChain[]): Record<number, Transport> => {
	return chains.reduce<Record<number, Transport>>((transports, chain) => {
		transports[chain.id] = createFallback(chain.rpcUrls.default.http)
		return transports
	}, {})
}
