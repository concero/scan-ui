import { useRef, type ReactElement } from 'react'
import { Config, createConfig, injected, WagmiProvider, http } from 'wagmi'
import { arbitrumSepolia } from 'viem/chains'
import { useChainsStore } from '@/hooks/useChainsStore'
import { useSyncWagmiConfig } from '@/hooks/useSyncWagmi'
import { useLoadChains } from '@/hooks/Loadables/useLoadChains'

const connectors = [injected()]

export const WalletProvider: React.FC<React.PropsWithChildren> = ({ children }): ReactElement => {
	useLoadChains()
	const { chains } = useChainsStore()
	const wagmi = useRef<Config>(null)

	if (!wagmi.current) {
		wagmi.current = createConfig({
			chains: [arbitrumSepolia],
			connectors,
			ssr: true,
			transports: {
				[arbitrumSepolia.id]: http(),
			},
		})
	}

	useSyncWagmiConfig(wagmi.current, connectors, Object.values(chains))

	return (
		<WagmiProvider config={wagmi.current} reconnectOnMount={false}>
			{children}
		</WagmiProvider>
	)
}
