import { ReactElement } from 'react'
import { Button } from '@concero/ui-kit'
import { useAddressStore } from '@/hooks'
import { TxsDirection } from '@/types'
import './styles.pcss'

type ButtonGroupProps = {
	readonly labels: [string, string]
}
//TODO: (Mikhail) Refactor/rename this component
export const ButtonGroup = ({ labels }: ButtonGroupProps): ReactElement => {
	const { dataFilters, setDirection } = useAddressStore()

	const id: number = dataFilters.direction === TxsDirection.Outgoing ? 0 : 1

	const handleClick = (index: number) => {
		const selectedDirection = index === 0 ? TxsDirection.Outgoing : TxsDirection.Incoming
		setDirection(selectedDirection)
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
