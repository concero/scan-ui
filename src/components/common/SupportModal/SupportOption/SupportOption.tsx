import type { ReactNode, MouseEvent, ReactElement } from 'react'
import { Button } from '@concero/ui-kit'
import './styles.pcss'

type SupportOptionProps = {
	readonly buttonLabel: string
	readonly icon?: ReactNode
	readonly onClick: (event: MouseEvent<HTMLButtonElement>) => void
}

export const SupportOption = ({ buttonLabel, icon, onClick }: SupportOptionProps): ReactElement => (
	<div className="support_modal_option">
		<Button variant="secondary" size="l" isFull leftIcon={icon} onClick={onClick}>
			{buttonLabel}
		</Button>
	</div>
)
