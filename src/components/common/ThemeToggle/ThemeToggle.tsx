import type { ReactElement } from 'react'
import { DarkThemeIcon } from '../../../assets'
import { useMemo } from 'react'
import { Switch } from '@concero/ui-kit'
import { useSettingsStore } from '@/hooks/useSettings'
import { Theme } from '@/stores/settings/types'
import './style.pcss'

export const ThemeToggle = (): ReactElement => {
	const { theme, setTheme } = useSettingsStore()

	const toggleTheme = (): void => {
		const theme: Theme = isDark ? 'light' : 'dark'
		setTheme(theme)
	}

	const isDark: boolean = theme === 'dark'
	const icon: ReactElement = useMemo(() => <DarkThemeIcon />, [])
	const switcher: ReactElement = useMemo(
		() => <Switch checked={isDark} onChange={toggleTheme} />,
		[isDark, toggleTheme],
	)

	return (
		<div className="theme_toggle">
			{icon}
			<div className="theme_toggle_content">
				<span className="theme_toggle_label">Dark Theme</span>
				{switcher}
			</div>
		</div>
	)
}
