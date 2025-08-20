import type { ReactElement, MouseEventHandler } from 'react'
import { IconButton } from '@concero/ui-kit'
import { ArrowLeftIcon, CloseIcon } from '@/assets'
import './styles.pcss'

type ModalHeaderProps = {
	readonly title: string
	readonly showBack: boolean
	readonly onBack?: MouseEventHandler<HTMLButtonElement>
	readonly onClose: MouseEventHandler<HTMLButtonElement>
}

export const ModalHeader = ({ title, showBack, onBack, onClose }: ModalHeaderProps): ReactElement => (
	<div className="modal_header">
		{showBack ? (
			<IconButton
				variant="secondary"
				size="m"
				onClick={onBack}
				aria-label="Go back"
				className="modal_header_button"
			>
				<ArrowLeftIcon />
			</IconButton>
		) : (
			<div className="modal_header_placeholder" />
		)}

		<span className="modal_title">{title}</span>

		<IconButton
			variant="secondary"
			size="m"
			onClick={onClose}
			aria-label="Close support modal"
			className="modal_header_button"
		>
			<CloseIcon />
		</IconButton>
	</div>
)
