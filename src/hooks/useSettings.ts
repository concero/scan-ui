import type { SettingsState } from '@/stores'
import { useContext } from 'react'
import { SettingsContext } from '@/stores'

export type UseSettingsStoreResult = {
	theme: SettingsState['theme']
	setTheme: SettingsState['setTheme']
	resetSettings: SettingsState['resetSettings']
}

export const useSettingsStore = (): UseSettingsStoreResult => {
	const useStore = useContext(SettingsContext)

	if (!useStore) {
		throw new Error('useSettingsStore must be used inside <SettingsStoreProvider>.')
	}

	return {
		theme: useStore(state => state.theme),
		setTheme: useStore(state => state.setTheme),
		resetSettings: useStore(state => state.resetSettings),
	}
}
