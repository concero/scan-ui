import type { FC, PropsWithChildren } from 'react'
import { StoreProvider } from '../stores/StoreProvider'
import { ThemeProvider } from './ThemeProvider'

export const AppProviders: FC<PropsWithChildren<{}>> = ({ children }) => {
	return (
		<StoreProvider>
			<ThemeProvider />
			{children}
		</StoreProvider>
	)
}
