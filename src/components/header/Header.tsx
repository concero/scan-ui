import type { ReactElement } from 'react'
import { useState, useMemo } from 'react'
import { Button } from '@concero/ui-kit'
import { SearchBar, ThemeToggle } from '../common'
import { useLocation, useNavigate } from 'react-router-dom'
import { SupportModal } from '../common'
import { useSettingsStore } from '@/hooks/useSettings'
import './styles.pcss'

const HeaderLogo = (): ReactElement => {
	const navigate = useNavigate()
	const { theme } = useSettingsStore() 

	const isDark = theme === 'dark'
	const logo = isDark ? 'Logo/Concero-Dark.svg' : 'Logo/Concero-Light.svg'

	const handleClick = () => {
		navigate('/')
	}

	return useMemo(
		() => (
			<div className="header_logo" onClick={handleClick} style={{ cursor: 'pointer' }}>
				<img src={logo} alt="Concero" />
			</div>
		),
		[handleClick],
	)
}

type HeaderActionsProps = {
	handleSupportClick: () => void
}

const HeaderActions = ({ handleSupportClick }: HeaderActionsProps): ReactElement => {
	return (
		<div className="header_actions">
			<ThemeToggle />
			<span className="header_divider" />
			<Button variant="secondary" size="m" onClick={handleSupportClick}>
				Contact Support
			</Button>
		</div>
	)
}

export const Header = (): ReactElement => {
	const [isSupportOpen, setIsSupportOpen] = useState<boolean>(false)

	const location = useLocation()
	const isHomePage = useMemo(() => location.pathname === '/', [location.pathname])

	return (
		<>
			<header className="header">
				<HeaderLogo />
				{!isHomePage && (
					<div className="header_search">
						<SearchBar size="m" placeholder="Address, Message, Tx Hash" />
					</div>
				)}
				<HeaderActions handleSupportClick={() => setIsSupportOpen(true)} />
			</header>
			<SupportModal isOpen={isSupportOpen} onClose={() => setIsSupportOpen(false)} />
		</>
	)
}
