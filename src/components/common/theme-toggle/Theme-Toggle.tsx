import type { ReactElement } from 'react'
import { DarkThemeIcon } from '../../../assets'
import { Switch } from '@concero/ui-kit'
import './style.pcss'

export const ThemeToggle = (): ReactElement => {
	return (
		<div className="theme_toggle">
			<DarkThemeIcon />
			<div className="theme_toggle_content">
				<span className="theme_toggle_label">Dark Theme</span>
				<Switch />
			</div>
		</div>
	)
}
