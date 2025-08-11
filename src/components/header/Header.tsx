import type { ReactElement } from 'react'
import { useState, useMemo } from 'react'
import { Button } from '@concero/ui-kit'
import { SearchBar, ThemeToggle } from '../common'
import { useLocation } from 'react-router-dom'
import { SupportModal } from '../common'
import './styles.pcss'

const HeaderLogo = (): ReactElement => {
	return useMemo(
		() => (
			<div className="header_logo">
				<img src="/Concero.svg" alt="Concero" />
			</div>
		),
		[],
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
