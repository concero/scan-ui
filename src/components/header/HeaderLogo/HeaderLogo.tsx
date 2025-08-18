import type { ReactElement, MouseEventHandler } from 'react'
import { useCallback, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSettingsStore } from '@/hooks'
import { routes } from '@/configuration'
import './styles.pcss'

export const HeaderLogo = (): ReactElement => {
	const navigate = useNavigate()
	const { theme } = useSettingsStore()

	const isDark: boolean = theme === 'dark'
	const logoURL: string = isDark ? '/Logo/Concero-Dark.svg' : '/Logo/Concero-Light.svg'

	const handleClick = useCallback<MouseEventHandler<HTMLDivElement>>(() => navigate(routes.home()), [navigate])

	return useMemo(
		() => (
			<div
				className="header_logo"
				onClick={handleClick}
				onKeyDown={e => {
					if (e.key === 'Enter' || e.key === ' ') {
						e.preventDefault()
						handleClick(e as unknown as React.MouseEvent<HTMLDivElement>)
					}
				}}
				role="button"
				tabIndex={0}
				style={{ cursor: 'pointer' }}
				aria-label="Go to homepage"
			>
				<img src={logoURL} alt="Concero logo" />
			</div>
		),
		[handleClick, logoURL],
	)
}
