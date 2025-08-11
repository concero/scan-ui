
import type { ReactElement } from 'react';
import { useMemo } from 'react';
import { DarkThemeIcon } from '../../../assets';
import { Switch } from '@concero/ui-kit';
import './style.pcss';

export const ThemeToggle = (): ReactElement => {
	const icon = useMemo(() => <DarkThemeIcon />, []);
	const label = useMemo(() => <span className="theme_toggle_label">Dark Theme</span>, []);
	return (
		<div className="theme_toggle">
			{icon}
			<div className="theme_toggle_content">
				{label}
				<Switch />
			</div>
		</div>
	);
};

