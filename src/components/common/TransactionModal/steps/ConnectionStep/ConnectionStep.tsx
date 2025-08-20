import { ReactElement, useEffect } from 'react'
import { Button } from '@concero/ui-kit'
import { useAccount } from 'wagmi'
import { useConnect } from 'wagmi'
import './styles.pcss'

type ConnectionStepProps = {
  onConnected: () => void
}

export const ConnectionStep = ({ onConnected }: ConnectionStepProps): ReactElement => {
	const { connect, connectors } = useConnect()
	const { isConnected, isConnecting } = useAccount()

    useEffect(() => {
        if (isConnected) {
            onConnected()
        }
    }, [isConnected, onConnected])

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
