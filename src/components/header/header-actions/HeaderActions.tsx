import type { ReactElement, MouseEventHandler } from 'react'
import { Button } from '@concero/ui-kit'
import { ThemeToggle } from '@/components/common'
import './styles.pcss'

type HeaderActionsProps = {
	readonly handleClick: MouseEventHandler<HTMLButtonElement>
}

export const HeaderActions = ({ handleClick }: HeaderActionsProps): ReactElement => {
	return (
		<div className="header_actions">
			<ThemeToggle />
			<span className="header_divider" />
			<Button variant="secondary" size="m" onClick={handleClick}>
				Contact Support
			</Button>
		</div>
	)
}
