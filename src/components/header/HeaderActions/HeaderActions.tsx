import type { ReactElement, MouseEventHandler } from 'react'
import { useCallback, useMemo } from 'react'
import { Button, IconButton } from '@concero/ui-kit'
import { ThemeToggle } from '@/components/common'
import { useIsMobile, useIsTablet } from '@/hooks'
import { CloseIcon, BurgerIcon } from '@/assets'
import { HeaderBurger } from '../HeaderBurger'
import './styles.pcss'

type HeaderActionsProps = {
    readonly isBurgerOpen: boolean
    readonly setBurgerOpen: (value: boolean | ((prevState: boolean) => boolean)) => void
    readonly handleClick: MouseEventHandler<HTMLButtonElement>
}

export const HeaderActions = ({
    handleClick,
    isBurgerOpen,
    setBurgerOpen,
}: HeaderActionsProps): ReactElement => {
    const isTablet: boolean = useIsTablet()
    const isMobile: boolean = useIsMobile()
    const isBurger: boolean = isMobile || isTablet

    const toggleBurger = useCallback((): void => {
        setBurgerOpen(prev => !prev)
    }, [setBurgerOpen])

    const iconButton = useMemo<ReactElement>(() => (
        <IconButton size="m" variant="secondary" onClick={toggleBurger}>
            {isBurgerOpen ? <CloseIcon /> : <BurgerIcon />}
        </IconButton>
    ), [isBurgerOpen, toggleBurger])

    return (
        <>
            <div className="header_actions">
                {isBurger ? (
                    iconButton
                ) : (
                    <>
                        <ThemeToggle />
                        <span className="header_divider" />
                        <Button variant="secondary" size="m" onClick={handleClick}>
                            Contact Support
                        </Button>
                    </>
                )}
            </div>
            {isBurgerOpen && <HeaderBurger setBurgerOpen={setBurgerOpen} />}
        </>
    )
}
