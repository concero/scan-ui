import { useEffect } from 'react'
import { useSettingsStore } from '@/hooks/useSettings'

export const ThemeProvider = () => {
	const { theme } = useSettingsStore()

	useEffect(() => {
		document.documentElement.setAttribute('data-theme', theme)
		document.documentElement.style.colorScheme = theme
	}, [theme])

	return null
}
