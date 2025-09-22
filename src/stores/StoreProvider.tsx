import type { FC, PropsWithChildren, ReactElement } from 'react'
import { SettingsStoreProvider } from './settings'
import { ModalsStoreProvider } from './modals'
import { AddressStoreProvider } from './address'
import { TransactionStoreProvider } from './transaction/TransactionStore'

export const StoreProvider: FC<PropsWithChildren<{}>> = ({ children }): ReactElement => {
	return (
		<SettingsStoreProvider>
			<ModalsStoreProvider>
				<AddressStoreProvider>
					<TransactionStoreProvider>{children}</TransactionStoreProvider>
				</AddressStoreProvider>
			</ModalsStoreProvider>
		</SettingsStoreProvider>
	)
}
