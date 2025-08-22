import type { ReactElement, ImgHTMLAttributes } from 'react'
import { useIsDesktop, useIsTablet, useIsMobile, useIsUltrawide } from '@/hooks'
import { DesktopVisuals } from './DesktopVisuals'
import { TabletVisuals } from './TabletVisuals'
import './styles.pcss'

export type Visual = {
	src: string
	alt: string
	className: string
	props?: Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt' | 'className'>
}

const MobileVisuals = (): ReactElement => <div className="visuals"></div>

export const HomeVisuals = (): ReactElement => {
	const isUltrawide: boolean = useIsUltrawide()
	const isDesktop: boolean = useIsDesktop()
	const isTablet: boolean = useIsTablet()
	const isMobile: boolean = useIsMobile()

	switch (true) {
		case isUltrawide:
		case isDesktop:
			return <DesktopVisuals />
		case isTablet:
			return <TabletVisuals />
		case isMobile:
			return <MobileVisuals />
		default:
			return <DesktopVisuals />
	}
}
