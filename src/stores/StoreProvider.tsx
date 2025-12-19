import type { FC, PropsWithChildren, ReactElement } from 'react'
import { SettingsStoreProvider } from './settings'
import { ModalsStoreProvider } from './modals'
import { AddressStoreProvider } from './address'
import { TransactionsStoreProvider } from './transactions/TransactionsStore'
import { NotificationsStoreProvider } from './notifications'
import { ChainsStoreProvider } from './chains'

export const StoreProvider: FC<PropsWithChildren<{}>> = ({ children }): ReactElement => {
	return (
		<SettingsStoreProvider>
			<ChainsStoreProvider>
				<ModalsStoreProvider>
					<AddressStoreProvider>
						<TransactionsStoreProvider>
							<NotificationsStoreProvider>{children}</NotificationsStoreProvider>
						</TransactionsStoreProvider>
					</AddressStoreProvider>
				</ModalsStoreProvider>
			</ChainsStoreProvider>
		</SettingsStoreProvider>
	)
}
