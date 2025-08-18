import type { PropsWithChildren } from 'react'
import type { ModalsStore } from './types'
import { useRef } from 'react'
import { ModalsContext } from './ModalsContext'
import { CreateModalsStore } from './CreateModalsStore'

export function ModalsStoreProvider({ children }: PropsWithChildren) {
	const storeRef = useRef<ModalsStore | null>(null)

	if (!storeRef.current) {
		storeRef.current = CreateModalsStore()
	}

	return <ModalsContext.Provider value={storeRef.current}>{children}</ModalsContext.Provider>
}