import type { FC, PropsWithChildren } from 'react'
import { StoreProvider } from '../stores/StoreProvider'
import { ThemeProvider } from './ThemeProvider'
import { QueryProvider } from './QueryProvider'
import { WalletProvider } from './WalletProvider'

export const AppProviders: FC<PropsWithChildren<{}>> = ({ children }) => {
	return (
		<StoreProvider>
			<QueryProvider>
				<WalletProvider>
					<ThemeProvider />
					{children}
				</WalletProvider>
			</QueryProvider>
		</StoreProvider>
	)
}
