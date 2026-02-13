import type { PropsWithChildren } from 'react'
import { StoreProvider } from '../stores/StoreProvider'
import { ThemeProvider } from './ThemeProvider'
import { QueryProvider } from './QueryProvider'
import { WalletProvider } from './WalletProvider'
import { HelmetProvider } from 'react-helmet-async'

export const AppProviders = ({ children }: PropsWithChildren) => {
	return (
		<HelmetProvider>
			<QueryProvider>
				<StoreProvider>
					<WalletProvider>
						<ThemeProvider />
						{children}
					</WalletProvider>
				</StoreProvider>
			</QueryProvider>
		</HelmetProvider>
	)
}
