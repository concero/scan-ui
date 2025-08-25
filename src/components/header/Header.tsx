import type { ReactElement } from 'react'
import { useLocation } from 'react-router-dom'
import { SearchBar } from '../common'
import { HeaderActions } from './HeaderActions'
import { HeaderLogo } from './HeaderLogo'
import { useModalsStore } from '@/hooks'
import { useMemo, useState } from 'react'
import { useIsMobile } from '@/hooks'
import './styles.pcss'

export const Header = (): ReactElement => {
	const [isBurgerOpen, setBurgerOpen] = useState<boolean>(false)
	const isMobile: boolean = useIsMobile()
	const { toggleModal } = useModalsStore()

	const location = useLocation()
	const isHomePage: boolean = location.pathname === '/'

	const search: ReactElement | null = useMemo(() => {
  		if (isHomePage || (!isHomePage && (isBurgerOpen || isMobile))) return null;

		return (
			<div className="header_search">
				<SearchBar size="m" placeholder="Contract Address, Message, Tx Hash" />
			</div>
		);
	}, [isHomePage, isBurgerOpen, isMobile]);

	const logo = useMemo(() => {
		return <HeaderLogo />
	}, [])

	const actions = useMemo(() => {
		return <HeaderActions isBurgerOpen={isBurgerOpen} setBurgerOpen={setBurgerOpen} handleClick={() => toggleModal('concero-support-modal')} />
	}, [toggleModal, isBurgerOpen, setBurgerOpen])

	return (
		<>
			<header className="header">
				{logo}
				{search}
				{actions}
			</header>
		</>
	)
}
