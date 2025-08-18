import type { ReactElement } from 'react'
import { useLocation } from 'react-router-dom'
import { SearchBar } from '../common'
import { HeaderActions } from './HeaderActions'
import { HeaderLogo } from './HeaderLogo'
import { useModalsStore } from '@/hooks'
import './styles.pcss'

export const Header = (): ReactElement => {
	const { toggleModal } = useModalsStore()

	const location = useLocation()
	const isHomePage: boolean = location.pathname === '/'

	return (
		<>
			<header className="header">
				<HeaderLogo />
				{!isHomePage && (
					<div className="header_search">
						<SearchBar size="m" placeholder="Address, Message, Tx Hash" />
					</div>
				)}
				<HeaderActions handleClick={() => toggleModal('concero-support-modal')} />
			</header>
		</>
	)
}
