import type { ReactElement, MouseEvent } from 'react'
import { createPortal } from 'react-dom'
import { CopyIcon } from '@/assets'
import { SupportOption } from './SupportOption'
import { ModalHeader } from '../ModalHeader'
import { useClipboard } from '@/hooks'
import { links } from '@/configuration'
import './styles.pcss'

type SupportModalProps = {
	readonly isOpen: boolean
	readonly onClose: () => void
}

const DEBUG_INFO = 'Example debug info text...'

type SupportOptionConfig = {
	readonly step: number
	readonly text: string
	readonly buttonLabel: string
	readonly icon?: ReactElement
	readonly onClick: () => void
}

export const SupportModal = ({ isOpen, onClose }: SupportModalProps): ReactElement | null => {
	const { copy, copied } = useClipboard()

	const handleDialogClick = (e: MouseEvent<HTMLDivElement>): void => {
		e.stopPropagation()
	}

	if (!isOpen) return null

	const supportOptions: SupportOptionConfig[] = [
		{
			step: 1,
			text: 'Copy debug info',
			buttonLabel: copied ? 'Copied!' : 'Copy debug info',
			icon: <CopyIcon />,
			onClick: () => copy(DEBUG_INFO, 'Copied Debug Info'),
		},
		{
			step: 2,
			text: 'Drop us a message',
			buttonLabel: 'Open Discord',
			onClick: () => window.open(links.discord, '_blank', 'noopener'),
		},
	]

	return createPortal(
		<div className="support_modal_overlay" onClick={onClose} role="presentation">
			<div className="support_modal" onClick={handleDialogClick} role="dialog" aria-modal="true">
				<ModalHeader title="Contact Support" onClose={onClose} />

				<span className="support_modal_description">
					We apologise that you had issues with your transaction. We will do our best to resolve the issue.
				</span>

				{supportOptions.map(({ step, text, buttonLabel, icon, onClick }) => (
					<SupportOption
						key={step}
						step={step}
						text={text}
						buttonLabel={buttonLabel}
						icon={icon}
						onClick={onClick}
					/>
				))}
			</div>
		</div>,
		document.body,
	)
}
