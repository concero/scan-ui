import type { ReactElement } from 'react'
import { useLocation } from 'react-router-dom'
import { SearchBar } from '../common'
import { HeaderActions } from './HeaderActions'
import { HeaderLogo } from './HeaderLogo'
import { useModalsStore } from '@/hooks'
import { useMemo } from 'react'
import './styles.pcss'

export const Header = (): ReactElement => {
	const { toggleModal } = useModalsStore()

	const location = useLocation()
	const isHomePage: boolean = location.pathname === '/'

	const search: ReactElement | null = useMemo(() => {
		if (!isHomePage) {
			return (
				<div className="header_search">
					<SearchBar size="m" placeholder="Contract Address, Message, Tx Hash" />
				</div>
			)
		}
		return null
	}, [isHomePage])

	const logo = useMemo(() => {
		return <HeaderLogo />
	}, [])

	const actions = useMemo(() => {
		return <HeaderActions handleClick={() => toggleModal('concero-support-modal')} />
	}, [toggleModal])

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
