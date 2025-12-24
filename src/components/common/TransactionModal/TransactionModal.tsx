import type { ReactElement, MouseEvent } from 'react'
import { useState, useEffect, useCallback } from 'react'
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
    const [gasLimitOverride, setGasLimitOverride] = useState<number | undefined>(undefined)
    const [resetKey, setResetKey] = useState<number>(0)

    const stepApi = useSteps([
        {
            component: (
                <ConnectionStep
                    key={`connection-${resetKey}`}
                    onConnected={() => {
                        stepApi.next()
                    }}
                />
            ),
        },
        {
            component: (
                <VerificationStep
                    key={`verification-${resetKey}`}
                    onVerified={(gasLimit: number) => {
                        if (gasLimit > 0) {
                            setGasLimitOverride(gasLimit)
                            stepApi.next()
                        }
                    }}
                    onDisconnected={() => stepApi.reset()}
                />
            ),
        },
        {
            component: (
                <ExecutionStep
                    key={`execution-${resetKey}`}
                    onDisconnected={() => stepApi.reset()}   
                    onBack={() => stepApi.back()}             
                    onClose={onClose}
                    gasLimitOverride={gasLimitOverride ?? 0}
                />
            ),
        },
    ])

    const handleClose = useCallback(() => {
        onClose()
        stepApi.reset()
        setGasLimitOverride(undefined)
        setResetKey(prev => prev + 1)
    }, [onClose, stepApi])

    const handleDialogClick = useCallback((e: MouseEvent<HTMLDivElement>): void => {
        e.stopPropagation()
    }, [])

    useEffect(() => {
        if (isOpen) {
            stepApi.reset()
            setGasLimitOverride(undefined)
            setResetKey(prev => prev + 1)
        }
    }, [isOpen])

    if (!isOpen) return null

    return createPortal(
        <div
            className={`tx_modal_overlay ${stepApi.stepIndex === 2 ? 'tx_modal_overlay_center' : ''}`}
            onClick={handleClose}
            role="presentation"
        >
            <div className={`tx_modal`} onClick={handleDialogClick} role="dialog" aria-modal="true">
                <ModalHeader
                    title="Retry Transaction"
                    onClose={handleClose}
                    showBack={false}
                    onBack={() => stepApi.back()} 
                />
                <div className="tx_modal_step_container">{stepApi.currentStep.component}</div>
            </div>
        </div>,
        document.body,
    )
}
