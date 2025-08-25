import type { ReactElement, MouseEvent } from 'react'
import { useSteps } from '@/hooks'
import { createPortal } from 'react-dom'
import { ModalHeader } from '../ModalHeader'
import { ConnectionStep } from './steps'
import { VerificationStep } from './steps'
import { ExecutionStep } from './steps'
import './styles.pcss'

type TransactionModalProps = {
	readonly isOpen: boolean
	readonly onClose: () => void
}

export const TransactionModal = ({ isOpen, onClose }: TransactionModalProps): ReactElement | null => {
	const handleDialogClick = (e: MouseEvent<HTMLDivElement>): void => {
		e.stopPropagation()
	}

	const handleClose = (): void => {
		onClose()
		stepApi.reset()
	}
	const stepApi = useSteps([
		{
			component: (
				<ConnectionStep
					onConnected={() => {
						stepApi.next()
					}}
				/>
			),
		},
		{
			component: <VerificationStep onVerified={() => stepApi.next()} onDisconnected={() => stepApi.back()} />,
		},
		{
			component: <ExecutionStep  onDisconnected={() => stepApi.reset()} onBack={() => stepApi.back()} />,
		},
	])

	if (!isOpen) return null

	return createPortal(
		<div
			className={`tx_modal_overlay ${stepApi.stepIndex === 2 ? 'tx_modal_overlay_center' : ''}`}
			onClick={handleClose}
			role="presentation"
		>
			<div className={`tx_modal`} onClick={handleDialogClick} role="dialog" aria-modal="true">
				{stepApi.stepIndex !== 2 && (
					<ModalHeader
						title="Retry Transaction"
						onClose={handleClose}
						showBack={stepApi.isLast}
						onBack={stepApi.back}
					/>
				)}
				<div className="tx_modal_step_container">{stepApi.currentStep.component}</div>
			</div>
		</div>,
		document.body,
	)
}
