import type { ReactElement } from 'react'
import { useState, useEffect, useCallback } from 'react'
import { useSteps } from '@/hooks'
import { createPortal } from 'react-dom'
import { ModalHeader } from '../ModalHeader'
import { ConnectionStep } from './steps'
import { VerificationStep } from './steps'
import { useAccount } from 'wagmi'
import { ExecutionStep } from './steps'
import './styles.pcss'

type TransactionModalProps = {
	readonly isOpen: boolean
	readonly onClose: () => void
}

export const TransactionModal = ({ isOpen, onClose }: TransactionModalProps): ReactElement | null => {
	const [gasLimit, setGasLimit] = useState<number | null>(null)
	const { isConnected, isConnecting } = useAccount()

	const connection = <ConnectionStep isConnecting={isConnecting} />

	const verification = (
		<VerificationStep
			onVerified={(gasLimit: number) => {
				setGasLimit(gasLimit)
				stepApi.next()
			}}
		/>
	)

	const executionStep = (
		<ExecutionStep onBack={() => stepApi.back()} onClose={onClose} gasLimitOverride={gasLimit ?? undefined} />
	)

	const stepApi = useSteps([{ component: connection }, { component: verification }, { component: executionStep }])

	const handleClose = useCallback(() => {
		onClose()
		stepApi.reset()
		setGasLimit(null)
	}, [onClose, stepApi])

	useEffect(() => {
		if (isConnected && stepApi.isFirst) {
			stepApi.next()
		} else if (!isConnected) {
			stepApi.reset()
		}
	}, [isConnected, stepApi.stepIndex, stepApi])

	useEffect(() => {
		if (isOpen) {
			stepApi.reset()
			setGasLimit(null)
		}
	}, [isOpen])

	if (!isOpen) return null

	return createPortal(
		<div
			className={`tx_modal_overlay ${stepApi.stepIndex === 2 ? 'tx_modal_overlay_center' : ''}`}
			onClick={handleClose}
			role="presentation"
		>
			<div className={`tx_modal`} onClick={e => e.stopPropagation()} role="dialog" aria-modal="true">
				<ModalHeader
					title="Retry Transaction"
					onClose={handleClose}
					showBack={stepApi.stepIndex > 1}
					onBack={() => stepApi.back()}
				/>
				<div className="tx_modal_step_container">{stepApi.currentStep.component}</div>
			</div>
		</div>,
		document.body,
	)
}
