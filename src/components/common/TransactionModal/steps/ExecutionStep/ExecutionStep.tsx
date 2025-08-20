import type { ReactElement } from 'react'
import { Button } from '@concero/ui-kit'
import { Input } from '@concero/ui-kit'
import { useInput } from '@/hooks/useInput'
import { WarningIcon } from '@/assets'
import './styles.pcss'

type ExecutionStepProps = {
	onVerified: () => void
	onDisconnected: () => void
}

export const ExecutionStep = ({ onVerified }: ExecutionStepProps): ReactElement => {
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

	return (
		<div className="verification_step">
			<div className="verification_step_container">
				<Input size="l" labelText="Label" value={value} onChange={onChange} />
				<div className="verification_step_sublabel">
					<WarningIcon />
					<span className="verification_step_sublabel_text">
						This is helpful if the original transaction failed due to insufficient gas.
					</span>
				</div>
			</div>
			<Button isFull size="l" onClick={onVerified}>
				Retry
			</Button>
		</div>
	)
}
