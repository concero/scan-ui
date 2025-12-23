import type { ReactElement } from 'react'
import { Button } from '@concero/ui-kit'
import { useAccount } from 'wagmi'
import { useEffect, useMemo, useCallback } from 'react'
import { useTransactionsStore } from '@/hooks'
import { useRetryMessage } from '@/hooks/useRetryMessage'
import './styles.pcss'

type ExecutionStepProps = {
	onBack: () => void
	onDisconnected: () => void
	gasLimitOverride?: number
}

export const ExecutionStep = ({ onDisconnected, onBack, gasLimitOverride }: ExecutionStepProps): ReactElement => {
	const { isConnected, isDisconnected } = useAccount()
	const { txs } = useTransactionsStore()

	const transaction = txs && txs.length > 0 ? txs[0] : null

	if (!transaction) {
		return (
			<div className="execution_step">
				<div className="execution_step_description">
					<div className="execution_step_title">No Transaction Data</div>
					<div className="execution_step_subtitle">Transaction data not available</div>
				</div>
				<div className="execution_step_actions">
					<Button isFull size="l" variant="secondary" onClick={onBack}>
						Back
					</Button>
				</div>
			</div>
		)
	}

	const params = useMemo(
		() => ({
			chainId: Number(transaction.to.chain.id),
			messageReceipt: transaction.messageReceipt!,
			validatorLibs: transaction.dstValidatorLibs!,
			validations: transaction.validations!,
			validationChecks: transaction.validationChecks!,
			relayerLib: transaction.dstRelayerLib!,
			gasLimitOverride: gasLimitOverride!,
		}),
		[transaction, gasLimitOverride],
	)

	const { execute, isLoading, isError, isSuccess } = useRetryMessage(params)

	useEffect(() => {
		if (!isConnected || isDisconnected) {
			onDisconnected()
		}
	}, [isConnected, isDisconnected, onDisconnected])

	const handleRetry = useCallback(() => {
		execute()
	}, [execute])

	if (isSuccess) {
		return (
			<div className="execution_step">
				<div className="execution_step_description">
					<div className="execution_step_title">Transaction Processed</div>
					<div className="execution_step_subtitle">
						Your transaction has been successfully submitted and confirmed on chain.
					</div>
				</div>
				<div className="execution_step_actions">
					<Button isFull size="l" variant="primary" onClick={onBack}>
						Done
					</Button>
				</div>
			</div>
		)
	}

	if (isLoading) {
		return (
			<div className="execution_step">
				<div className="execution_step_description">
					<div className="execution_step_title">Transaction Processing...</div>
					<div className="execution_step_subtitle">
						Retrying your message submission. This may take a few moments depending on the current network
						conditions.
					</div>
				</div>
				<div className="execution_step_actions">
					<Button isFull size="l" variant="secondary" onClick={onBack} isDisabled>
						Back
					</Button>
				</div>
			</div>
		)
	}

	if (isError) {
		return (
			<div className="execution_step">
				<div className="execution_step_description">
					<div className="execution_step_title">Transaction Failed</div>
					<div className="execution_step_subtitle">Something went wrong. You can try again.</div>
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
