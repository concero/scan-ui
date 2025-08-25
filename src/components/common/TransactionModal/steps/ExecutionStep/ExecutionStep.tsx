import type { ReactElement } from 'react'
import { Button } from '@concero/ui-kit'
import { useAccount } from 'wagmi'
import { useEffect } from 'react'
import './styles.pcss'

type ExecutionStepProps = {
	onBack: () => void
	onDisconnected: () => void
}

export const ExecutionStep = ({ onDisconnected, onBack }: ExecutionStepProps): ReactElement => {
	const { isConnected, isDisconnected } = useAccount()

	useEffect(() => {
		if (!isConnected || isDisconnected) {
			onDisconnected()
		}
	}, [isConnected, isDisconnected])

	return (
		<div className="execution_step">
			<div className="execution_step_description">
				<div className="execution_step_title">Are you the contract owner?</div>
				<div className="execution_step_subtitle">
					Only restart the transaction if the contract itself was changed; otherwise you’ll just waste gas.
				</div>
			</div>
			<div className="execution_step_actions">
				<Button isFull size="l" variant="secondary" onClick={onBack}>
					Back
				</Button>
				<Button isFull size="l" variant="primary">
					Retry
				</Button>
			</div>
		</div>
	)
}
