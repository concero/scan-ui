import type { ReactNode, MouseEvent, ReactElement } from 'react'
import { Button } from '@concero/ui-kit'
import './styles.pcss'

type SupportOptionProps = {
	readonly step: number
	readonly text: string
	readonly buttonLabel: string
	readonly icon?: ReactNode
	readonly onClick: (event: MouseEvent<HTMLButtonElement>) => void
}

export const SupportOption = ({ step, text, buttonLabel, icon, onClick }: SupportOptionProps): ReactElement => (
	<div className="support_modal_option">
		<span className="support_modal_option_text">
			{step}. {text}
		</span>
		<Button variant="secondary" size="l" isFull leftIcon={icon} onClick={onClick}>
			{buttonLabel}
		</Button>
	</div>
)
