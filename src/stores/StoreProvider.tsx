import type { FC, PropsWithChildren, ReactElement } from 'react'
import { SettingsStoreProvider } from './settings'
import { ModalsStoreProvider } from './modals'
import { NotificationStoreProvider } from './notifications'

export const StoreProvider: FC<PropsWithChildren<{}>> = ({ children }): ReactElement => {
	return (
		<SettingsStoreProvider>
			<ModalsStoreProvider>
				<NotificationStoreProvider>
					{children}
				</NotificationStoreProvider>
			</ModalsStoreProvider>
		</SettingsStoreProvider>
	)
}
