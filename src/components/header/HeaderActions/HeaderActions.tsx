import type { ReactElement, MouseEventHandler } from 'react'
import { Button } from '@concero/ui-kit'
import { useState } from 'react'
import { IconButton } from '@concero/ui-kit'
import { ThemeToggle } from '@/components/common'
import { useIsMobile } from '@/hooks'
import { useIsTablet } from '@/hooks'
import { CloseIcon } from '@/assets'
import { BurgerIcon } from '@/assets'
import { HeaderBurger } from '../HeaderBurger'
import './styles.pcss'

type HeaderActionsProps = {
	readonly handleClick: MouseEventHandler<HTMLButtonElement>
}

export const HeaderActions = ({ handleClick }: HeaderActionsProps): ReactElement => {
	const [isBurgerOpen, setBurgerOpen] = useState<boolean>(false)

	const isTablet: boolean = useIsTablet()
	const isMobile: boolean = useIsMobile()
	const isBurger: boolean = isMobile || isTablet

	return (
		<>
			<div className="header_actions">
				{!isBurger ? (
					<>
						<ThemeToggle />
						<span className="header_divider" />
						<Button variant="secondary" size="m" onClick={handleClick}>
							Contact Support
						</Button>
					</>
				) : (
					<IconButton size="m" variant="secondary" onClick={() => setBurgerOpen(prev => !prev)}>
						{isBurgerOpen ? <CloseIcon /> : <BurgerIcon />}
					</IconButton>
				)}
			</div>
			{isBurgerOpen && <HeaderBurger />}
		</>
	)
}
