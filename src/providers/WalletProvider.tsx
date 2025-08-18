import type { ReactElement } from 'react'
import { wagmiConfig } from '@/configuration'
import { WagmiProvider } from 'wagmi'

export const WalletProvider: React.FC<React.PropsWithChildren> = ({ children }): ReactElement => {
	return <WagmiProvider config={wagmiConfig}>{children}</WagmiProvider>
}
