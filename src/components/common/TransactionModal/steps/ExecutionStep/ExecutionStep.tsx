import type { ReactElement } from 'react'
import { Button } from '@concero/ui-kit'
import { useAccount } from 'wagmi'
import { useEffect, useMemo, useCallback } from 'react'
import { useTransactionsStore } from '@/hooks'
import { useRetryMessage } from '@/hooks/useRetryMessage'
import { Status, StatusVariant } from './Status'
import './styles.pcss'

type ExecutionStepProps = {
    onBack: () => void
    onClose: () => void
    onDisconnected: () => void
    gasLimitOverride?: number
}

export const ExecutionStep = ({ onDisconnected, onClose, onBack, gasLimitOverride }: ExecutionStepProps): ReactElement | null => {
    const { isConnected, isDisconnected } = useAccount()
    const { txs } = useTransactionsStore()

    const transaction = txs && txs.length > 0 ? txs[0] : null
    if (!transaction) return null

    const params = useMemo(() => ({
        chainId: Number(transaction.to.chain.id),
        messageReceipt: transaction.messageReceipt!,
        validatorLibs: transaction.dstValidatorLibs!,
        validations: transaction.validations!,
        validationChecks: transaction.validationChecks!,
        relayerLib: transaction.dstRelayerLib!,
        gasLimitOverride: gasLimitOverride!,
    }), [transaction, gasLimitOverride])

    const { execute, isPending, isProcessing, isSuccess, isFailed } = useRetryMessage(params)

    useEffect(() => {
        if (!isConnected || isDisconnected) {
            onDisconnected()
        }
    }, [isConnected, isDisconnected, onDisconnected])

    const handleRetry = useCallback(() => {
        execute()
    }, [execute])

    const renderState = () => {
        if (isPending) {
            return (
                <Status
                    variant={StatusVariant.Loading}
                    title="Confirm Transaction"
                    subtitle="Open your wallet to confirm transaction"
                />
            )
        }

        if (isProcessing) {
            return (
                <Status
                    variant={StatusVariant.Processing}
                    title="Transaction Processing..."
                    subtitle="Waiting for network confirmations. This may take a few moments."
                />
            )
        }

        if (isSuccess) {
            return (
                <Status
                    variant={StatusVariant.Success}
                    title="Transaction Retried"
                    subtitle="You successfully retried transaction"
                    onClose={onClose}
                />
            )
        }

        if (isFailed) {
            return (
                <Status
                    variant={StatusVariant.Failed}
                    title="Confirmation Failed"
                    subtitle="Please try again"
                    onClose={onClose}
                    onRetry={execute}
                />
            )
        }

        return (
            <div className="execution_step">
                <div className="execution_step_description">
                    <div className="execution_step_title">Are you the contract owner?</div>
                    <div className="execution_step_subtitle">
                        Only restart the transaction if the contract itself was changed; otherwise you'll just waste gas.
                    </div>
                </div>
                <div className="execution_step_actions">
                    <Button isFull size="l" variant="secondary" onClick={onBack}>
                        Back
                    </Button>
                    <Button isFull size="l" variant="primary" onClick={handleRetry}>
                        Retry
                    </Button>
                </div>
            </div>
        )
    }

    return renderState()
}
