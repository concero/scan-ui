import type { ReactElement } from 'react'
import { useEffect, useMemo, useCallback } from 'react'
import { SearchBar } from '@/components/common'
import { BurgerItem } from './BurgerItem'
import { DarkThemeIcon, PointerRightIcon, UserIcon } from '@/assets'
import { useModalsStore, useSettingsStore } from '@/hooks'
import { Switch } from '@concero/ui-kit'
import { useIsTablet, useIsMobile } from '@/hooks'
import './styles.pcss'

type HeaderBurgerProps = {
    readonly setBurgerOpen: (value: boolean) => void
}

export const HeaderBurger = ({ setBurgerOpen }: HeaderBurgerProps): ReactElement | null => {
    const { theme, setTheme } = useSettingsStore()
    const { toggleModal } = useModalsStore()

    const isTablet = useIsTablet()
    const isMobile = useIsMobile()
    const isDark = theme === 'dark'

    const toggleTheme = useCallback(() => {
        setTheme(isDark ? 'light' : 'dark')
    }, [isDark, setTheme])

    const openSupportModal = useCallback(() => {
        toggleModal('concero-support-modal')
    }, [toggleModal])

	const handleOutsideClick = useCallback((event: MouseEvent) => {
		const target = event.target as HTMLElement | null
		if (!target) return

		if (!target.closest('.header_burger_tablet')) {
			setBurgerOpen(false)
		}
	}, [setBurgerOpen])

    const themeSwitch = useMemo(
        () => <Switch checked={isDark} onChange={toggleTheme} />,
        [isDark, toggleTheme]
    )

    const burgerItem = useMemo(
        () => <BurgerItem icon={<DarkThemeIcon />} label="Dark Theme" action={themeSwitch} onClick={toggleTheme} />,
        [themeSwitch, toggleTheme]
    )

    const support = useMemo(
        () => <BurgerItem icon={<UserIcon />} label="Contact Support" action={<PointerRightIcon />} onClick={openSupportModal} />,
        [openSupportModal]
    )

    useEffect(() => {
        const originalOverflow = document.body.style.overflow
        document.body.style.overflow = 'hidden'
        return () => {
            document.body.style.overflow = originalOverflow
        }
    }, [])

	useEffect(() => {
		if (!isTablet) return
		document.addEventListener('mousedown', handleOutsideClick)
		return () => {
			document.removeEventListener('mousedown', handleOutsideClick)
		}
	}, [isTablet, handleOutsideClick])

    if (isTablet) {
        return (
            <div className="header_burger_tablet">
                {burgerItem}
                <div className="header_burger_divider" />
                {support}
            </div>
        )
    }

    if (isMobile) {
        return (
            <div className="header_burger" role="navigation" aria-label="Sidebar menu">
                <SearchBar />
                <div className="header_burger_divider" />
                {burgerItem}
                <div className="header_burger_divider" />
                {support}
            </div>
        )
    }

    return null
}
