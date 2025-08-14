import type { ReactElement } from 'react'
import { useState, useCallback } from 'react'
import { useLocation } from 'react-router-dom'
import { SearchBar, SupportModal } from '../common'
import { HeaderActions } from './header-actions'
import { HeaderLogo } from './header-logo'
import './styles.pcss'

export const Header = (): ReactElement => {
	const [isSupportOpen, setIsSupportOpen] = useState<boolean>(false)
	const location = useLocation()

	const isHomePage: boolean = location.pathname === '/'

	const openSupport = useCallback(() => setIsSupportOpen(true), [])
	const closeSupport = useCallback(() => setIsSupportOpen(false), [])

	return (
		<>
			<header className="header">
				<HeaderLogo />
				{!isHomePage && (
					<div className="header_search">
						<SearchBar size="m" placeholder="Address, Message, Tx Hash" />
					</div>
				)}
				<HeaderActions handleClick={openSupport} />
			</header>

			<SupportModal isOpen={isSupportOpen} onClose={closeSupport} />
		</>
	)
}
