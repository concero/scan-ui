import { ReactElement, useState } from 'react'
import { Button } from '@concero/ui-kit'
import './styles.pcss'

type ButtonGroupProps = {
	readonly labels: [string, string]
}

export const ButtonGroup = ({ labels }: ButtonGroupProps): ReactElement => {
	const [id, setId] = useState<number>(0)

	return (
		<div className="button_group">
			<Button variant={id === 0 ? 'secondary_color' : 'tetrary_color'} onClick={() => setId(0)}>
				{labels[0]}
			</Button>
			<Button variant={id === 1 ? 'secondary_color' : 'tetrary_color'} onClick={() => setId(1)}>
				{labels[1]}
			</Button>
		</div>
	)
}
