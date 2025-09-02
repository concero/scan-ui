import type { ReactElement } from 'react'
import { Tag } from '@concero/ui-kit'

type NetworkLabelProps = {
	isTestnet: boolean
}

export const NetworkLabel = ({ isTestnet }: NetworkLabelProps): ReactElement => {
	return (
		<div>
			<Tag variant={'neutral'} size={'s'}>
				{isTestnet ? 'Testnet' : 'Mainnet'}
			</Tag>
		</div>
	)
}
