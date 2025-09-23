import { ReactElement } from 'react'
import { Button } from '@concero/ui-kit'
import { useAddressStore } from '@/hooks'
import { TxsDirection } from '@/types'
import './styles.pcss'

type ButtonGroupProps = {
	readonly labels: [string, string]
}

export const ButtonGroup = ({ labels }: ButtonGroupProps): ReactElement => {
	const { direction, setFilter } = useAddressStore()

	const id: number = direction === TxsDirection.Outgoing ? 0 : 1

	const handleClick = (index: number) => {
		const selectedDirection = index === 0 ? TxsDirection.Outgoing : TxsDirection.Incoming
		setFilter(selectedDirection)
	}

	return (
		<div className="button_group">
			<Button variant={id === 0 ? 'secondary_color' : 'tetrary_color'} onClick={() => handleClick(0)}>
				{labels[0]}
			</Button>
			<Button variant={id === 1 ? 'secondary_color' : 'tetrary_color'} onClick={() => handleClick(1)}>
				{labels[1]}
			</Button>
		</div>
	)
}
