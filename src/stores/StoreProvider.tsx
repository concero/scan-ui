import type { FC, PropsWithChildren, ReactElement } from 'react'
import { SettingsStoreProvider } from './settings'
import { ModalsStoreProvider } from './modals'

export const StoreProvider: FC<PropsWithChildren<{}>> = ({ children }): ReactElement => {
	return (
		<SettingsStoreProvider>
			<ModalsStoreProvider>{children}</ModalsStoreProvider>
		</SettingsStoreProvider>
	)
}
