import type { FC, PropsWithChildren, ReactElement } from 'react'
import { SettingsStoreProvider } from './settings'
import { ModalsStoreProvider } from './modals'
import { AddressStoreProvider } from './address'
import { TransactionsStoreProvider } from './transactions/TransactionsStore'
import { NotificationsStoreProvider } from './notifications'

export const StoreProvider: FC<PropsWithChildren<{}>> = ({ children }): ReactElement => {
	return (
		<SettingsStoreProvider>
			<ModalsStoreProvider>
				<AddressStoreProvider>
					<TransactionsStoreProvider>
						<NotificationsStoreProvider>{children}</NotificationsStoreProvider>
					</TransactionsStoreProvider>
				</AddressStoreProvider>
			</ModalsStoreProvider>
		</SettingsStoreProvider>
	)
}
