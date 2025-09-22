import type { ReactElement } from 'react'
import { Payload } from './Payload'
import { Retry } from './Retry'
import { GasLimit } from './GasLimit'
import './styles.pcss'

export const Execution = (): ReactElement => {
	return (
		<div className="execution">
			<div className="execution_content">
				<Payload />
				<GasLimit />
				<Retry />
			</div>
		</div>
	)
}
