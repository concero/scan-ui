import type { ReactElement, MouseEventHandler } from 'react'
import { IconButton } from '@concero/ui-kit'
import { CloseIcon } from '@/assets'
import './styles.pcss'

type SupportModalHeaderProps = {
	readonly onClose: MouseEventHandler<HTMLButtonElement>
}

export const SupportModalHeader = ({ onClose }: SupportModalHeaderProps): ReactElement => (
	<div className="support_modal_header">
		<span className="support_modal_title">Contact Support</span>
		<IconButton variant="secondary" size="m" onClick={onClose} aria-label="Close support modal">
			<CloseIcon />
		</IconButton>
	</div>
)
