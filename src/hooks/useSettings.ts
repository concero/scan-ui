import type { SettingsStore, SettingsState } from '@/stores/settings/types'
import { useContext } from 'react'
import { SettingsContext } from '@/stores/settings/SettingsContext'

export const useSettingsStore = () => {
	const useStore = useContext(SettingsContext) as SettingsStore | null
	if (!useStore) {
		throw new Error(`You forgot to wrap your component in <SettingsStoreProvider>.`)
	}

	const theme = useStore((state: SettingsState) => state.theme)
	const setTheme = useStore((state: SettingsState) => state.setTheme)
	const resetSettings = useStore((state: SettingsState) => state.resetSettings)

	return {
		theme,
		setTheme,
		resetSettings,
	}
}
