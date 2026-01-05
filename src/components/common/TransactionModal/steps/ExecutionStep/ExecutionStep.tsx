import type { ReactElement } from 'react'
import { useMemo, useCallback } from 'react'
import { useTransactionsStore } from '@/hooks'
import { useRetryMessage } from '@/hooks/useRetryMessage'
import { Status, StatusVariant } from './Status'

type ExecutionStepProps = {
	onBack: () => void
	onClose: () => void
	gasLimitOverride?: number
}

export const ExecutionStep = ({ onClose, onBack, gasLimitOverride }: ExecutionStepProps): ReactElement | null => {
	const { txs } = useTransactionsStore()

	const transaction = txs && txs.length > 0 ? txs[0] : null
	if (!transaction) return null

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

	const { execute, isPending, isProcessing, isSuccess, isFailed } = useRetryMessage(params)

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
					onBack={onBack}
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
			<Status
				variant={StatusVariant.Idle}
				title="Are you the contract owner?"
				subtitle="Only restart the transaction if the contract itself was changed; otherwise you'll just waste gas."
				onBack={onBack}
				onRetry={handleRetry}
			/>
		)
	}

	return renderState()
}
