import type { PropsWithChildren } from 'react'
import type { AddressStore } from './types'
import { useRef } from 'react'
import { AddressContext } from './AddressContext'
import { CreateAddressStore } from './CreateAddressStore'

export function AddressStoreProvider({ children }: PropsWithChildren) {
	const storeRef = useRef<AddressStore | null>(null)

	if (!storeRef.current) {
		storeRef.current = CreateAddressStore()
	}

	return <AddressContext.Provider value={storeRef.current}>{children}</AddressContext.Provider>
}
