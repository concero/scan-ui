import type { ReactElement } from 'react'
import { Button } from '@concero/ui-kit'
import { SearchBar, ThemeToggle } from '../common'
import { useLocation } from 'react-router-dom'
import './style.pcss'

export const Header = (): ReactElement => {
	const location = useLocation()
	const isHomePage = location.pathname === '/'

	return (
		<header className="header">
			<div className="header_logo">
				<img src="/Concero.svg" alt="Concero" />
			</div>
			{!isHomePage && (
				<div className="header_search">
					<SearchBar size='m' placeholder='Address, Message, Tx Hash' />
				</div>
			)}
			<div className="header_actions">
				<ThemeToggle />
				<span className="header_divider" />
				<Button variant="secondary" size="m">
					Contact Support
				</Button>
			</div>
		</header>
	)
}
