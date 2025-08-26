import type { ReactElement } from 'react'
import { useEffect, useMemo } from 'react'
import { SearchBar } from '@/components/common'
import { BurgerItem } from './BurgerItem'
import { DarkThemeIcon, PointerRightIcon, UserIcon } from '@/assets'
import { useModalsStore, useSettingsStore } from '@/hooks'
import { Switch } from '@concero/ui-kit'
import { useIsTablet, useIsMobile } from '@/hooks'
import './styles.pcss'

export const HeaderBurger = (): ReactElement | null => {
	const { theme, setTheme } = useSettingsStore()
	const { toggleModal } = useModalsStore()

	const isTablet: boolean = useIsTablet()
	const isMobile: boolean = useIsMobile()

	const isDark = theme === 'dark'

	const toggleTheme = (): void => {
		setTheme(isDark ? 'light' : 'dark')
	}

	const openSupportModal = (): void => {
		toggleModal('concero-support-modal')
	}

	const themeSwitch = useMemo(() => <Switch checked={isDark} onChange={toggleTheme} />, [isDark, toggleTheme])

	useEffect(() => {
		const overflow = document.body.style.overflow
		document.body.style.overflow = 'hidden'
		return () => {
			document.body.style.overflow = overflow
		}
	}, [])

	if (isTablet) {
		return (
			<div className="header_burger_tablet">
				<BurgerItem icon={<DarkThemeIcon />} label="Dark Theme" action={themeSwitch} onClick={toggleTheme} />
				<div className="header_burger_divider" />
				<BurgerItem
					icon={<UserIcon />}
					label="Contact Support"
					action={<PointerRightIcon />}
					onClick={openSupportModal}
				/>
			</div>
		)
	}

	if (isMobile) {
		return (
			<div className="header_burger" role="navigation" aria-label="Sidebar menu">
				<SearchBar />
				<div className="header_burger_divider" />
				<BurgerItem icon={<DarkThemeIcon />} label="Dark Theme" action={themeSwitch} onClick={toggleTheme} />
				<div className="header_burger_divider" />
				<BurgerItem
					icon={<UserIcon />}
					label="Contact Support"
					action={<PointerRightIcon />}
					onClick={openSupportModal}
				/>
			</div>
		)
	}

	return null
}
