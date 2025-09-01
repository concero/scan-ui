import type { ReactElement } from 'react'
import type { Location } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { useMemo, useState, useEffect, useCallback } from 'react'
import { SearchBar } from '../common'
import { HeaderActions } from './HeaderActions'
import { HeaderLogo } from './HeaderLogo'
import { useModalsStore, useIsMobile, useIsTablet } from '@/hooks'
import { routes } from '@/configuration'
import './styles.pcss'

export const Header = (): ReactElement => {
	const [isBurgerOpen, setBurgerOpen] = useState<boolean>(false)
	const isMobile: boolean = useIsMobile()
	const isTablet: boolean = useIsTablet()
	const location: Location = useLocation()

	const { toggleModal } = useModalsStore()

	const isHomePage: boolean = location.pathname === routes.home()

	useEffect(() => {
		setBurgerOpen(false)
	}, [isMobile, isTablet])

	const toggleSupport: () => void = useCallback(() => {
		toggleModal('concero-support-modal')
	}, [toggleModal])

	const search = useMemo<ReactElement | null>(() => {
		if (isHomePage || (!isHomePage && ((isBurgerOpen && !isTablet) || isMobile))) {
			return null
		}

		return (
			<div className="header_search">
				<SearchBar size="m" placeholder="Contract Address, Message, Tx Hash" />
			</div>
		)
	}, [isHomePage, isBurgerOpen, isMobile, isTablet])

	const logo = useMemo<ReactElement>(() => <HeaderLogo />, [])

	const actions: ReactElement = useMemo<ReactElement>(
		() => <HeaderActions isBurgerOpen={isBurgerOpen} setBurgerOpen={setBurgerOpen} handleClick={toggleSupport} />,
		[isBurgerOpen, setBurgerOpen, toggleSupport],
	)

	return (
		<header className="header">
			{logo}
			{search}
			{actions}
		</header>
	)
}
