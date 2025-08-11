import type { FC, PropsWithChildren, ReactElement } from 'react'
import { SettingsStoreProvider } from './settings/SettingsStore'

export const StoreProvider: FC<PropsWithChildren<{}>> = ({ children }): ReactElement => {
	return (
		<SettingsStoreProvider>
			{children}
		</SettingsStoreProvider>
	)
}