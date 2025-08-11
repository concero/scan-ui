import { ReactElement } from 'react'
import { createPortal } from 'react-dom'
import { IconButton, Button } from '@concero/ui-kit'
import { CloseIcon, CopyIcon } from '@/assets'
import './styles.pcss'

type SupportModalProps = {
	isOpen: boolean
	onClose: () => void
}

type OptionProps = {
	step: number
	text: string
	buttonLabel: string
	icon?: React.ReactNode
	onClick: () => void
}

const SupportOption = ({ step, text, buttonLabel, icon, onClick }: OptionProps) => (
	<div className="support_modal_option">
		<span className="support_modal_option_text">
			{step}. {text}
		</span>
		<Button variant="secondary" size="l" isFull leftIcon={icon} onClick={onClick}>
			{buttonLabel}
		</Button>
	</div>
)

export const SupportModal = ({ isOpen, onClose }: SupportModalProps): ReactElement | null => {
	if (!isOpen) return null

	return createPortal(
		<div className="support_modal_overlay">
			<div className="support_modal">
				{/* Header */}
				<div className="support_modal_header">
					<span className="support_modal_title">Contact Support</span>
					<IconButton variant="secondary" size="m" onClick={onClose}>
						<CloseIcon />
					</IconButton>
				</div>

				{/* Description */}
				<span className="support_modal_description">
					We apologise that you had issues with your transaction. We will do our best to resolve the issue.
				</span>

				{/* Options */}
				<SupportOption
					step={1}
					text="Copy debug info"
					buttonLabel="Copy debug info"
					icon={<CopyIcon />}
					onClick={() => console.log('Copy debug info')}
				/>
				<SupportOption
					step={2}
					text="Drop us a message"
					buttonLabel="Open Discord"
					onClick={() => console.log('Open Discord')}
				/>
			</div>
		</div>,
		document.body,
	)
}
