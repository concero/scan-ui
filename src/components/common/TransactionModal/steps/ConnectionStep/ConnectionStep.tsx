import { ReactElement } from 'react'
import { Button } from '@concero/ui-kit'
import { Alert } from '@concero/ui-kit'
import { useConnect } from 'wagmi'
import './styles.pcss'

type ConnectionStepProps = {
	isConnecting: boolean
}

export const ConnectionStep = ({ isConnecting }: ConnectionStepProps): ReactElement => {
	const { connect, connectors, error } = useConnect()

	return (
		<div className="connection_step">
			<img
				src="/Transaction/Wallet.svg"
				alt="Wallet Icon"
				className="connection_step_img"
				aria-hidden="true"
				loading="lazy"
			/>
			<div className="connection_step_description">
				<span id="connection_step_title" className="connection_step_title">
					Connect Your Wallet
				</span>
				<span className="connection_step_subtitle">
					To retry the transaction, we need to verify it’s really you.
				</span>
			</div>
			{error && (
				<Alert
					type="negative"
					title="Connection Failed"
					description="Please, try again"
					className="connection_step_error"
				/>
			)}
			<div className="connection_step_action">
				<Button
					variant="primary"
					size="l"
					isFull
					isLoading={isConnecting}
					onClick={() => connect({ connector: connectors[0] })}
				>
					Connect Wallet
				</Button>
			</div>
		</div>
	)
}
