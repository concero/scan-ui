import type { ReactElement } from 'react'
import { zeroAddress } from 'viem'
import { Button } from '@concero/ui-kit'
import { useEffect } from 'react'
import { Input } from '@concero/ui-kit'
import { WarningIcon } from '@/assets'
import { useAccount, useDisconnect } from 'wagmi'
import { useInput } from '@/hooks'
import { blo } from 'blo'
import './styles.pcss'

type VerificationStepProps = {
	onVerified: () => void
	onDisconnected: () => void
}

export const VerificationStep = ({ onVerified, onDisconnected }: VerificationStepProps): ReactElement => {
	const { value, onChange } = useInput<number>({
		defaultValue: 2000000,
		debounceMs: 300,
		parse: input => {
			const digitsOnly = input.replace(/[^\d]/g, '')
			const parsed = Number(digitsOnly)
			return isNaN(parsed) ? 0 : parsed
		},
		validate: val => val >= 0,
	})
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
				<div className="verification_step_container">
					<Input
						size="l"
						labelText="DST Gas Limit"
						subLabelText="(Optional)"
						value={value}
						onChange={onChange}
					/>
					<div className="verification_step_sublabel">
						<WarningIcon />
						<span className="verification_step_sublabel_text">
							This is helpful if the original transaction failed due to insufficient gas.
						</span>
					</div>
				</div>
				<Button isFull size="l" onClick={onVerified}>
					Continue
				</Button>
			</div>
		</>
	)
}
