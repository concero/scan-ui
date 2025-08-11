import type { FC, PropsWithChildren } from 'react'
import { StoreProvider } from '../stores/StoreProvider'

export const AppProviders: FC<PropsWithChildren<{}>> = ({ children }) => {
	return (
		<StoreProvider>
			{children}
		</StoreProvider>
	)
}