import type { ReactElement } from 'react'
import { useLocation } from 'react-router-dom'
import { SearchBar } from '../common'
import { HeaderActions } from './HeaderActions'
import { HeaderLogo } from './HeaderLogo'
import { useModalsStore, useIsMobile, useIsTablet } from '@/hooks'
import { useMemo, useState, useEffect } from 'react'
import './styles.pcss'

export const Header = (): ReactElement => {
    const [isBurgerOpen, setBurgerOpen] = useState<boolean>(false)
    const isMobile: boolean = useIsMobile()
    const isTablet: boolean = useIsTablet()
    const { toggleModal } = useModalsStore()

    const location = useLocation()
    const isHomePage: boolean = location.pathname === '/'

    useEffect(() => {
        setBurgerOpen(false)
    }, [isMobile, isTablet]) 

    const search: ReactElement | null = useMemo(() => {
        if (isHomePage || (!isHomePage && (isBurgerOpen || isMobile))) return null

        return (
            <div className="header_search">
                <SearchBar size="m" placeholder="Contract Address, Message, Tx Hash" />
            </div>
        )
    }, [isHomePage, isBurgerOpen, isMobile])

    const logo = useMemo(() => {
        return <HeaderLogo />
    }, [])

    const actions = useMemo(() => {
        return (
            <HeaderActions
                isBurgerOpen={isBurgerOpen}
                setBurgerOpen={setBurgerOpen}
                handleClick={() => toggleModal('concero-support-modal')}
            />
        )
    }, [toggleModal, isBurgerOpen, setBurgerOpen])

    return (
        <header className="header">
            {logo}
            {search}
            {actions}
        </header>
    )
}
