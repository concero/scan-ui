import type { ReactElement } from 'react'
import { zeroAddress } from 'viem'
import { Button } from '@concero/ui-kit'
import { useEffect } from 'react'
import { useAccount, useDisconnect } from 'wagmi'
import { blo } from 'blo'
import './styles.pcss'

type VerificationStepProps = {
	onVerified: () => void
	onDisconnected: () => void
}

export const VerificationStep = ({ onVerified, onDisconnected }: VerificationStepProps): ReactElement => {
	const { disconnect } = useDisconnect()
	const { address, isConnected, isDisconnected } = useAccount()
	const identicon = blo(address ?? zeroAddress)

	useEffect(() => {
		if (!isConnected || isDisconnected) {
			onDisconnected()
		}
	}, [isConnected, isDisconnected])

	return (
		<>
			<div className="verification_step">
				<div className="verification_step_container">
					<span className="verification_step_title">Connected Wallet</span>
					<div className="verification_step_content">
						<div className="verification_step_info">
							{address && (
								<>
									<img src={identicon} alt="Wallet Identicon" className="verification_step_icon" />
									<span className="verification_step_address">
										{address.slice(0, 7)}...{address.slice(-6)}
									</span>
								</>
							)}
						</div>
						<Button variant="secondary" size="s" onClick={() => disconnect()}>
							Disconnect
						</Button>
					</div>
				</div>
				<Button isFull size="l" onClick={onVerified}>
					Continue
				</Button>
			</div>
		</>
	)
}
