import type { FC, PropsWithChildren } from 'react'
import { StoreProvider } from '../stores/StoreProvider'
import { ThemeProvider } from './ThemeProvider'
import { QueryProvider } from './QueryProvider'
import { WalletProvider } from './WalletProvider'
import { HelmetProvider } from 'react-helmet-async'

export const AppProviders: FC<PropsWithChildren<{}>> = ({ children }) => {
	return (
		<HelmetProvider>
			<StoreProvider>
				<QueryProvider>
					<WalletProvider>
						<ThemeProvider />
						{children}
					</WalletProvider>
				</QueryProvider>
			</StoreProvider>
		</HelmetProvider>
	)
}
